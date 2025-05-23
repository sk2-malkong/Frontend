import api from './axios';

// 게시글 아이템 타입
export interface PostItem {
  postId: number;
  title: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  count: number;
  content: string;
}

// 게시글 목록 조회 응답 타입
export interface PostListResponse {
  content: PostItem[];
  totalElements: number;
}

/**
 * 게시글 목록 조회
 */
const postlist = async (page = 0): Promise<PostListResponse> => {
  const res = await api.get(`/post/list?page=${page}`);
  return res.data;
};

/**
 * 게시글 검색
 */
const search = async (
  keyword: string,
  page = 0,
  size = 8,
  sort = 'createdAt',
  direction = 'DESC'
): Promise<PostListResponse> => {
  const res = await api.get(`/search`, {
    params: { keyword, page, size, sort, direction },
  });
  return res.data;
};

/**
 * 내가 작성한 게시글 조회
 */
const getMyPosts = async (page = 0): Promise<PostListResponse> => {
  const res = await api.get(`/post/my?page=${page}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data;
};

const postApi = {
  postlist,
  search,
  getMyPosts,
};

export default postApi;
