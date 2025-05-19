import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import * as S from "./DocsStyle";
import Sidebar from "./Sidebar";
import Header from "../_component/Header/Header";
import ApiKeyPopup from "../_component/ApiKeyPopup";

const DocsLayout: React.FC = () => {
  // ✅ 팝업 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      {/* ✅ 헤더에 팝업 핸들러 전달 */}
      <Header openPopup={openPopup} />

      <S.DocsContainer>
        <Sidebar />
        <S.MainContent>
          <Outlet />
        </S.MainContent>
      </S.DocsContainer>

      {/* ✅ 팝업 컴포넌트 렌더링 */}
      <ApiKeyPopup isOpen={isPopupOpen} onClose={closePopup} />
    </>
  );
};

export default DocsLayout;
