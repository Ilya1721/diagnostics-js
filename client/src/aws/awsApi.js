const AWS = require("aws-sdk");
const axios = require("axios");
const { getImgBuffer } = require("./imgBuffer");

class AwsClass {
  s3Bucket = null;
  filePath = null;

  constructor(data) {
    const { aws_access_key_id, aws_secret_access_key } = data;
    console.log(aws_access_key_id);

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
    return this.filePath;
  };

  uploadImage = (path, buffer) => {
    const s3Url =
      "https://diagnostics-bucket.s3.eu-central-1.amazonaws.com/doctors";
    const data = {
      Key: path,
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
          this.filePath = s3Url + path;
          resolve(s3Url + path);
        }
      });
    });
  };
}

module.exports = AwsClass;
