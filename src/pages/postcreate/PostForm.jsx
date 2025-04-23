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
import auth from '../api/auth';
import { useNavigate } from "react-router-dom";

const PostForm = ({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  onCancel,
}) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profanityCount, setProfanityCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          setIsLoggedIn(true);
          const userData = await auth.profile();  
          console.log('프로필 데이터:', userData);
          setNickname(userData.username);
        }
      } catch (error) {
        console.error('프로필 조회 실패:', error.message);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const isRestricted = profanityCount > 0 && profanityCount % 5 === 0;
  const restrictionMessage = "⚠️ 욕설 5회 사용으로 작성 제한되었습니다.";

  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  const isActive = trimmedTitle !== "" && trimmedContent !== "";
  const isUnchanged = trimmedTitle === initialTitle.trim() && trimmedContent === initialContent.trim();

  const canSubmit = isActive && !isRestricted && !loading && !isUnchanged;

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

  return (
    <Wrapper>
      <Container>
        {isRestricted && (
          <RestrictionMessageBox>
            {restrictionMessage}
          </RestrictionMessageBox>
        )}

        <form onSubmit={handleSubmit}>
          <Profile>
            <ProfileImage src={profileImageUrl} alt="프로필" />
            <UserInfo>
              <Nickname>{nickname}</Nickname>
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
            <BackButton type="button" onClick={onCancel}>
              이전 화면으로
            </BackButton>
            <SubmitButton type="submit" active={canSubmit} disabled={!canSubmit}>
              {loading
                ? "작성 중..."
                : isRestricted
                ? "작성 제한됨"
                : "작성 완료"}
            </SubmitButton>
          </ButtonRow>
        </form>
      </Container>
    </Wrapper>
  );
};

export default PostForm;