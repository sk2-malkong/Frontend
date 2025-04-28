import axios from 'axios';

const API_BASE = 'http://localhost:8080';

/**
 * 게시글 수정 요청
 * - PUT /api/post/update/{postId}
 */
export const updatePost = async (postId, updatedPost) => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_BASE}/api/post/update/${postId}`,
    updatedPost,
    config
  );
  return response.data;
};
