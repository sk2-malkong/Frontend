import React from "react";
import PostForm from "./PostForm";

/**
 * PostFormContainer
 * - PostForm 컴포넌트를 감싸는 중계용 컴포넌트
 * - 초기 제목/내용, 제출/취소 핸들러를 전달받아 그대로 PostForm에 넘김
 * - 필요 시 상태 관리, 로직 분리 또는 추후 전역 상태 연결을 고려한 구조
 */
interface PostFormContainerProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (data: { title: string; content: string }) => Promise<void> | void;
  onCancel: () => void;
  isRestricted?: boolean;
  restrictionEnd?: string;
}

const PostFormContainer: React.FC<PostFormContainerProps> = ({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  onCancel,
  isRestricted = false,
  restrictionEnd,
}) => {
  return (
    <div>
      <PostForm
        initialTitle={initialTitle}
        initialContent={initialContent}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isRestricted={isRestricted}
        restrictionEnd={restrictionEnd}
      />
    </div>
  );
};

export default PostFormContainer;
