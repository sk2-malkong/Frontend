import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../postcreate/PostForm';
import { dummyPosts } from '../postcreate/dummyData'; // 🔹 공유 더미 데이터 import

/**
 * 게시글 수정 페이지 컨테이너
 * - URL 파라미터로 전달된 ID에 해당하는 게시글을 찾아서 PostForm에 전달
 * - 수정 완료 시 해당 게시글 데이터를 갱신
 */
const PostEditContainer = () => {
  const { id } = useParams(); // 라우트 파라미터에서 게시글 ID 추출
  const navigate = useNavigate();

  // 더미 데이터를 상태로 복제 (PostForm에서 실시간 수정 반영을 위해)
  const [posts, setPosts] = useState(dummyPosts);

  // 수정 대상 게시글 찾기
  const post = posts.find((p) => p.id === id);

  // 게시글이 존재하지 않을 경우 처리
  if (!post) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  /**
   * 수정 완료 핸들러
   * - 해당 게시글을 찾아서 title, content만 갱신
   * - 상태와 외부 dummyPosts 모두 업데이트 (테스트용)
   */
  const handleSubmit = (updatedPost) => {
    const updatedPosts = posts.map((p) =>
      p.id === id
        ? { ...p, title: updatedPost.title, content: updatedPost.content }
        : p
    );

    setPosts(updatedPosts);        // 상태 업데이트
    dummyPosts.splice(0, dummyPosts.length, ...updatedPosts); // 외부 더미 데이터 직접 갱신

    console.log('수정된 내용:', updatedPost);
    navigate(`/post/${id}`); // 수정 후 상세 페이지로 이동
  };

  /**
   * 취소 시 현재 글 상세 페이지로 돌아감
   */
  const handleCancel = () => {
    navigate(`/post/${id}`);
  };

  // PostForm에 초기값과 핸들러 전달
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
