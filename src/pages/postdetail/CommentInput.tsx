import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import { createComment } from '../api/comment';

/**
 * CommentInput
 * 
 * - 새로운 댓글 작성 입력창
 * - 작성 완료 시 상위 컴포넌트에 콜백(onSubmit) 호출
 */
interface CommentInputProps {
  onSubmit: () => void;
  postId: number;
  isRestricted?: boolean; // 부모 컴포넌트에서 제한 여부 전달받음
}

const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  postId,
  isRestricted = false,
}) => {
  const [comment, setComment] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isRestricted) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (isRestricted) return;

    const trimmed = comment.trim();
    if (!trimmed) return;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
      return;
    }

    try {
      await createComment(postId, trimmed);
      console.log(' 댓글 등록 성공');
      setComment('');
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('❌ 댓글 처리 실패:', error);
      alert('댓글 처리에 실패했습니다.');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isRestricted) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <S.CommentInputWrapper>
      <S.CommentInput
        as="textarea"
        placeholder="댓글을 입력하세요."
        value={comment}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isRestricted}
      />
      <S.IconButton onClick={handleSubmit} disabled={isRestricted} />
    </S.CommentInputWrapper>
  );
};

export default CommentInput;