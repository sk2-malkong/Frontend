import React, { useState } from 'react';
import S from './loginstyle';
import { useNavigate } from 'react-router-dom';
import auth from '../api/auth'; 

const LoginContainer = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!id || !pw) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      await auth.login(id, pw);
      alert("로그인 성공!");
      navigate('/main'); // 로그인 후 이동할 페이지
    } catch (error) {
      alert(error.message || '로그인에 실패했습니다.');
    }
  };

  return (
    <S.LoginPageWrapper>
      <S.LoginBox>
        <h2>로그인</h2>
        <S.Input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <S.Input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>

        <S.HelperLinks>
          <a onClick={() => navigate('/findid')}>아이디 찾기</a> |{' '}
          <a onClick={() => navigate('/findpassword')}>비밀번호 찾기</a>
        </S.HelperLinks>

        <S.JoinSection>
          <span onClick={() => navigate('/join')}>회원가입</span>
        </S.JoinSection>
      </S.LoginBox>
    </S.LoginPageWrapper>
  );
};

export default LoginContainer;
