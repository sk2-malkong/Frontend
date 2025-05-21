import React from 'react';
import DetailPage from './DetailPage';
import { GlobalStyle } from './detailstyle';
import Header from "../_component/Header/Header";
const DetailPageContainer: React.FC = () => {

  return (
    <div>
      <GlobalStyle />
      <DetailPage />
    </div>
  );
};

export default DetailPageContainer;