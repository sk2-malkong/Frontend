import axios, { AxiosRequestConfig } from 'axios';

const API_BASE = 'http://10.0.2.161:8080';

interface CreatePostParams {
  title: string;
  content: string;
}

interface CreatePostResponse {
  postId: number;
}

/**
 * 게시글 생성 API 요청
 * - POST /api/post/create
 */
export const createPost = async ({ title, content }: CreatePostParams): Promise<CreatePostResponse> => {
  const token = localStorage.getItem('accessToken');
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(`${API_BASE}/api/post/create`, { title, content }, config);
  return response.data;
};
