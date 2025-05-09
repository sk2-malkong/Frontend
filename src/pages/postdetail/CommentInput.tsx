import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import { createComment } from '../api/comment';
import auth from '../api/auth';
import { isUserRestricted } from '../../utils/penalty'; // ✅ 경로 수정

/**
 * CommentInput
 * 
 * - 새로운 댓글 작성 입력창
 * - 작성 완료 시 상위 컴포넌트에 콜백(onSubmit) 호출
 */
interface CommentInputProps {
  onSubmit: () => void;
  postId: number;
}

const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  postId,
}) => {
  const [comment, setComment] = useState<string>('');
  const [isRestricted, setIsRestricted] = useState<boolean>(false);
  const navigate = useNavigate();

  /**
   * 사용자 프로필 기반으로 댓글 작성 제한 여부 판단
   */
  useEffect(() => {
    const checkRestriction = async () => {
      try {
        const profile = await auth.profile();

        // ✅ 제한 판단
        const restricted = isUserRestricted(profile.isActive, profile.endDate ?? undefined);
        setIsRestricted(restricted);

        // ✅ 닉네임 갱신
        if (profile.username) {
          localStorage.setItem("username", profile.username);
        }

        // ✅ 최신 endDate 정보 저장
        if (profile.endDate) {
          localStorage.setItem("penaltyEndDate", profile.endDate);
        }
      } catch (err) {
        console.warn("⚠️ 프로필 조회 실패");
      }
    };

    checkRestriction();
  }, []);

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
      const res = await createComment(postId, trimmed);
      console.log('✅ 댓글 등록 성공');
      setComment('');
      if (onSubmit) onSubmit();

      // ✅ 응답에 endDate 정보가 포함되어 있으면 localStorage 갱신
      if (res.endDate) {
        localStorage.setItem('penaltyEndDate', res.endDate);
      }

      // ✅ 갱신된 정보로 다시 제한 여부 판단 (isActive는 false로 가정)
      const restrictedAfter = isUserRestricted(false, res.endDate ?? undefined);
      setIsRestricted(restrictedAfter);

      console.log('🟢 댓글 작성 후 penalty 정보 수동 갱신');
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
