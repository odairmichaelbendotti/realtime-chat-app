import { Router } from "express";
import { MessageController } from "../controllers/messages.js";
import { protectRoute } from "../middleware/auth.js";
import { uploadMessagePic } from "../config/multer.js";

export const messagesRouter = Router();

messagesRouter.get("/contacts", protectRoute, MessageController.getAllContacts);
messagesRouter.get("/chats", MessageController.getAllChats);
messagesRouter.get(
  "/:id",
  protectRoute,
  MessageController.getAllMessagesByUserId,
);

messagesRouter.post(
  "/send/:id",
  protectRoute,
  uploadMessagePic.single("image"),
  MessageController.sendMessage,
);
