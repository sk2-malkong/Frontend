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
      'Purgo API는 무료로 제공되고 있습니다.',
    description2:
      'Purgo APP Key를 등록하신 후, 지금 바로 사용해보세요.',
    link: '#',
  };

  return (
    <>
      <GlobalStyle />
      <Background>
        <Drop>
          <h2 style={{ marginBottom: '1rem', color: '#fff', zIndex: 1, }}>
            {card.title}
          </h2>
          <p
            style={{
              margin: '0 1rem ',
              color: '#fff',
              lineHeight: 1.4,
              zIndex: 1,
            }}
          >
            {card.description1}
          </p>
          <p
            style={{
              margin: '0',
              color: '#fff',
              lineHeight: 1.4,
              zIndex: 1,
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
