import { awsClient } from "../config/aws.client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

export const newAwsProfilePic = async (
  path: string,
  filename: string,
  mimetype: string,
) => {
  const pathFile = fs.readFileSync(path);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `profile/${filename}`,
    Body: pathFile,
    ContentType: mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    await awsClient.send(command);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.sa-east-1.amazonaws.com/profile/${filename}`;
  } catch (err) {
    console.log(err);
    return;
  }
};
