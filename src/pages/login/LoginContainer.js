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
      const res = await auth.login(id, pw); 
      const username = res.userDto?.username || res.user?.username;
      if (username) {
        localStorage.setItem('username', username);
      }

      alert("로그인 성공");
      navigate('/main');
    } catch (error) {
      alert(error.message || '로그인에 실패했습니다.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼 기본 제출 막기
      handleLogin();      // 바로 로그인 시도
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
          onKeyDown={handleKeyDown} // ✅ 추가
        />
        <S.Input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={handleKeyDown} // ✅ 추가
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
