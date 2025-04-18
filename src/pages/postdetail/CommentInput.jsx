import React, { useState } from 'react';
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
const CommentInput = ({ onSubmit, disabled }) => {
  const [comment, setComment] = useState('');

  /**
   * 댓글 제출 처리 함수
   * - 입력값이 비어있거나 제한 상태일 경우 무시
   * - onSubmit prop을 통해 부모(PostDetail)로 댓글 전달
   */
  const handleSubmit = () => {
    if (disabled) return;

    const trimmed = comment.trim();
    if (!trimmed) return;

    const newComment = {
      username: 'username_3', // 실제 로그인 사용자 정보로 대체 예정
      date: getCurrentDate(),
      text: trimmed,
      profile: null, // 필요 시 사용자 프로필 이미지 연결
    };

    if (onSubmit) {
      onSubmit(newComment);
    }

    setComment('');
  };


  
  /**
   * 엔터 키 입력 시 제출 동작 처리
   */
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  /**
   * 현재 시간 포맷 생성 (MM/DD HH:mm 형식)
   */
  const getCurrentDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hour}:${minute}`;
  };

  return (
    <CommentInputWrapper>
      <Input
        placeholder={disabled ? '댓글 입력이 제한되었습니다.' : '댓글을 입력하세요.'}
        value={comment}
        onChange={(e) => {
          if (!disabled) setComment(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <IconButton onClick={handleSubmit} disabled={disabled} />
    </CommentInputWrapper>
  );
};

export default CommentInput;
