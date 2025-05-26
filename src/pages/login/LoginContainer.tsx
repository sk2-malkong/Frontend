import React, { useState, KeyboardEvent } from 'react';
import S from './loginstyle';
import { useNavigate } from 'react-router-dom';
import auth from '../api/auth'; // 로그인 api 모듈 import

interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  AuthDto?: {
    username?: string;
  };
  user?: {
    username?: string;
  };
}

const LoginContainer: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    if (!id || !pw) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res: AuthResponse = await auth.login(id, pw); // 로그인 요청
      const username = res.AuthDto?.username || res.user?.username;

      // 로그인 성공 시 필요한 정보 localStorage에 저장
      if (res.accessToken) {
        localStorage.setItem('accessToken', res.accessToken);
      }
      if (username) {
        localStorage.setItem('username', username);
      }
      localStorage.setItem('id', id); // id 저장
      localStorage.setItem('pw', pw); // pw 저장

      alert("로그인 성공");
      navigate('/post/main'); // 메인 페이지로 이동
    } catch (error: any) {
      alert(error.message || '로그인에 실패했습니다.');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
              onKeyDown={handleKeyDown}
          />
          <S.Input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPw(e.target.value)}
              onKeyDown={handleKeyDown}
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