import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchComments = async () => {
  const response = await axios.get(`${API_URL}/comments`);
  return response.data;
};

export const postComment = async (message, username, parentId = null) => {
  const response = await axios.post(`${API_URL}/comments`, {
    message,
    username,
    parentId,
  });
  return response.data;
};

export const editComment = async (commentId, message) => {
  const response = await axios.patch(`${API_URL}/comments/${commentId}`, {
    message,
  });
  return response.data;
};

export const deleteComment = async (commentId) => {
  await axios.delete(`${API_URL}/comments/${commentId}`);
};
