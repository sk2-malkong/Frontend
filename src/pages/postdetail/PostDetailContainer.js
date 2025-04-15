import React from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from './PostDetail';

const PostDetailContainer = () => {
  const { id } = useParams();

  const dummyPost = {
    id,
    author: '동글이',
    date: '2025-04-11',
    title: '취업 준비 막막하다',
    content: '하는건 없는데\n스트레스만 만땅이다',
    views: 112,
  };

  const dummyComments = [
    { username: 'username_1', date: '04/11 09:34', text: '아무것도 안할 때가 제일 스트레스임' },
    { username: 'username_2', date: '04/11 10:05', text: '안분지족 할려고 ㅇㅇ' },
  ];

  return <PostDetail post={dummyPost} comments={dummyComments} />;
};

export default PostDetailContainer;
