import React from 'react';
import PostForm from '../postcreate/PostForm';

const PostEdit = ({ post, onSubmit, onCancel, isAuthor }) => {
  if (!post) return <div>존재하지 않는 게시물입니다.</div>;

  return (
    <PostForm
      initialTitle={post.title}
      initialContent={post.content}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isBlocked={!isAuthor}
    />
  );
};

export default PostEdit;
