import React, { useState, useEffect } from "react";
import S from "./style";
import profileImageUrl from "./profile.svg"; // 기본 프로필 이미지
import auth from "../api/auth";
import { useNavigate } from "react-router-dom";

/**
 * PostForm
 * - 게시글 작성/수정 폼 컴포넌트
 * - 제목, 내용 입력 및 제출 기능
 * - 작성/수정 페이지에서 공통으로 사용
 */
const PostForm = ({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  onCancel,
}) => {
  const navigate = useNavigate();

  // 입력 상태
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  // 사용자 정보
  const [nickname, setNickname] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 욕설 제한 로직 (욕설 제한 기능 api 연동이 안되어서 구현 덜 됨. 수정 필요)
  const [profanityCount, setProfanityCount] = useState(0);

  /**
   * 사용자 프로필 불러오기
   * - 로그인 상태 확인
   * - 닉네임 표시용 데이터 요청
   */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setIsLoggedIn(true);
          const userData = await auth.profile();
          console.log("프로필 데이터:", userData);
          setNickname(userData.username);
        }
      } catch (error) {
        console.error("프로필 조회 실패:", error.message);
      }
    };
    fetchProfile();
  }, []);

  /**
   * 수정 모드에서 초기값 설정
   * - props로 넘어온 title/content로 입력값 세팅
   */
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  // 작성 제한 여부 판단 (욕설 사용 횟수 기준)
  const isRestricted = profanityCount > 0 && profanityCount % 5 === 0;
  const restrictionMessage = "⚠️ 욕설 5회 사용으로 작성 제한되었습니다.";

  // 유효성 검사용 정리된 값
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  // 사용자가 제목과 본문을 모두 제대로 입력했는지 확인
  const isActive = trimmedTitle !== "" && trimmedContent !== "";
  // 수정 화면에서 사용자가 내용을 하나도 안바꿨는지 확인
  const isUnchanged = trimmedTitle === initialTitle.trim() && trimmedContent === initialContent.trim();

  // 제출 가능 여부 판단
  const canSubmit = isActive && !isRestricted && !loading && !isUnchanged;

  /**
   * 폼 제출 핸들러
   * - 유효성 검사 후 onSubmit 실행
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit && onSubmit) {
      try {
        setLoading(true);
        await onSubmit({ title: trimmedTitle, content: trimmedContent });
      } finally {
        setLoading(false);
      }
    }
  };

  /**
   * 렌더링
   * - 작성 제한 메시지
   * - 제목/내용 입력
   * - 취소/제출 버튼
   */
  return (
    <S.Wrapper>
      <S.Container>
        {isRestricted && (
          <S.RestrictionMessageBox>
            {restrictionMessage}
          </S.RestrictionMessageBox>
        )}

        <form onSubmit={handleSubmit}>
          <S.Profile>
            <S.ProfileImage src={profileImageUrl} alt="프로필" />
            <S.UserInfo>
              <S.Nickname>{nickname}</S.Nickname>
            </S.UserInfo>
          </S.Profile>

          <S.ContentBox>
            <S.ContentBody>
              <S.TitleInput
                type="text"
                placeholder="제목 입력"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <S.TextArea
                placeholder="글을 작성해 주세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </S.ContentBody>
          </S.ContentBox>

          <S.ButtonRow>
            <S.BackButton type="button" onClick={onCancel}>
              이전 화면으로
            </S.BackButton>
            <S.SubmitButton type="submit" active={canSubmit} disabled={!canSubmit}>
              {loading
                ? "작성 중..."
                : isRestricted
                ? "작성 제한됨"
                : "작성 완료"}
            </S.SubmitButton>
          </S.ButtonRow>
        </form>
      </S.Container>
    </S.Wrapper>
  );
};

export default PostForm;
