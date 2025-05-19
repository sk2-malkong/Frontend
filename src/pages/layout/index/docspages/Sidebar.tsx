import React from "react";
import { NavLink } from "react-router-dom";
import * as S from "./DocsStyle";

const Sidebar: React.FC = () => {
  return (
    <S.Sidebar>
      <S.MenuTitle>📚 문서</S.MenuTitle>
      <S.MenuLink to="/docs/start">Purgo란?</S.MenuLink>
      <S.MenuLink to="/docs/auth">인증 방식 이해하기</S.MenuLink>
      <S.MenuLink to="/docs/jwthash">JWT 해시 생성 가이드</S.MenuLink>
      <S.MenuLink to="/docs/request">요청과 응답 예시</S.MenuLink>
      <S.MenuLink to="/docs/security">보안 지침과 유의사항</S.MenuLink>
      <S.MenuLink to="/docs/faq">자주 묻는 질문 (FAQ)</S.MenuLink>
    </S.Sidebar>
  );
};

export default Sidebar;
