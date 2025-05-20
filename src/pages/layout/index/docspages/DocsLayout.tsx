import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import * as S from "./DocsStyle";
import Sidebar from "./Sidebar";
import Header from "../_component/Header/Header";
import ApiKeyPopup from "../_component/ApiKeyPopup";
import ScrollToTopOnDocs from "./ScrollToTopOnDocs";

const DocsLayout: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <Header openPopup={openPopup} />
      <ScrollToTopOnDocs />
      <S.DocsContainer>
        <Sidebar />
        <S.MainContent>
          <Outlet />
        </S.MainContent>
      </S.DocsContainer>
      <ApiKeyPopup isOpen={isPopupOpen} onClose={closePopup} />
    </>
  );
};

export default DocsLayout;
