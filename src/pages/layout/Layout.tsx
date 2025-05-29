import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isIntroPage = location.pathname === '/';
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const [keyword, setKeyword] = useState<string>('');

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
             <S.PurgoLink
              href="http://purgo.kro.kr/detail#second">
              PURGO
            </S.PurgoLink>
)}
</div>
  );
};

export default Layout;
