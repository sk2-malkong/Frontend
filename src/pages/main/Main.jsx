import React from 'react';
import S from './style';

const Main = () => {
  return (
    <div>
      <S.mainpage className='mainpage'>
        <div className='postlist'></div>
        <div className='login'></div>
      </S.mainpage>
    </div>
  );
};

export default Main;