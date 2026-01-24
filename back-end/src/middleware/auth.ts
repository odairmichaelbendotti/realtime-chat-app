import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/User.js";
import type { DecodedUser } from "../types/decoded-user.js";

export async function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.jwt;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    if (!process.env.JWT_SECRET) return;

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload &
      DecodedUser;

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Erro interno" });
  }
}
