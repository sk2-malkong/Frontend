import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Container,
  Profile,
  ProfileImage,
  UserInfo,
  Nickname,
  ContentBox,
  ContentBody,
  TitleInput,
  TextArea,
  ButtonRow,
  BackButton,
  SubmitButton,
  RestrictionMessageBox,
} from "./style";
import profileImageUrl from "./profile.svg";
import { currentUser } from "./userInfo"; // 사용자 정보 직접 사용

/**
 * 글 작성/수정 폼 컴포넌트
 */
const PostForm = ({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  // 🔹 제한 조건: 욕설 5, 10, 15회마다 제한
  const isRestricted =
    currentUser.profanityCount > 0 &&
    currentUser.profanityCount % 5 === 0;

  const restrictionMessage = "욕설 5회 사용하여 기능이 제한됩니다.";

  const isActive = title.trim() !== "" && content.trim() !== "";
  const canSubmit = isActive && !isRestricted;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit && onSubmit) {
      onSubmit({ title: title.trim(), content: content.trim() });
    }
  };

  return (
    <Wrapper>
      <Container>
        {/* 제한 메시지 */}
        {isRestricted && (
          <RestrictionMessageBox>
            ⚠ {restrictionMessage}
          </RestrictionMessageBox>
        )}

        <form onSubmit={handleSubmit}>
          {/* 작성자 정보 */}
          <Profile>
            <ProfileImage src={profileImageUrl} alt="Profile" />
            <UserInfo>
              <Nickname>{currentUser.nickname}</Nickname>
            </UserInfo>
          </Profile>

          {/* 입력 영역 */}
          <ContentBox>
            <ContentBody>
              <TitleInput
                type="text"
                placeholder="제목 입력"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextArea
                placeholder="글을 작성해 주세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </ContentBody>
          </ContentBox>

          {/* 버튼 영역 */}
          <ButtonRow>
            <BackButton type="button" onClick={onCancel}>
              이전 화면으로
            </BackButton>
            <SubmitButton type="submit" active={canSubmit}>
              {isRestricted ? "작성 제한됨" : "작성 완료"}
            </SubmitButton>
          </ButtonRow>
        </form>
      </Container>
    </Wrapper>
  );
};

export default PostForm;
