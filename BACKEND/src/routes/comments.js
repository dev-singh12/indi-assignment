import express from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/", getComments);

// Create a new comment
router.post("/", createComment);

// Update a comment
router.patch("/:id", updateComment);

// Delete a comment
router.delete("/:id", deleteComment);

export default router;
