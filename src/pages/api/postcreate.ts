import api from './axios'; // axios.ts에서 설정한 API 클라이언트 import

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
  const response = await api.post('/post/create', { title, content });
  return response.data;
};