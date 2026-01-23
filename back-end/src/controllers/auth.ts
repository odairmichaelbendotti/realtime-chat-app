import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

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

        res.status(201).json({
          id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
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
    res.send({ status: "Login endpoint" });
  },
  logout: async (req: Request, res: Response) => {
    res.send({ status: "Logout endpoint" });
  },
};
