import { useEffect, useState } from "react";
import Comment from "./comment";
import "./styles.css";

const NestedComments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // ✅ Fetch comments from backend
  const fetchComments = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/comments");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // ✅ Add new root comment
  const handleSubmit = async () => {
    if (!comment.trim()) return;

    const res = await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: comment,
        username: "guest", // later dynamic
      }),
    });

    if (res.ok) {
      await fetchComments(); // refresh
      setComment("");
    }
  };

  // ✅ Add reply
  const handleReply = async (parentId, message) => {
    const res = await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, username: "guest", parentId }),
    });

    if (res.ok) fetchComments();
  };

  // ✅ Edit comment
  const handleEdit = async (id, message) => {
    await fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    fetchComments();
  };

  // ✅ Delete comment
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "DELETE",
    });
    fetchComments();
  };

  return (
    <>
      <div className="add-comment">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          cols={50}
          className="comment-textarea"
          placeholder="Add a new comment..."
        />
        <button onClick={handleSubmit} className="comment-button">
          Add Comment
        </button>
      </div>

      {/* ✅ Pass all handlers down */}
      {comments.map((c) => (
        <Comment
          key={c.id}
          comment={c}
          onSubmitComment={handleReply}
          onEditComment={handleEdit}
          onDeleteComment={handleDelete}
        />
      ))}
    </>
  );
};

export default NestedComments;
