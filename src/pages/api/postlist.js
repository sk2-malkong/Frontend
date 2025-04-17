import api from './axios';

// 게시글 목록 조회
const postlist = async (page) => {
  const res = await api.get(`/post/list?page=${page}`);
  return res.data;
};

// 게시글 검색
const search = async (keyword, page = 0, size = 8, sort = 'createdAt', direction = 'DESC') => {
  const res = await api.get(`/search`, {
    params: {
      keyword,
      page,
      size,
      sort,
      direction,
    },
  });
  return res.data;
};

export default {
  postlist,
  search,
};
