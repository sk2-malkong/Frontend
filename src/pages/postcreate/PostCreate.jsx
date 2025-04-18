import React from "react";
import PostForm from "./PostForm";

/**
 * 게시글 작성 페이지
 * - PostForm 컴포넌트를 통해 새 글을 작성
 * - 작성 완료 시 handleSubmit, 취소 시 handleCancel 실행
 */
const PostCreate = () => {
    /**
   * 글 작성 완료 핸들러
   * - PostForm에서 제출된 data를 처리
   * - API 연동 후 실제 저장 로직 추가
   */
  const handleSubmit = (data) => {
    console.log("새 글 등록됨:", data);
    // API 연결 예정
    // 예: axios.post('/api/posts', data)
  };

  /**
   * 작성 취소 핸들러
   * - 이전 화면으로 돌아가기
   * - useNavigate() 이용해 뒤로 가기 구현 예정
   */
  const handleCancel = () => {
    console.log("이전 화면으로");
    // 예: navigate(-1) 등
  };

  // 공통 폼 컴포넌트에 props 전달
  return <PostForm onSubmit={handleSubmit} onCancel={handleCancel} />;
};

export default PostCreate;
