import React from "react";
import PostForm from "./PostForm";

const PostCreate = () => {
  const handleSubmit = (data) => {
    console.log("새 글 등록됨:", data);
    // API 연결 예정
  };

  const handleCancel = () => {
    console.log("이전 화면으로");
    // 예: navigate(-1) 등
  };

  return <PostForm onSubmit={handleSubmit} onCancel={handleCancel} />;
};

export default PostCreate;
