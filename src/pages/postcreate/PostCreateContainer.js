import React from 'react';
import PostCreate from './PostCreate';

/**
 * 게시글 작성 컨테이너
 * - PostCreate 컴포넌트를 감싸는 상위 구조
 * - 추후 레이아웃, 인증 체크, 전역 상태 연결 등을 위해 분리해둠
 */
const PostCreateContainer = () => {
  return (
    <div>
      <PostCreate/>
    </div>
  );
};

export default PostCreateContainer;