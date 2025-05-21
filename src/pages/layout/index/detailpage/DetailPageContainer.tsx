import React from 'react';
import DetailPage from './DetailPage';
import { GlobalStyle } from './detailstyle';
const DetailPageContainer: React.FC = () => {

  return (
    <div>
      <GlobalStyle />
      <DetailPage />
    </div>
  );
};

export default DetailPageContainer;