import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../postcreate/PostForm';

const PostEditContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 더미 데이터를 상태로 복제
  const [posts, setPosts] = useState(dummyPosts);

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  const handleSubmit = (updatedPost) => {
    const updatedPosts = posts.map((p) =>
      p.id === id ? { ...p, title: updatedPost.title, content: updatedPost.content } : p
    );

    setPosts(updatedPosts);
    dummyPosts = updatedPosts; // 외부 더미 데이터도 업데이트해서 반영 유지

    console.log('수정된 내용:', updatedPost);
    navigate(`/post/${id}`); // 수정 완료 후 상세페이지로 이동
  };

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
