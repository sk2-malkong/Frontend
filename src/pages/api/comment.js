import axios from 'axios';

const API_BASE = 'http://localhost:8080';

/**
 * 댓글 작성
 * - POST /api/comment/{postId}
 */
export const createComment = async (postId, content) => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_BASE}/api/comment/${postId}`, { content }, config);
  return response.data;
};

/**
 * 댓글 수정
 * - PUT /api/comment/{commentId}
 */
export const updateComment = async (commentId, content) => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_BASE}/api/comment/${commentId}`, { content }, config);
  return response.data;
};

/**
 * 댓글 조회
 * - GET /api/comment/{postId}
 */
export const fetchComments = async (postId) => {
  const response = await axios.get(`${API_BASE}/api/comment/${postId}`);
  return response.data;
};

/**
 * 댓글 삭제
 * - DELETE /api/comment/{commentId}
 */
export const deleteComment = async (commentId) => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_BASE}/api/comment/${commentId}`, config);
  return response.data;
};
