import styled from "styled-components";

const baseFont = `
  font-family: 'Pretendard', sans-serif;
`;

// 페이지 전체 Wrapper (PostDetail의 Container 대응)
export const Wrapper = styled.div`
  ${baseFont}
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2.5rem 1rem;
  background-color: #fff;
`;

// 내부 콘텐츠 Wrapper (PostDetail의 InnerWrapper 대응)
export const Container = styled.div`
  width: 100%;
  max-width: 45.625rem; /* 730px */
  margin: 0 auto;
  ${baseFont}

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

// 프로필
export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

export const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Nickname = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: #000;
  ${baseFont}
`;

export const DateText = styled.span`
  font-size: 1rem;
  color: #aaa;
  ${baseFont}
`;

// 글쓰기 박스 (PostDetail의 Card 대응)
export const ContentBox = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  height: 460px;
  overflow-y: auto;
  margin-bottom: 1.875rem;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

export const ContentBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.875rem 1.5rem 1.875rem 1.875rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const TitleInput = styled.input`
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 0.25rem;
  outline: none;
  color: #000;
  ${baseFont}

  &::placeholder {
    color: #aaa;
  }
`;

export const TextArea = styled.textarea`
  flex: 1;
  width: 100%;
  border: none;
  padding: 0.5rem 0.25rem;
  resize: none;
  outline: none;
  font-size: 1rem;
  font-weight: 100;
  line-height: 1.75;
  color: #000;
  ${baseFont}

  &::placeholder {
    color: #bbb;
  }
`;

// 버튼 영역
export const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const BackButton = styled.button`
  width: 180px;
  height: 55px;
  background-color: #797979;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #5e5e5e;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SubmitButton = styled.button`
  width: 180px;
  height: 55px;
  background-color: ${(props) => (props.active ? "#5784E1" : "#797979")};
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};

  &:hover {
    background-color: ${(props) => (props.active ? "#447acc" : "#5e5e5e")};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
