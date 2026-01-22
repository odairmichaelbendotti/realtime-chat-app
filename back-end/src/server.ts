import express from "express";
import { authRoutes } from "./routes/auth.js";
import { messagesRouter } from "./routes/messages.js";

const app = express();

// Routes using
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:" + process.env.PORT);
});
