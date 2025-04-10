import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import S from '../layout/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Layout = () => {



  return (
    <div>
      <S.Background className='Background'>
        <S.HeaderWrap className='header'>
        <S.LogoWrap className='logo'>
          <img className='logoimage' src={'/logo/logo2.png'}></img>
          <p className='logo'>Purgo</p>
        </S.LogoWrap>
        <S.SearchBox className='search'>
          <S.SearchInput className='Searchinput' placeholder='검색어를 입력하세요'></S.SearchInput>
          <p>검색</p>
        </S.SearchBox>
        <S.User className='user'>
           <FontAwesomeIcon icon={faUser}/>
        </S.User>
        </S.HeaderWrap>
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