import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../postcreate/PostForm';
import { dummyPosts } from '../postcreate/dummyData'; // 공유 더미 데이터 import

/**
 * 게시글 수정 컨테이너
 * - 더미 데이터 기반으로 특정 게시글을 찾아 PostForm에 주입
 * - 화면 테스트를 위해 실제 데이터 수정 없이 배열 항목만 직접 변경
 */
const PostEditContainer = () => {
  const { id } = useParams(); // URL에서 게시글 ID 추출
  const navigate = useNavigate();

  // ID에 해당하는 게시글 찾기
  const post = dummyPosts.find((p) => p.id === id);

  // 게시글이 존재하지 않는 경우
  if (!post) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  /**
   * 수정 완료 시 호출되는 핸들러
   * - 더미 배열 객체를 직접 수정하여 화면에 반영
   * - 실제 앱에서는 API 요청 등을 통해 서버에 반영해야 함
   */
  const handleSubmit = (updatedPost) => {
    console.log('수정된 내용:', updatedPost);

    // 직접 객체 수정 (테스트용)
    post.title = updatedPost.title;
    post.content = updatedPost.content;

    // 수정 완료 후 해당 게시글 상세페이지로 이동
    navigate(`/post/${id}`);
  };

  /**
   * 취소 버튼 클릭 시 해당 게시글 상세페이지로 이동
   */
  const handleCancel = () => {
    navigate(`/post/${id}`);
  };

  // 🔹 글 수정 폼(PostForm)에 기존 데이터 및 핸들러 전달
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
