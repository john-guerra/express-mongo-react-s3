function s3Lib() {
  const s3Lib = {};

  const AWS = require("aws-sdk");
  AWS.config.update({ region: "us-east-1" });
  const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

  s3Lib.upload = (fileName, fileContent) => {
    const params = {
      Bucket: "nuevobucketjohn",
      Key: fileName, // File name you want to save as in S3
      Body: fileContent,
      ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
      // Uploading files to the bucket
      s3.upload(params, function(err, data) {
        if (err) {
          reject(err);
          return;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(data.Location);
      });
    });
  };

  return s3Lib;
}

module.exports = s3Lib();
