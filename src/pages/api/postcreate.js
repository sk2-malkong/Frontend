import axios from 'axios';

const API_BASE = 'http://localhost:8080';

/**
 * 게시글 생성 API 요청
 * - POST /api/post/create
 */
export const createPost = async ({ title, content }) => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(`${API_BASE}/api/post/create`, { title, content }, config);
  return response.data;
};
