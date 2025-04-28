import axios from 'axios';

const API_BASE = 'http://localhost:8080';

/**
 * 게시글 상세 조회
 * - GET /api/post/{postId}
 */
export const fetchPostDetail = async (postId) => {
  const response = await axios.get(`${API_BASE}/api/post/${postId}`);
  return response.data;
};

/**
 * 게시글 삭제 요청
 * - DELETE /api/post/delete/{postId}
 */
export const deletePost = async (postId) => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_BASE}/api/post/delete/${postId}`, config);
  return response.data;
};
