const AWS = require("aws-sdk");
const axios = require("axios");
const { getImgBuffer } = require("./imgBuffer");

class AwsClass {
  s3Bucket = null;
  fullFilePath = null;

  constructor(data) {
    const { aws_access_key_id, aws_secret_access_key } = data;

    AWS.config.update({
      accessKeyId: aws_access_key_id,
      secretAccessKey: aws_secret_access_key,
      region: "eu-central-1",
    });

    this.s3Bucket = new AWS.S3({
      params: {
        Bucket: "diagnostics-bucket",
      },
    });
  }

  static build() {
    return axios.get("/api/aws/config").then((res) => {
      return new AwsClass(res.data);
    });
  }

  getFilePath = () => {
    return this.fullFilePath;
  };

  uploadImage = (filePath, buffer, email, folder) => {
    const s3Path = "https://diagnostics-bucket.s3.eu-central-1.amazonaws.com/";
    const bucketPath = `${folder}/${email}/`;
    const data = {
      Key: bucketPath + filePath,
      Body: buffer,
      ContentEncoding: "base64",
      ContentType: "image/png",
      ACL: "public-read-write",
    };
    return new Promise((resolve, reject) => {
      this.s3Bucket.putObject(data, (err) => {
        if (err) {
          reject(err);
        } else {
          this.filePath = s3Path + bucketPath + filePath;
          resolve(s3Path + bucketPath + filePath);
        }
      });
    });
  };

  deleteImage = (filePath) => {
    const index = filePath.indexOf("com/");
    let substr = filePath.substr(index + 4, filePath.length);
    substr = substr.replace("%40", "@");
    console.log(substr);
    const data = {
      Bucket: "diagnostics-bucket",
      Key: substr,
    };
    return new Promise((resolve, reject) => {
      this.s3Bucket.deleteObject(data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

module.exports = AwsClass;
