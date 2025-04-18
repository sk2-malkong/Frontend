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

/**
 * 글 작성/수정 폼 컴포넌트
 * - initialTitle, initialContent: 초기 값 (수정 시 사용)
 * - onSubmit: 작성 완료 버튼 클릭 시 호출
 * - onCancel: 이전 화면으로 버튼 클릭 시 호출
 */
const PostForm = ({ initialTitle = "", initialContent = "", onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  /**
   * 수정 페이지 진입 시 초기값 반영
   */
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  /**
   * 제목과 내용이 모두 입력된 경우에만 제출 버튼 활성화
   */
  const isActive = title.trim() !== "" && content.trim() !== "";

  /**
   * 제출 핸들러
   * - 유효한 입력이 있을 때만 onSubmit 호출
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isActive && onSubmit) {
      onSubmit({ title: title.trim(), content: content.trim() });
    }
  };

  /**
   * 현재 날짜와 시간 반환 (MM/DD HH:mm)
   */
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
        {/* 작성자 정보 (더미 프로필) */}
        <Profile>
          <ProfileImage src={profileImageUrl} alt="Profile" />
          <UserInfo>
            <Nickname>동글이</Nickname>
            <DateText>{currentDate}</DateText>
          </UserInfo>
        </Profile>

        {/* 제목 & 내용 입력 영역 */}
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
