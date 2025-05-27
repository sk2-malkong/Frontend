import React, { useState, useEffect, KeyboardEvent, ChangeEvent, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isIntroPage = location.pathname === '/';
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const [keyword, setKeyword] = useState<string>('');
  const logoutProcessedRef = useRef<boolean>(false);

  // HTTP 환경 대응 자동 로그아웃 기능
  useEffect(() => {
    // 로그아웃 처리 함수
    const performLogout = (): void => {
      if (logoutProcessedRef.current || !localStorage.getItem('accessToken')) {
        return;
      }

      logoutProcessedRef.current = true;

      // 로컬 스토리지 정리 (동기적으로 즉시 실행)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');

      // 세션 스토리지에 로그아웃 플래그 설정 (다른 탭에서 감지용)
      sessionStorage.setItem('auto_logout', Date.now().toString());
    };

    // 서버 로그아웃 요청 (비동기, 실패해도 무관)
    const sendLogoutRequest = async (): Promise<void> => {
      try {
        // axios 사용 (더 간편한 설정과 에러 처리)
        const axios = (await import('axios')).default;

        await axios.post('/api/logout', {
          action: 'auto_logout',
          timestamp: new Date().toISOString()
        }, {
          timeout: 500, // 500ms 타임아웃
          headers: {
            'Content-Type': 'application/json',
          },
          // HTTP 환경에서도 안정적으로 동작
          withCredentials: true,
        });
      } catch (error) {
        // axios는 4xx, 5xx도 에러로 처리하므로 더 세밀한 처리 가능
        if (error && typeof error === 'object') {
          const axiosError = error as any;
          if (axiosError.code === 'ECONNABORTED') {
            console.warn('Auto logout request timeout');
          } else if (axiosError.response) {
            console.warn('Auto logout server error:', axiosError.response.status);
          } else if (axiosError.message) {
            console.warn('Auto logout network error:', axiosError.message);
          } else {
            console.warn('Auto logout unknown error:', error);
          }
        } else {
          console.warn('Auto logout error:', error);
        }
      }
    };

    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = (e: BeforeUnloadEvent): void => {
      if (localStorage.getItem('accessToken')) {
        performLogout();

        // 비동기 서버 요청 (백그라운드에서 실행)
        sendLogoutRequest();

        // navigator.sendBeacon 백업 (지원되는 경우)
        if (navigator.sendBeacon) {
          try {
            navigator.sendBeacon('/api/logout', JSON.stringify({
              action: 'auto_logout_beacon',
              timestamp: new Date().toISOString()
            }));
          } catch (error) {
            console.warn('Beacon request failed:', error);
          }
        }
      }
    };

    // visibilitychange 이벤트 핸들러 (모바일 대응)
    const handleVisibilityChange = (): void => {
      if (document.visibilityState === 'hidden' && localStorage.getItem('accessToken')) {
        // 페이지가 숨겨질 때도 로그아웃 처리 (모바일 브라우저 대응)
        setTimeout(() => {
          if (document.visibilityState === 'hidden') {
            performLogout();
            sendLogoutRequest();
          }
        }, 100);
      }
    };

    // pagehide 이벤트 핸들러 (iOS Safari 대응)
    const handlePageHide = (e: PageTransitionEvent): void => {
      if (localStorage.getItem('accessToken')) {
        performLogout();
        sendLogoutRequest();
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    // 다른 탭에서의 로그아웃 감지
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === 'accessToken' && !e.newValue && e.oldValue) {
        // 다른 탭에서 로그아웃됨
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // 세션 스토리지 변경 감지 (같은 탭에서의 자동 로그아웃)
    const checkAutoLogout = (): void => {
      const autoLogoutFlag = sessionStorage.getItem('auto_logout');
      if (autoLogoutFlag && !logoutProcessedRef.current) {
        sessionStorage.removeItem('auto_logout');
        // 자동 로그아웃 후 메인 페이지로 리다이렉트
        navigate('/post/main');
      }
    };

    const intervalId = setInterval(checkAutoLogout, 100);

    // 컴포넌트 언마운트시 정리
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
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