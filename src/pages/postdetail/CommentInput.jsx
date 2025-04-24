import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import S from './style';

/**
 * 댓글 입력창 컴포넌트
 * - onSubmit: 댓글 작성/수정 후 상위 컴포넌트에서 상태 갱신용 콜백
 * - disabled: 제한 상태일 경우 입력/제출 비활성화
 * - postId: 현재 게시글 ID
 * - editingComment: 수정 중인 댓글 객체 (없으면 새 댓글 작성 모드)
 * - clearEdit: 수정 모드 종료 함수
 */
const CommentInput = ({ onSubmit, disabled, postId, editingComment, clearEdit }) => {
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

 
  // 수정 모드일 경우 기존 댓글 내용 초기값으로 채움
  useEffect(() => {
    if (editingComment) {
      setComment(editingComment.content);
    }
  }, [editingComment]);


  // 댓글 제출 (작성 또는 수정)
  const handleSubmit = async () => {
    if (disabled) return;

    const trimmed = comment.trim();
    if (!trimmed) return; // 공백만 입력된 경우 무시

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
        if (clearEdit) clearEdit(); // 수정 모드 종료
      } else {
        // 새 댓글 작성
        await axios.post(
          `http://localhost:8080/api/comment/${postId}`,
          { content: trimmed },
          config
        );
        console.log('✅ 댓글 등록 성공');
      }

      setComment(''); // 입력창 초기화
      if (onSubmit) onSubmit(); // 외부에 상태 변경 알림
    } catch (error) {
      console.error('❌ 댓글 처리 실패:', error);
      alert('댓글 처리에 실패했습니다.');
    }
  };

  // 엔터 키로도 제출 가능
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter') {
      e.preventDefault(); // 줄바꿈 방지
      handleSubmit();
    }
  };

  return (
    <S.CommentInputWrapper>
      <S.CommentInput
        placeholder={disabled ? '댓글 입력이 제한되었습니다.' : '댓글을 입력하세요.'}
        value={comment}
        onChange={(e) => !disabled && setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <S.IconButton onClick={handleSubmit} disabled={disabled} />
    </S.CommentInputWrapper>
  );
};

export default CommentInput;
