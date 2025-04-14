import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './footer/Footer';
import S from '../layout/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Layout = () => {
  const location = useLocation();
  const isIntroPage = location.pathname === '/';

  // ✅ 나중엔 useAuth 등으로 대체 가능
  const isLoggedIn = false;

  return (
    <div>
      <S.Background>
        {!isIntroPage && (
          <>
            <S.HeaderWrap>
              <S.LogoWrap>
                <img src="/logo/logo2.png" alt="logo" />
                <p>Purgo</p>
              </S.LogoWrap>

              <S.SearchBox>
                <S.SearchInput placeholder="검색어를 입력하세요" />
                <p>검색</p>
              </S.SearchBox>

              {/* 로그인 상태에 따라 표시 */}
              {isLoggedIn ? (
                <S.User>
                  <FontAwesomeIcon icon={faUser} />
                </S.User>
              ) : (
                <S.LoginButton>로그인</S.LoginButton>
              )}
            </S.HeaderWrap>
            <S.Topbar />
          </>
        )}
        <S.Main>
          <Outlet />
        </S.Main>
      </S.Background>
      {!isIntroPage && <Footer />}
    </div>
  );
};

export default Layout;
