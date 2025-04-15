import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './footer/Footer';
import S from '../layout/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isIntroPage = location.pathname === '/';

  const isLoggedIn = false; // 임시 로그인 상태 (나중에 상태 관리로 변경 가능)

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

        
              {isLoggedIn ? (
                <S.LoginButton
                  onClick={() => {
                    alert('로그아웃 되었습니다.');
                  }}
                >
                  로그아웃
                </S.LoginButton>
              ) : (
                <S.LoginButton onClick={() => navigate('/login')}>
                  로그인
                </S.LoginButton>
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
