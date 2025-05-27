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

  useEffect(() => {
    // 로그아웃 처리 함수
    const performLogout = (): void => {
      if (logoutProcessedRef.current || !localStorage.getItem('accessToken')) {
        return;
      }

      console.log('자동 로그아웃 실행');
      logoutProcessedRef.current = true;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');

      sessionStorage.setItem('auto_logout', Date.now().toString());
    };

    // Beacon으로 서버에 로그아웃 알림
    const sendBeaconLogout = (): void => {
      if (navigator.sendBeacon) {
        try {
          const beaconData = JSON.stringify({
            action: 'auto_logout_beacon',
            timestamp: new Date().toISOString(),
            protocol: window.location.protocol,
            userAgent: navigator.userAgent
          });

          const beaconUrl = `${window.location.origin}/api/logout`;
          navigator.sendBeacon(beaconUrl, beaconData);
          console.log('Beacon 로그아웃 요청 전송');
        } catch (error) {
          console.warn('Beacon request failed:', error);
        }
      }
    };

    // Mac 환경 감지
    const isMac = navigator.platform.toLowerCase().includes('mac') ||
        navigator.userAgent.toLowerCase().includes('mac');

    // 새로고침 감지를 위한 플래그들
    let isRefreshAction = false;
    let beforeUnloadTriggered = false;

    // 새로고침 키 감지 (Mac 환경 고려)
    const handleKeyDown = (e: KeyboardEvent): void => {
      // Mac: Cmd+R, Windows/Linux: Ctrl+R, F5
      const isRefreshKey = (isMac && e.metaKey && e.key === 'r') ||
          (!isMac && e.ctrlKey && e.key === 'r') ||
          (e.key === 'F5');

      if (isRefreshKey) {
        console.log('새로고침 키 감지됨 (Mac 환경 고려)');
        isRefreshAction = true;
        sessionStorage.setItem('refresh_key_pressed', 'true');
      }
    };

    // beforeunload 이벤트 - 새로고침과 탭 종료 구분의 시작점
    const handleBeforeUnload = (e: BeforeUnloadEvent): void => {
      if (!localStorage.getItem('accessToken')) return;

      console.log('beforeunload 이벤트 발생');
      beforeUnloadTriggered = true;

      // 새로고침 키가 눌린 경우 로그아웃 방지
      if (isRefreshAction) {
        console.log('새로고침 키 감지로 로그아웃 방지');
        return;
      }

      // beforeunload 발생 플래그 설정
      sessionStorage.setItem('beforeunload_fired', Date.now().toString());
    };

    // pagehide 이벤트 - 실제 탭 종료 처리
    const handlePageHide = (e: PageTransitionEvent): void => {
      console.log('pagehide 이벤트 발생, persisted:', e.persisted);

      if (!localStorage.getItem('accessToken')) return;

      // 새로고침 키가 눌린 경우 로그아웃 방지
      if (isRefreshAction) {
        console.log('새로고침 액션으로 pagehide 로그아웃 방지');
        return;
      }

      // bfcache에 저장되는 경우 (새로고침 등) 로그아웃 안함
      if (e.persisted) {
        console.log('bfcache 저장 - 새로고침으로 판단하여 로그아웃 안함');
        return;
      }

      // beforeunload가 발생한 후 pagehide가 발생한 경우 (새로고침 가능성)
      const beforeUnloadTime = sessionStorage.getItem('beforeunload_fired');
      if (beforeUnloadTime && beforeUnloadTriggered) {
        const timeDiff = Date.now() - parseInt(beforeUnloadTime);

        // Mac Safari에서는 새로고침 시 beforeunload → pagehide 순서로 빠르게 발생
        if (timeDiff < 100) { // 100ms 이내면 새로고침으로 판단
          console.log('Mac 환경: beforeunload 후 빠른 pagehide - 새로고침으로 판단');
          return;
        }
      }

      // beforeunload 없이 pagehide만 발생한 경우 또는 충분한 시간 차이가 있는 경우
      console.log('확실한 탭 종료 감지 - 로그아웃 실행');
      performLogout();
      sendBeaconLogout();
    };

    // 페이지 로드 시 새로고침 여부 확인
    const handlePageShow = (): void => {
      console.log('페이지 로드됨');

      // 새로고침 키 플래그 확인
      const refreshKeyPressed = sessionStorage.getItem('refresh_key_pressed');
      if (refreshKeyPressed) {
        console.log('새로고침 키로 인한 페이지 로드 감지');
        sessionStorage.removeItem('refresh_key_pressed');
        sessionStorage.removeItem('beforeunload_fired');
        isRefreshAction = true;
        beforeUnloadTriggered = false;

        // 자동 로그아웃 플래그도 제거
        const autoLogout = sessionStorage.getItem('auto_logout');
        if (autoLogout) {
          sessionStorage.removeItem('auto_logout');
          console.log('새로고침으로 인한 자동 로그아웃 취소');
        }
        return;
      }

      // Performance API로 새로고침 감지 (Mac 환경에서도 동작)
      if (performance.navigation && performance.navigation.type === 1) {
        console.log('Performance API로 새로고침 감지됨');
        sessionStorage.removeItem('beforeunload_fired');
        isRefreshAction = true;
        beforeUnloadTriggered = false;
        return;
      }

      // Navigation Timing API로 새로고침 감지
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
        console.log('Navigation Timing API로 새로고침 감지됨');
        sessionStorage.removeItem('beforeunload_fired');
        isRefreshAction = true;
        beforeUnloadTriggered = false;
        return;
      }

      // beforeunload 플래그가 있으면 새로고침으로 판단
      const beforeUnloadTime = sessionStorage.getItem('beforeunload_fired');
      if (beforeUnloadTime) {
        const timeDiff = Date.now() - parseInt(beforeUnloadTime);
        if (timeDiff < 2000) { // 2초 이내면 새로고침
          console.log('beforeunload 플래그 기반 새로고침 감지');
          sessionStorage.removeItem('beforeunload_fired');
          isRefreshAction = true;
          beforeUnloadTriggered = false;

          // 자동 로그아웃 플래그도 제거
          const autoLogout = sessionStorage.getItem('auto_logout');
          if (autoLogout) {
            sessionStorage.removeItem('auto_logout');
            console.log('새로고침으로 인한 자동 로그아웃 취소');
          }
          return;
        }
      }

      console.log('정상 페이지 로드 또는 탭 종료 후 재접속');
      isRefreshAction = false;
      beforeUnloadTriggered = false;
    };

    // unload 이벤트 - 최종 백업 (Mac에서 중요)
    const handleUnload = (): void => {
      if (!localStorage.getItem('accessToken') || isRefreshAction) return;

      console.log('unload 이벤트 - 최종 로그아웃 처리');
      performLogout();
      sendBeaconLogout();
    };

    // visibilitychange 이벤트 - Mac에서 추가 안정성
    const handleVisibilityChange = (): void => {
      if (document.hidden) {
        console.log('페이지가 백그라운드로 이동');
      } else {
        console.log('페이지가 포그라운드로 이동');
        // 페이지가 다시 보이면 플래그 리셋
        beforeUnloadTriggered = false;
      }
    };

    // 다른 탭에서의 로그아웃 감지
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === 'accessToken' && !e.newValue && e.oldValue) {
        console.log('다른 탭에서 로그아웃 감지');
        window.location.reload();
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('unload', handleUnload);
    window.addEventListener('keydown', handleKeyDown as any);
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 페이지 로드 시 즉시 체크
    handlePageShow();

    // 자동 로그아웃 플래그 체크
    const checkAutoLogout = (): void => {
      const autoLogoutFlag = sessionStorage.getItem('auto_logout');
      if (autoLogoutFlag && !logoutProcessedRef.current && !isRefreshAction) {
        sessionStorage.removeItem('auto_logout');
        console.log('자동 로그아웃 플래그 감지 - 메인 페이지로 이동');
        navigate('/post/main');
      }
    };

    const intervalId = setInterval(checkAutoLogout, 200);

    // cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('unload', handleUnload);
      window.removeEventListener('keydown', handleKeyDown as any);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [navigate]);

  // 수동 로그아웃 처리 (유지)
  const handleLogout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    alert('로그아웃 되었습니다.');
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