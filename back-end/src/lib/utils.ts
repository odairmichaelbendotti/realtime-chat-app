import jwt from "jsonwebtoken";
import { type Response } from "express";
import type { ObjectId } from "mongoose";

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
