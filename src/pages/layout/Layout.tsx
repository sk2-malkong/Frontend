import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isIntroPage = location.pathname === '/';
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const [keyword, setKeyword] = useState<string>('');

  // 자동 로그아웃 기능
  useEffect(() => {
    const handleBeforeUnload = (): void => {
      // 로그인 상태인 경우에만 로그아웃 처리
      if (localStorage.getItem('accessToken')) {
        // 로컬 스토리지 정리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');

        // 서버에 로그아웃 신호 전송 (가능한 경우)
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/logout', JSON.stringify({
            action: 'auto_logout',
            timestamp: new Date().toISOString()
          }));
        }
      }
    };

    // 페이지 종료 이벤트 리스너 등록
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 컴포넌트 언마운트시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // 빈 의존성 배열로 한번만 실행

  const handleLogout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    alert('로그아웃 되었습니다.');
    // 로그아웃 후 메인 페이지로 이동하도록 수정
    navigate('/post/main');
  };

  const handleSearch = (): void => {
    if (keyword.trim()) {
      navigate(`/post/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
      <div>
        <S.Background>
          {!isIntroPage && (
              <>
                <S.HeaderWrap>
                  <S.LogoWrap onClick={() => { navigate('/post/main'); window.location.reload(); }}>
                    <p>Purgo</p>
                  </S.LogoWrap>

                  <S.SearchBox>
                    <S.SearchInput
                        placeholder="검색어를 입력하세요"
                        value={keyword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <p onClick={handleSearch}>검색</p>
                  </S.SearchBox>

                  {isLoggedIn ? (
                      <S.LoginButton onClick={handleLogout}>로그아웃</S.LoginButton>
                  ) : (
                      <S.LoginButton onClick={() => navigate('/login')}>로그인</S.LoginButton>
                  )}
                </S.HeaderWrap>
                <S.Topbar />
              </>
          )}

          <S.Main>
            <Outlet />
          </S.Main>
        </S.Background>

        {!isIntroPage && (
            <S.BubbleLogo
                src="/images/purgo-logo.png"
                alt="Bubble Logo"
                onClick={() => navigate('/')}
            />
        )}

      </div>
  );
};

export default Layout;