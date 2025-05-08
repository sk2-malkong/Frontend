import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import S from "./style";
import profileImageUrl from "./profile.svg"; 
import { useNavigate } from "react-router-dom";

/**
 * PostForm
 * - 게시글 작성/수정 폼 컴포넌트
 * - 제목, 내용 입력 및 제출 기능
 * - 작성/수정 페이지에서 공통으로 사용
 */
interface PostFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (data: { title: string; content: string }) => Promise<void> | void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  onCancel,
}) => {
  const navigate = useNavigate();

  // 입력 상태
  const [title, setTitle] = useState<string>(initialTitle);
  const [content, setContent] = useState<string>(initialContent);
  const [loading, setLoading] = useState<boolean>(false);

  // 사용자 정보
  const [nickname, setNickname] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 욕설 제한 로직 상태
  const [isRestricted, setIsRestricted] = useState<boolean>(false);
  const [restrictionEnd, setRestrictionEnd] = useState<string | null>(null);

  /**
   * 로컬스토리지에서 penalty 정보 기반으로 제한 여부 판단
   */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) setNickname(storedUsername);
    }

    const countStr = localStorage.getItem("penaltyCount");
    const endDateStr = localStorage.getItem("penaltyEndDate");
    const count = countStr ? parseInt(countStr) : 0;
    const now = new Date();

    console.log("🚫 penaltyCount:", count);
    console.log("🚫 penaltyEndDate:", endDateStr);

    if (count > 0 && count % 5 === 0) {
      if (!endDateStr || new Date(endDateStr) > now) {
        setIsRestricted(true);
        if (endDateStr) setRestrictionEnd(endDateStr);
      }
    }
  }, []);

  /**
   * 수정 모드에서 초기값 설정
   * - props로 넘어온 title/content로 입력값 세팅
   */
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  // 제한 메시지
  const restrictionMessage = restrictionEnd
    ? `⚠️ 욕설 사용으로 인해 ${new Date(restrictionEnd).toLocaleString()}까지 작성이 제한됩니다.`
    : "⚠️ 욕설 5회 사용으로 작성이 제한되었습니다.";

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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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
                onChange={handleTitleChange}
                required
                disabled={isRestricted} // 작성 제한 시 입력 차단
              />
              <S.TextArea
                placeholder="글을 작성해 주세요..."
                value={content}
                onChange={handleContentChange}
                required
                disabled={isRestricted} // 작성 제한 시 입력 차단
              />
            </S.ContentBody>
          </S.ContentBox>

          <S.ButtonRow>
            <S.BackButton type="button" onClick={onCancel}>
              이전 화면으로
            </S.BackButton>
            <S.SubmitButton
              type="submit"
              active={canSubmit}
              disabled={!canSubmit}
            >
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
