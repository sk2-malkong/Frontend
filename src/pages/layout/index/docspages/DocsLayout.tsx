import React from "react";
import { Outlet } from "react-router-dom";
import * as S from "./DocsStyle";
import Sidebar from "./Sidebar";

const DocsLayout: React.FC = () => {
  return (
    <S.DocsContainer>
      <Sidebar />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.DocsContainer>
  );
};

export default DocsLayout;
