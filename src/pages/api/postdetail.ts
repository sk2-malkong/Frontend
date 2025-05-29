import api from './axios'; // axios.ts에서 설정한 API 클라이언트 import

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
  const response = await api.get(`/post/${postId}`);
  return response.data;
};

/**
 * 게시글 삭제 요청
 * - DELETE /api/post/delete/{postId}
 */
export const deletePost = async (postId: number): Promise<void> => {
  await api.delete(`/post/delete/${postId}`);
};