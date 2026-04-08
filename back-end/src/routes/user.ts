import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const userRoutes = Router();

userRoutes.get("/contacts", UserController.getContacts);
