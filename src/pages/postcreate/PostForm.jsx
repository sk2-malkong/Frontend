import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Container,
  Profile,
  ProfileImage,
  UserInfo,
  Nickname,
  DateText,
  ContentBox,
  ContentBody,
  TitleInput,
  TextArea,
  ButtonRow,
  BackButton,
  SubmitButton,
} from "./style";
import profileImageUrl from "./profile.svg";

const PostForm = ({ initialTitle = "", initialContent = "", onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  // 수정 페이지에서도 제목과 내용 반영
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const isActive = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isActive && onSubmit) {
      onSubmit({ title: title.trim(), content: content.trim() });
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}/${day} ${hours}:${minutes}`;
  };

  const currentDate = getCurrentDate();

  return (
    <Wrapper>
      <Container>
        <Profile>
          <ProfileImage src={profileImageUrl} alt="Profile" />
          <UserInfo>
            <Nickname>동글이</Nickname>
            <DateText>{currentDate}</DateText>
          </UserInfo>
        </Profile>

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

        <ButtonRow>
          <BackButton onClick={onCancel}>이전 화면으로</BackButton>
          <SubmitButton type="submit" active={isActive} onClick={handleSubmit}>
            작성 완료
          </SubmitButton>
        </ButtonRow>
      </Container>
    </Wrapper>
  );
};

export default PostForm;
