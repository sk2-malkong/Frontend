import React, { useState } from "react";
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

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getCurrentDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}/${day} ${hours}:${minutes}`;
  };

  const currentDate = getCurrentDate();
  const profileImageUrl = "https://via.placeholder.com/40";

  const handleBack = () => {
    console.log("이전 화면으로 이동");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출됨:", { title, content });
    setTitle("");
    setContent("");
  };

  const isActive = title.trim() !== "" && content.trim() !== "";

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
          <BackButton onClick={handleBack}>이전 화면으로</BackButton>
          <SubmitButton type="submit" active={isActive} onClick={handleSubmit}>
            작성 완료
          </SubmitButton>
        </ButtonRow>
      </Container>
    </Wrapper>
  );
};

export default PostCreate;
