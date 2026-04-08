import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuth } from "../middleware/socket-auth.js";

const app = express();
const server = http.createServer(app);

type SocketUser = {
  socketId: string;
  userId: string;
  name: string;
};

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// apply authentication middleware to all socket connections
io.use(socketAuth);
let users: SocketUser[] = [];

io.on("connection", (socket) => {
  users = users.filter((user) => user.socketId !== socket.id);

  users.push({
    socketId: socket.id,
    userId: socket.user._id.toString(),
    name: socket.user.fullname,
  });

  io.emit("users", users);
  console.log("connect");

  socket.on("join_chat", (user) => {
    io.emit("user_joined", user);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("users", users);
    console.log("disconnect");
  });
});

export { app, server, io };
