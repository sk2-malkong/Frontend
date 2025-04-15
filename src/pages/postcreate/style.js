import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1.25rem;
  overflow-x: hidden;
`;

export const Container = styled.div`
  width: 100%;
  max-width: clamp(100%, 90vw, 48.75rem); /* 랩탑 기준 780px까지 */
  margin: auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-family: "Pretendard", sans-serif;

  @media (max-width: 1024px) {
    max-width: 90vw;
  }

  @media (max-width: 767px) {
    padding: 0 0.75rem;
    gap: 1rem;
  }
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
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

  @media (max-width: 767px) {
    font-size: 1.125rem;
  }
`;

export const DateText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #aaa;

  @media (max-width: 767px) {
    font-size: 0.875rem;
  }
`;

export const ContentBox = styled.div`
  width: 100%;
  height: 28.9375rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  @media (max-width: 767px) {
    height: 25rem;
  }
`;

export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem;
  flex: 1;

  @media (max-width: 767px) {
    padding: 0.5rem;
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

  &::placeholder {
    color: #aaa;
  }

  @media (max-width: 767px) {
    font-size: 1.25rem;
    padding: 0.375rem 0.25rem;
  }
`;

export const ContentInput = styled.textarea`
  width: 100%;
  border: none;
  padding: 0.5rem 0.25rem;
  resize: none;
  flex: 1;
  outline: none;
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  letter-spacing: 0.015625rem;
  line-height: 1.8;

  &::placeholder {
    color: #bbb;
  }

  @media (max-width: 767px) {
    font-size: 0.9375rem;
    padding: 0.375rem 0.25rem;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;
  gap: 0.75rem;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const BackButton = styled.button`
  width: 11.25rem;
  height: 3.4375rem;
  background-color: #797979;
  color: #fff;
  font-size: 1.0625rem;
  font-weight: 600;
  border: none;
  border-radius: 3.125rem;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;

  &:hover {
    background-color: #5e5e5e;
  }

  @media (max-width: 767px) {
    width: 100%;
    font-size: 1rem;
  }
`;

export const SubmitButton = styled.button`
  width: 11.25rem;
  height: 3.4375rem;
  background-color: ${(props) => (props.active ? "#5784E1" : "#797979")};
  color: #fff;
  font-size: 1.0625rem;
  font-weight: 600;
  border: none;
  border-radius: 3.125rem;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
  font-family: "Pretendard", sans-serif;

  &:hover {
    background-color: ${(props) => (props.active ? "#447acc" : "#5e5e5e")};
  }

  @media (max-width: 767px) {
    width: 100%;
    font-size: 1rem;
  }
`;
