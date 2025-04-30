import styled from 'styled-components';

// 각 스타일드 컴포넌트 선언
const LoginPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const LoginBox = styled.div`
  width: 560px;
  min-height: 100px;
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 48px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  h2{
    font-size: 30px;
    font-weight: bold;
    color: black;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 16px;
  color: black;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #797979;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  margin: 12px 0;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5784E1;
  }
`;

const HelperLinks = styled.div`
  font-size: 14px;
  color: #797979;
  margin-bottom: 20px;
  cursor: pointer;
  a {
    color: #797979;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const JoinSection = styled.div`
  font-size: 14px;
  color: #c2185b;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
  span{
    color: #737373;
  }

  &:hover {
    text-decoration: underline;
  }
`;

// 모든 스타일드 컴포넌트를 객체로 묶기
const S = {
    LoginPageWrapper,
    LoginBox,
    Input,
    LoginButton,
    HelperLinks,
    JoinSection
};

export default S;