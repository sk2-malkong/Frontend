import axios, { AxiosRequestConfig } from 'axios';

const API_BASE = 'http://localhost:8080';

interface UpdatePostParams {
  title: string;
  content: string;
}

/**
 * 게시글 수정 요청
 * - PUT /api/post/update/{postId}
 */
export const updatePost = async (postId: number, updatedPost: UpdatePostParams): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.put(`${API_BASE}/api/post/update/${postId}`, updatedPost, config);
};
