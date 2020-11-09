const aws = require("aws-sdk");
const axios = require("axios");
const { getImgBuffer } = require("./imgBuffer");

class awsObject {
  s3Bucket = null;

  constructor() {
    axios.get("/api/aws/config").then((res) => {
      const { aws_access_key_id, aws_secret_access_key } = res.data;

      aws.config.update({
        accessKeyId: aws_access_key_id,
        secretAccessKey: aws_secret_access_key,
        region: "eu-central-1",
      });

      this.s3Bucket = new aws.s3({
        params: {
          Bucket: "diagnostics-bucket",
        },
      });
    });
  }

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
          resolve(s3Url + path);
        }
      });
    });
  };
}

module.exports = awsObject;
