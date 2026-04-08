import express from "express";
import { fileURLToPath } from "url";
import { authRoutes } from "./routes/auth.js";
import { messagesRoutes } from "./routes/messages.js";
import path from "path";
import { mongoConnect } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import { userRoutes } from "./routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/user", userRoutes);

// Relative path to production
if (process.env.NODE_ENV === "development") {
  const static_frontend = path.join(__dirname, "../../front-end/dist");
  app.use(express.static(static_frontend));

  app.use((_, res) => {
    res.sendFile(path.join(static_frontend, "index.html"));
  });
}

server.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:" + process.env.PORT);
  mongoConnect();
});
