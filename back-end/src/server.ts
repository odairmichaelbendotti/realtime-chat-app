import express from "express";
import { fileURLToPath } from "url";
import { authRoutes } from "./routes/auth.js";
import { messagesRouter } from "./routes/messages.js";
import path from "path";
import { mongoConnect } from "./lib/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRouter);

// Relative path to production
if (process.env.NODE_ENV === "development") {
  const static_frontend = path.join(__dirname, "../../front-end/dist");
  app.use(express.static(static_frontend));

  app.use((_, res) => {
    res.sendFile(path.join(static_frontend, "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:" + process.env.PORT);
  mongoConnect();
});
