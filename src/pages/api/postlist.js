// src/api/postlist.js
import api from './axios';

// 게시글 목록
const postlist = async (page) => {
  const res = await api.get(`/post/list?page=${page}`);
  return res.data;
};

// 검색 API
const search = async (keyword, page = 1) => {
  const res = await api.get(`/search`, {
    params: {
      keyword,
      page,
    },
  });
  return res.data;
};

export default {
  postlist,
  search,
};
