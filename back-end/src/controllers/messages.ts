import type { Request, Response } from "express";
import Message from "../models/Messages.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import { deleteImgFromTmp } from "../lib/utils.js";
import { uploadToS3 } from "../services/s3.service.js";

export const MessageController = {
  getAllContacts: async (req: Request, res: Response) => {
    try {
      const loggedUserId = req.user._id;
      const filteredUsers = await User.find({
        _id: { $ne: loggedUserId },
      }).select("-password");

      res.status(200).json(filteredUsers);
    } catch (err) {
      console.log("Erro ao buscar contatos");
      return res.status(500).json({ message: "Erro interno" });
    }
  },
  getAllChats: async (req: Request, res: Response) => {},
  getAllMessagesByUserId: async (req: Request, res: Response) => {
    const { id: userId } = req.params;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    try {
      const myId = new mongoose.Types.ObjectId(req.user._id);
      const userToChatId = new mongoose.Types.ObjectId(userId);

      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
      res.status(200).json(messages);
    } catch (err) {
      console.log("Erro interno");
      res.status(500).json({ message: "Erro no servidor" });
    }
  },
  sendMessage: async (req: Request, res: Response) => {
    const { text } = req.body;
    const image = req.file;

    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Message must have text or image" });
    }

    try {
      let chatImg;

      if (image) {
        chatImg = await uploadToS3(image.filename, image.mimetype, "message");
        await deleteImgFromTmp("message", image.filename);
      }

      if (Array.isArray(req.params.id)) {
        return res.status(400).json({ message: "Invalid receiver id" });
      }

      const receiverId = new mongoose.Types.ObjectId(req.params.id);
      const { _id: senderId } = req.user;

      if (senderId.equals(receiverId)) {
        return res
          .status(400)
          .json({ message: "You can`t send messages to yourself" });
      }

      const receiverExists = await User.findById(receiverId);

      if (!receiverExists) {
        return res.status(404).json({ message: "Receiver not found" });
      }

      const newMessage = await Message.create({
        senderId,
        receiverId,
        text: text ? text : null,
        image: chatImg ? chatImg : null,
      });

      res.status(201).json(newMessage);

      // todo: send message if user is online - socket.io
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal error" });
      return;
    }
  },
  getChatPartners: async (req: Request, res: Response) => {
    try {
      const loggedUser = new mongoose.Types.ObjectId(req.user._id);

      // se eu buscar somente por senderId, perderei as mensagens que o usuário recebeu e vice-versa
      const messages = await Message.find({
        $or: [{ senderId: loggedUser }, { receiverId: loggedUser }],
      });

      // abaixo pega os IDs dos parceiros de chat únicos
      // .equals funciona pq é um objeto do mongoose
      // .toString() para transformar em uma string normal para depois separar valores repetidos
      const chatPartnerIds = messages.map((msg) =>
        msg.senderId.equals(loggedUser)
          ? msg.receiverId.toString()
          : msg.senderId.toString(),
      );

      // forma moderna de separar valores repetidos de um array
      const uniqueIds = [...new Set(chatPartnerIds)];

      // No mongoose, quando se tem uma lista de IDs e quer buscar tudo em uma única query, você usa o operador $in
      const partners = await User.find({
        _id: { $in: uniqueIds },
      });

      res.json(partners);
    } catch (err) {
      console.error(err);
      return;
    }
  },
};
