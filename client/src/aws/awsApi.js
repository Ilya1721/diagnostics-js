const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

class AwsClass {
  s3 = null;
  fullFilePath = null;

  constructor() {
    const REGION = "eu-central-1";
    this.s3 = new S3Client({
      region: REGION,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: REGION }),
        identityPoolId: "eu-central-1:da737f53-af8b-47fe-80f7-9e7f506969cd",
      }),
    });
  }

  static build() {
    return new Promise((resolve, reject) => {
      try {
        const aws = new AwsClass();
        resolve(aws);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  getFilePath = () => {
    return this.fullFilePath;
  };

  uploadImage = (filePath, buffer, email, folder) => {
    const s3Path = "https://diagnostics-bucket.s3.eu-central-1.amazonaws.com/";
    const bucketPath = `${folder}/${email}/`;
    const bucket = "diagnostics-bucket";
    const params = {
      Key: bucketPath + filePath,
      Body: buffer,
      Bucket: bucket,
      ACL: "public-read",
    };
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.s3.send(new PutObjectCommand(params));
        this.filePath = s3Path + bucketPath + filePath;
        resolve(s3Path + bucketPath + filePath);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  deleteImage = (filePath) => {
    const index = filePath.indexOf("com/");
    let substr = filePath.substr(index + 4, filePath.length);
    substr = substr.replace("%40", "@");
    const params = {
      Bucket: "diagnostics-bucket",
      Key: substr,
    };
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.s3.send(new DeleteObjectCommand(params));
        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };
}

module.exports = AwsClass;
