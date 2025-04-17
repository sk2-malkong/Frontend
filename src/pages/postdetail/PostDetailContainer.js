import React from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from './PostDetail';
import { dummyPosts } from '../postcreate/dummyData'; // 🔹 공유 데이터 import

const PostDetailContainer = () => {
  const { id } = useParams();

  // 🔹 ID에 맞는 게시글 찾기
  const post = dummyPosts.find((p) => p.id === id);

  if (!post) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  // 🔹 더미 댓글
  const dummyComments = [
    { username: 'username_1', date: '04/11 09:34', text: '아무것도 안할 때가 제일 스트레스임' },
    { username: 'username_2', date: '04/11 10:05', text: '안분지족 할려고 ㅇㅇ' },
  ];

  return <PostDetail post={post} comments={dummyComments} />;
};

export default PostDetailContainer;
