import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { deleteImgFromTmp, generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../lib/resend.js";
import { fileURLToPath } from "url";
import path from "path";
import { uploadToS3 } from "../services/s3.service.js";

export const authController = {
  signup: async (req: Request, res: Response) => {
    const { fullname, email, password } = req.body;
    try {
      if (!fullname || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      const user = await User.findOne({ email });

      if (user)
        return res.status(400).json({ message: "E-mail already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        fullname,
        email,
        password: hashedPassword,
      });

      if (newUser) {
        generateToken(newUser._id.toString(), res);

        sendWelcomeEmail(newUser.email, newUser.fullname, "#");

        res.status(201).json({
          id: newUser._id,
          fullname: newUser.fullname.trim(),
          email: newUser.email.trim().toLocaleLowerCase(),
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error in signup controller" });
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      if (!user) {
        return res.status(400).json({ message: "E-mail is not found." });
      }

      const decodedPass = await bcrypt.compare(password, user.password);

      if (!decodedPass) {
        return res.status(400).json({ message: "Invalid credencials" });
      }

      generateToken(user.id, res);

      res.status(200).json({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (err) {
      console.error(err);
      return;
    }
  },
  logout: async (req: Request, res: Response) => {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  },
  updateProfilePic: async (req: Request, res: Response) => {
    const file = req.file;
    const userId = req.user._id;

    if (!file)
      return res.status(400).json({ message: "Profilepic is required" });

    try {
      // Adicionar a imagem no S3
      const newProfilePic = await uploadToS3(
        file.filename,
        file.mimetype,
        "profile",
      );

      await deleteImgFromTmp("profile", file.filename);

      const updateProfilePic = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: newProfilePic,
        },
        { new: true, runValidators: true }, // atualizar e revalida com base no schema
      );

      res.json(newProfilePic);
    } catch (err) {
      console.error(err);
      return;
    }
  },
  check: async (req: Request, res: Response) => {
    const user = req.user;
    res.status(200).json(user);
  },
};
