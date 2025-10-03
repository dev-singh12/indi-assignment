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
    origin: "http://localhost:5173,",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.use("/api/comments", commentsRouter);

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
