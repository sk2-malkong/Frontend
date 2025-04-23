import React, { useState } from 'react';
import axios from 'axios';
import {
  CommentInputWrapper,
  CommentInput as Input,
  IconButton,
} from './style';

/**
 * 댓글 입력창 컴포넌트
 * - 텍스트 입력 및 등록 버튼으로 댓글 작성
 * - 'Enter' 키 또는 버튼 클릭 시 제출
 * - 제한(disabled) 상태일 경우 입력/제출 비활성화
 */
const CommentInput = ({ onSubmit, disabled, postId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (disabled) return;

    const trimmed = comment.trim();
    if (!trimmed) return;

    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `http://localhost:8080/api/comment/${postId}`,
        { content: trimmed }, 
        config
      );

      console.log('✅ 댓글 등록 성공:', response.data); 

      // 새로 작성된 댓글을 목록에 반영하기 위한 새로고침 트리거
      if (onSubmit) {
        onSubmit(); // 자동 목록 갱신 트리거
      }

      setComment('');
    } catch (error) {
      console.error('❌ 댓글 등록 실패:', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <CommentInputWrapper>
      <Input
        placeholder={disabled ? '댓글 입력이 제한되었습니다.' : '댓글을 입력하세요.'}
        value={comment}
        onChange={(e) => !disabled && setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <IconButton onClick={handleSubmit} disabled={disabled} />
    </CommentInputWrapper>
  );
};

export default CommentInput;
