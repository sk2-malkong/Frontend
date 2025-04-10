import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import S from '../layout/style';


const Layout = () => {



  return (
    <div>
      <S.Background className='Background'>
        <S.header className='header'>
        <S.LogoWrap className='logo'>
          <img className='logoimage' src={'/logo/logo2.png'}></img>
          <p className='logo'>Purgo</p>
        </S.LogoWrap>
        <S.SearchBox className='search'>
          <S.SearchInput className='Searchinput'></S.SearchInput>
          <p>검색</p>
        </S.SearchBox>
        </S.header>
        <S.topbar className='topbar'>
        </S.topbar>
        <main className='main'>
          <Outlet/>
        </main>
      </S.Background>
      <Footer/>
    </div>
  );
};

export default Layout;