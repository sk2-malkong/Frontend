import api from './axios'; // axios.ts에서 설정한 API 클라이언트 import

interface CommentResponse {
  commentId: number;
  username: string;
  content: string;
  createdAt: string;

  // ✅ 서버에서 내려주는 필드 추가 (옵셔널)
  penaltyCount?: number;
  endDate?: string;
}

/**
 * 댓글 작성
 * - POST /api/comment/{postId}
 */
export const createComment = async (postId: number, content: string): Promise<CommentResponse> => {
  const response = await api.post(`/comment/${postId}`, { content });
  return response.data;
};

/**
 * 댓글 수정
 * - PUT /api/comment/{commentId}
 */
export const updateComment = async (commentId: number, content: string): Promise<CommentResponse> => {
  const response = await api.put(`/comment/${commentId}`, { content });
  return response.data;
};

/**
 * 댓글 조회
 * - GET /api/comment/{postId}
 */
export const fetchComments = async (postId: number): Promise<CommentResponse[]> => {
  const response = await api.get(`/comment/${postId}`);
  return response.data;
};

/**
 * 댓글 삭제
 * - DELETE /api/comment/{commentId}
 */
export const deleteComment = async (commentId: number): Promise<void> => {
  await api.delete(`/comment/${commentId}`);
};