import { Router } from "express";
import { authController } from "../controllers/auth.js";
import { protectRoute } from "../middleware/auth.js";
import { uploadProfilePic } from "../config/multer.js";

export const authRoutes = Router();

authRoutes.post("/signup", authController.signup);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);
authRoutes.put(
  "/update-profile-picture",
  protectRoute,
  uploadProfilePic.single("profilePic"),
  authController.updateProfilePic,
);
authRoutes.get("/check", protectRoute, authController.check);
