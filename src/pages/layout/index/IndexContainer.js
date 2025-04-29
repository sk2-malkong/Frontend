import React from 'react';
import MainChat from './_component/MainChat';
import { GlobalStyle } from './_component/style';

const IndexContainer = () => {
  return (
    <>
    <GlobalStyle/>
      <div>
        <MainChat/>
      </div>
    </>
  );
};

export default IndexContainer;