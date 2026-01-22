import { Router } from "express";

export const authRoutes = Router();

authRoutes.get("/signup", (req, res) => {
  res.send({ status: "Signup endpoint" });
});

authRoutes.get("/login", (req, res) => {
  res.send({ status: "Login endpoint" });
});

authRoutes.get("/logout", (req, res) => {
  res.send({ status: "Logout endpoint" });
});
