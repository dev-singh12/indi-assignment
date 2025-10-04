import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 🔹 Utility: Build nested comments recursively
function buildCommentTree(comments) {
  const map = {};
  const roots = [];

  comments.forEach((c) => (map[c.id] = { ...c, children: [] }));

  comments.forEach((c) => {
    if (c.parentId) {
      if (map[c.parentId]) map[c.parentId].children.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });

  return roots;
}

// 🔹 GET all comments (nested)export const getComments = async (req, res) => {
export const getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "asc" },
    });

    const map = {};
    const roots = [];

    comments.forEach((c) => (map[c.id] = { ...c, children: [] }));
    comments.forEach((c) => {
      if (c.parentId && map[c.parentId])
        map[c.parentId].children.push(map[c.id]);
      else roots.push(map[c.id]);
    });

    res.json(roots);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🔹 POST (create new comment)
export const createComment = async (req, res) => {
  try {
    const { message, username, parentId } = req.body;
    if (!message || !username)
      return res
        .status(400)
        .json({ message: "Message and username are required" });

    const newComment = await prisma.comment.create({
      data: {
        message,
        username,
        parentId: parentId || null,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error creating comment" });
  }
};

// 🔹 PATCH (update comment)
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    const updated = await prisma.comment.update({
      where: { id },
      data: { message },
    });

    res.json(updated);
  } catch (error) {
    console.error("❌ Error updating comment:", error);
    res.status(500).json({ message: "Error updating comment" });
  }
};

// 🔹 DELETE comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("❌ Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
