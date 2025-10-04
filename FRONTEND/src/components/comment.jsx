/* eslint-disable react/prop-types */
import { useState } from "react";

const Comment = ({
  comment = {},
  onSubmitComment = () => {},
  onEditComment = () => {},
  onDeleteComment = () => {},
}) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.message);

  const toggleExpand = () => setExpand(!expand);

  const handleReplySubmit = () => {
    if (replyContent) {
      onSubmitComment(comment.id, replyContent);
      setReplyContent("");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditedContent(comment.message); // reset with actual message
  };

  const handleChange = (e) => {
    if (editMode) {
      setEditedContent(e.target.value);
    } else {
      setReplyContent(e.target.value);
    }
  };

  const handleEditSubmit = () => {
    onEditComment(comment.id, editedContent);
    setEditMode(false);
  };

  return (
    <div className="comment">
      {!editMode ? (
        <>
          <p className="comment-content">{comment.message}</p>
          <p className="comment-info">
            By <strong>{comment.username}</strong>
          </p>
          <p className="comment-info">
            {comment.createdAt
              ? new Date(comment.createdAt).toLocaleString()
              : ""}
          </p>
        </>
      ) : (
        <div className="add-comment">
          <textarea
            value={editedContent}
            onChange={handleChange}
            rows={3}
            cols={50}
            className="comment-textarea"
          />
          <button onClick={handleEditSubmit} className="comment-button">
            Save Edit
          </button>
          <button onClick={toggleEditMode} className="comment-button">
            Cancel Edit
          </button>
        </div>
      )}

      <div className="comment-actions">
        <button onClick={toggleExpand} className="comment-button">
          {expand ? "Hide Replies" : "Reply"}
        </button>
        <button onClick={toggleEditMode} className="comment-button">
          Edit
        </button>
        <button
          onClick={() => onDeleteComment(comment.id)}
          className="comment-button"
        >
          Delete
        </button>
      </div>

      {expand && (
        <div className="comment-replies">
          <div className="add-comment">
            <textarea
              value={replyContent}
              onChange={handleChange}
              placeholder="Add a reply..."
              rows={3}
              cols={50}
              className="comment-textarea"
            />
            <button onClick={handleReplySubmit} className="comment-button">
              Submit Reply
            </button>
          </div>
          {comment?.children?.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onSubmitComment={onSubmitComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
