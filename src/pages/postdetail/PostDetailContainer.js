import React from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from './PostDetail';
import { dummyPosts } from '../postcreate/dummyData'; // 더미 게시글 데이터 import

/**
 * 게시글 상세 페이지 컨테이너
 * - URL 파라미터에서 post ID를 받아 게시글 상세(PostDetail) 컴포넌트에 주입
 * - 게시글 데이터 및 더미 댓글 데이터 전달
 */
const PostDetailContainer = () => {
  const { id } = useParams(); // 라우트 파라미터에서 게시글 ID 추출

  // ID에 맞는 게시글 찾기
  const post = dummyPosts.find((p) => p.id === id);

  // 게시글이 존재하지 않을 경우 처리
  if (!post) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  // 더미 댓글 데이터 (나중에 백엔드 연동 시 교체 예정)
  const dummyComments = [
    { username: 'username_1', date: '04/11 09:34', text: '아무것도 안할 때가 제일 스트레스임' },
    { username: 'username_2', date: '04/11 10:05', text: '안분지족 할려고 ㅇㅇ' },
  ];
  
  // PostDetail 컴포넌트에 게시글과 댓글 props 전달
  return <PostDetail post={post} comments={dummyComments} />;
};

export default PostDetailContainer;
