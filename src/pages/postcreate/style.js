import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  background-color: #fff;
  overflow-x: hidden;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 780px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: "Pretendard", sans-serif;

  @media (max-width: 768px) {
    gap: 20px;
    padding: 0 0.75rem;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
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
`;

export const DateText = styled.span`
  font-size: 1rem;
  color: #aaa;
`;

export const ContentBox = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 460px;
  overflow-y: auto;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

export const ContentBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const TitleInput = styled.input`
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #ddd;
  padding: 8px 4px;
  outline: none;
  color: #000;

  &::placeholder {
    color: #aaa;
  }
`;

export const TextArea = styled.textarea`
  flex: 1;
  width: 100%;
  border: none;
  padding: 8px 4px;
  resize: none;
  outline: none;
  font-size: 1rem;
  line-height: 1.75;
  color: #000;

  &::placeholder {
    color: #bbb;
  }
`;

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
