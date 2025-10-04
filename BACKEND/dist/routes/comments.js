import express from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/", getComments); // Get all top-level comments
router.post("/", createComment); // Create a comment
router.patch("/:id", updateComment); // Update a comment
router.delete("/:id", deleteComment); // Delete a comment

export default router;
