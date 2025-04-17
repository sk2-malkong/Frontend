import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../postcreate/PostForm';
import { dummyPosts } from '../postcreate/dummyData'; // 🔹 공유 데이터 import

const PostEditContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 현재 글 찾기
  const post = dummyPosts.find((p) => p.id === id);

  if (!post) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  // 🔹 수정 완료 시
  const handleSubmit = (updatedPost) => {
    console.log('수정된 내용:', updatedPost);

    // 화면 테스트용으로 직접 수정 반영
    post.title = updatedPost.title;
    post.content = updatedPost.content;

    navigate(`/post/${id}`); // 수정 후 상세 페이지로 이동
  };

  // 🔹 취소 버튼
  const handleCancel = () => {
    navigate(`/post/${id}`);
  };

  return (
    <PostForm
      initialTitle={post.title}
      initialContent={post.content}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default PostEditContainer;
