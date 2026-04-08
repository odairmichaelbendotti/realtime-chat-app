import { Router } from "express";
import { MessageController } from "../controllers/messages.js";
import { protectRoute } from "../middleware/auth.js";
import { uploadMessagePic } from "../config/multer.js";

export const messagesRoutes = Router();

messagesRoutes.get("/contacts", protectRoute, MessageController.getAllContacts);
messagesRoutes.get("/chats", MessageController.getAllChats);

// aqui a ordem importará por conta dos parâmetros dinâmicos
messagesRoutes.get(
  "/get-chat-partner",
  protectRoute,
  MessageController.getChatPartners,
);

messagesRoutes.get(
  "/:id",
  protectRoute,
  MessageController.getAllMessagesByUserId,
);

messagesRoutes.post(
  "/send/:id",
  protectRoute,
  uploadMessagePic.single("image"),
  MessageController.sendMessage,
);
