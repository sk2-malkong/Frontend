import React from 'react';
import S from './loginstyle';
import { useNavigate } from 'react-router-dom';

const LoginContainer = () => {

  const navigate = useNavigate();
  return (
    <S.LoginPageWrapper>
      <S.LoginBox>
        <h2>로그인</h2>
        <S.Input type="text" placeholder="아이디" />
        <S.Input type="password" placeholder="비밀번호" />
        <S.LoginButton>로그인</S.LoginButton>
        <S.HelperLinks>
          <a onClick={() => navigate('/findid')}>아이디 찾기</a> | <a onClick={() => navigate('/findpassword')}>비밀번호 찾기</a>
        </S.HelperLinks>
        <S.JoinSection>
          <span onClick={() => navigate('/join')}>회원가입</span>
        </S.JoinSection>
      </S.LoginBox>
    </S.LoginPageWrapper>
  );
};

export default LoginContainer;
