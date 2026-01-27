import { randomUUID } from "crypto";
import multer from "multer";

// upload de imagem de perfil
const diskStorageProfile = multer.diskStorage({
  filename: (req, file, cb) => {
    const prefix = randomUUID();
    cb(null, `${req.user._id}-profile.${file.mimetype.split("/")[1]}`);
  },
  destination: (req, file, cb) => {
    cb(null, "tmp/profile");
  },
});

export const uploadProfilePic = multer({
  storage: diskStorageProfile,
});

// upload de imagem enviada pelo chat

const diskStorageMessageImg = multer.diskStorage({
  filename: (req, file, cb) => {
    const prefix = randomUUID();
    cb(null, `${req.user._id}-message.${file.mimetype.split("/")[1]}`);
  },
  destination: (req, file, cb) => {
    cb(null, "tmp/message");
  },
});

export const uploadMessagePic = multer({
  storage: diskStorageMessageImg,
});
