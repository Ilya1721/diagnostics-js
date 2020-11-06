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

  uploadImage = (image) => {};
}

module.exports = awsObject;
