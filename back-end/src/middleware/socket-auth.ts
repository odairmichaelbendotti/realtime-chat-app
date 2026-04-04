import jwt from "jsonwebtoken";
import User, { type UserType } from "../models/User.js";
import { Socket } from "socket.io";

type NextFunction = (err?: Error) => void;

export const socketAuth = async (socket: Socket, next: NextFunction) => {
  try {
    // extract the token from http-only cookie
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No token provided"));
    }

    if (!process.env.JWT_SECRET) return;

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as UserType;
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - invalid token"));
    }

    // find the user in DB
    const user = await User.findById(decoded._id);

    // Attach user info to socket
    socket.user = user;
    socket.user._id = user?._id.toString();
    console.log(`User authenticated ${user?.fullname}`);
    next();
  } catch (error) {
    console.log(error);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
