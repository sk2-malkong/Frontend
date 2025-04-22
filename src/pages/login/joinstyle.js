import styled from "styled-components";

const S = {};

// 전체 페이지 래퍼
S.JoinPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 120px;
`;

// 메인 컨텐츠
S.JoinContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 로고 영역
S.LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  cursor: pointer;

  img {
    width: 145px;
    height: 110px;
  }
`;

// 회원가입 박스
S.JoinBox = styled.div`
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

// 각 Input과 메세지를 감싸는 Wrapper
S.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

// Input과 버튼을 나란히 두는 영역
S.InputWithButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// 공통 Input 스타일
S.Input = styled.input`
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

// "중복확인" 버튼 스타일
S.CheckButton = styled.button`
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

// 가입 완료 버튼
S.Button = styled.button`
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

// 비밀번호 조건 안내 텍스트
S.PasswordConditionText = styled.p`
  font-size: 14px;
  margin-top: 6px;
  color: ${({ $isValid }) => ($isValid ? "black" : "red")};
`;

// 에러 메세지 (Validation 에러용)
S.ErrorMessage = styled.p`
  font-size: 14px;
  color: red;
  margin-top: 4px;
`;

// 중복 확인 결과, 매칭 결과 메세지
S.StatusMessage = styled.p`
  font-size: 14px;
  margin-top: 4px;
  color: ${({ $success }) => ($success ? 'green' : 'red')};
`;

export default S;
