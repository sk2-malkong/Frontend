import axios, { AxiosRequestConfig } from 'axios';

const API_BASE = 'http://10.0.2.161:8080';

interface PostDetailResponse {
  postId: number;
  userId: number;
  username: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  count: number;
  commentCount: number;
}

/**
 * 게시글 상세 조회
 * - GET /api/post/{postId}
 */
export const fetchPostDetail = async (postId: number): Promise<PostDetailResponse> => {
  const response = await axios.get(`${API_BASE}/api/post/${postId}`);
  return response.data;
};

/**
 * 게시글 삭제 요청
 * - DELETE /api/post/delete/{postId}
 */
export const deletePost = async (postId: number): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(`${API_BASE}/api/post/delete/${postId}`, config);
};
