import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        parentId: null,
      },
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

const createComment = async (req, res) => {
  const { message, username, parentId } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        message,
        username,
        parentId,
      },
      include: {
        children: true,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating comment" });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: { message },
      include: {
        children: true,
      },
    });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating comment" });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.comment.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting comment" });
  }
};

export { getComments, createComment, updateComment, deleteComment };
