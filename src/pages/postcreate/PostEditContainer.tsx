import React from "react";
import PostEdit from "./PostEdit";

/**
 * PostEditContainer
 * - 게시글 수정 화면의 컨테이너 컴포넌트
 * - 역할: PostEdit 컴포넌트를 감싸는 껍데기 역할만 수행
 * - 주로 라우팅 연결 또는 레이아웃 목적에서 사용
 * - 실제 로직은 PostEdit.jsx 내부에서 처리됨
 */
const PostEditContainer: React.FC = () => {
  return <PostEdit />;
};

export default PostEditContainer;
