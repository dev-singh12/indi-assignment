import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import process from "process";
import commentsRouter from "./routes/comments.js";

export const prisma = new PrismaClient();

dotenv.config();

const app = express();
const PORT = process?.env?.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ comma hataya
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Mount comments router
app.use("/api/comments", commentsRouter);

// Error handler (✅ 4 args required)
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: err.message });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
