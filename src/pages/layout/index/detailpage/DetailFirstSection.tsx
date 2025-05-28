// src/components/DetailFirstSection.tsx
import React from 'react';
import {
  GlobalStyle,
  Background,
  Drop,
  OriginalReadBtn,
} from './detailstyle';

const DetailFirstSection: React.FC = () => {
  const card = {
    title: 'Purgo API',
    description1:
      'Purgo는 라틴어로 정제하다라는 의미를 가지고 있습니다.',
    description2:
      'Purgo API를 사용해서 깨끗한 온라인 문화를 만듭시다.',
    link: '/docs/start',
  };

  return (
    <>
      <GlobalStyle />
      <Background>
        <Drop>
          <h2 style={{ marginBottom: '1rem', color: '#000000', zIndex: 1, }}>
            {card.title}
          </h2>
          <p
         style={{
          width : '100%',
         margin: '0 1rem',
         lineHeight: 1.4,
         zIndex: 1,
         fontSize : '17px'
         }}
          >
          Purgo는 라틴어로 <span style={{ color: 'blue', fontWeight: 'bold' }}>정제하다</span>라는 의미를 가지고 있습니다.
          </p>
          <p
            style={{
              margin: '0',
              lineHeight: 1.4,
              zIndex: 1,
              fontSize : '17px'
            }}
          >
            {card.description2}
          </p>
          <OriginalReadBtn href={card.link}>사용하러가기</OriginalReadBtn>
        </Drop>
      </Background>
    </>
  );
};

export default DetailFirstSection;
