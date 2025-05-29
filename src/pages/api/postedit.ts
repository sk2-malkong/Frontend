import api from './axios'; // axios.ts에서 설정한 API 클라이언트 import

interface UpdatePostParams {
  title: string;
  content: string;
}

/**
 * 게시글 수정 요청
 * - PUT /api/post/update/{postId}
 */
export const updatePost = async (postId: number, updatedPost: UpdatePostParams): Promise<void> => {
  await api.put(`/post/update/${postId}`, updatedPost);
};