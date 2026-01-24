import jwt from "jsonwebtoken";
import { type Response } from "express";
import type { ObjectId } from "mongoose";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateToken(
  userId: ObjectId | string,
  res: Response,
): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET isnt configured");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 60 * 60 * 24 * 1000 * 7,
    httpOnly: true,
  });

  return token;
}

// deletar imagem da pasta temporária pelo id
export async function deleteImgFromTmp(filename: string) {
  const tmpFiles = path.join(__dirname, "../../tmp");
  const files = await fs.readdir(tmpFiles);

  if (files.length > 0) {
    await fs.unlink(`${tmpFiles}/${filename}`);
    return `${filename} deletado com sucesso`;
  } else {
    return "Não há imagens para serem apagadas";
  }
}
