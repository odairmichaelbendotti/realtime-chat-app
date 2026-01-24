import { randomUUID } from "crypto";
import multer from "multer";

const diskStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const prefix = randomUUID();
    cb(null, `${req.user._id}-profile.${file.mimetype.split("/")[1]}`);
  },
  destination: (req, file, cb) => {
    cb(null, "tmp/");
  },
});

export const uploadProfilePic = multer({
  storage: diskStorage,
});
