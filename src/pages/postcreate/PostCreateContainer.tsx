import React from "react";
import PostCreate from "./PostCreate";

/**
 * PostCreateContainer
 * - 게시글 작성 화면의 컨테이너 컴포넌트
 * - 역할: PostCreate 컴포넌트를 감싸는 껍데기
 * - 주로 라우터 연결 또는 레이아웃 통일 목적
 * - 실제 로직은 PostCreate.jsx에서 처리됨
 */
const PostCreateContainer: React.FC = () => {
  return <PostCreate />;
};

export default PostCreateContainer;
