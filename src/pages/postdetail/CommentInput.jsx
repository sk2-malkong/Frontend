import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  CommentInputWrapper,
  CommentInput as Input,
  IconButton,
} from './style';

/**
 * 댓글 입력창 컴포넌트
 * - 댓글 작성: 텍스트 입력 후 Enter 키 또는 버튼 클릭
 * - 댓글 수정: editingComment가 존재하면 PUT 요청
 * - 제한(disabled) 상태일 경우 입력/제출 비활성화
 */
const CommentInput = ({ onSubmit, disabled, postId, editingComment, clearEdit }) => {
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  // 수정 모드일 경우 초기값 채우기
  useEffect(() => {
    if (editingComment) {
      setComment(editingComment.content);
    }
  }, [editingComment]);

  const handleSubmit = async () => {
    if (disabled) return;

    const trimmed = comment.trim();
    if (!trimmed) return;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingComment) {
        // 댓글 수정
        await axios.put(
          `http://localhost:8080/api/comment/${editingComment.commentId}`,
          { content: trimmed },
          config
        );
        alert('댓글이 수정되었습니다.');
        if (clearEdit) clearEdit();
      } else {
        // 새 댓글 작성
        await axios.post(
          `http://localhost:8080/api/comment/${postId}`,
          { content: trimmed },
          config
        );
        console.log('✅ 댓글 등록 성공');
      }

      setComment('');
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('❌ 댓글 처리 실패:', error);
      alert('댓글 처리에 실패했습니다.');
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
