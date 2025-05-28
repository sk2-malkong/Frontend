import styled from "styled-components";

// 타입 정의를 위한 인터페이스
interface InputProps {
    $isValid?: boolean;
}

interface StatusMessageProps {
    $success?: boolean;
}

// 각 스타일드 컴포넌트 선언
const JoinPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 120px;
`;

const JoinContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  cursor: pointer;

  h2 {
      font-size: 50px;
      font-weight: bold;
      color: black;
  }

  img {
    width: 145px;
    height: 110px;
  }
`;

const JoinBox = styled.div`
  width: 560px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    font-size: 30px;
    font-weight: bold;
    color: black;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputWithButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input<InputProps>`
  width: 100%;
  height: 44px;
  padding: 10px 14px;
  font-size: 15px;
  border: 1px solid ${({ $isValid }) => ($isValid === false ? 'red' : '#ccc')};
  border-radius: 6px;
  color: black;

  &:focus {
    border-color: ${({ $isValid }) => ($isValid === false ? 'red' : '#5784e1')};
    outline: none;
  }
`;

const CheckButton = styled.button`
  width: 80px;
  height: 44px;
  background-color: #5784e1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #456ec4;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #5784e1;
  }
`;

const PasswordConditionText = styled.p<InputProps>`
  font-size: 14px;
  margin-top: 6px;
  color: ${({ $isValid }) => ($isValid ? "black" : "red")};
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: red;
  margin-top: 4px;
`;

const StatusMessage = styled.p<StatusMessageProps>`
  font-size: 14px;
  margin-top: 4px;
  color: ${({ $success }) => ($success ? 'green' : 'red')};
`;

// 모든 스타일드 컴포넌트를 객체로 내보내기
const S = {
    JoinPageWrapper,
    JoinContent,
    LogoWrapper,
    JoinBox,
    InputWrapper,
    InputWithButton,
    Input,
    CheckButton,
    Button,
    PasswordConditionText,
    ErrorMessage,
    StatusMessage
};

export default S;