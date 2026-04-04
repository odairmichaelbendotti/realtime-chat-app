import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuth } from "../middleware/socket-auth.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// apply authentication middleware to all socket connections
io.use(socketAuth);

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("Usuário conectado", socket.user);
});
