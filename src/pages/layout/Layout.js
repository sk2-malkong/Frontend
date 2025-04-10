import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './footer/Footer';
import S from '../layout/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Layout = () => {
  const location = useLocation();
  const isIntroPage = location.pathname === '/';

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
              <S.User>
                <FontAwesomeIcon icon={faUser} />
              </S.User>
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
