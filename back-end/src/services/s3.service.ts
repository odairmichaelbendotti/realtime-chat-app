import { awsClient } from "../config/aws.client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

export const uploadToS3 = async (
  filename: string, // nome da imagem
  mimetype: string, // mimetype enviado junto com a requisição
  file: string, // nome da pasta dentro do tmp (profile/message)
) => {
  // Conversão do caminho relativo para transformar em bytes
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // local onde estarão os arquivos
  const pathName = path.join(__dirname, "../..", "tmp", file);
  // local do arquivo para transformá-los em bytes
  const pathFile = fs.readFileSync(`${pathName}/${filename}`);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${file}/${filename}`,
    Body: pathFile,
    ContentType: mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    await awsClient.send(command);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.sa-east-1.amazonaws.com/${file}/${filename}`;
  } catch (err) {
    console.log(err);
    return;
  }
};
