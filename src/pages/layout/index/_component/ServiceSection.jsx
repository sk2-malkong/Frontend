
import React from "react";
import { useNavigate } from "react-router-dom";
import S from "./style";

const ServiceSection = () => {
  const navigate = useNavigate();

  return (
    <S.ServiceSection>
      <S.ServiceTitle data-aos="fade-right">우리 서비스 소개</S.ServiceTitle>
      <S.ServiceWrapper>
        <S.ServiceItem onClick={() => navigate("/")} data-aos="fade-down" data-aos-delay="100">
          <S.ServiceIcon>
            <img src="/images/rocketchat-brands.svg" alt="chat" />
          </S.ServiceIcon>
          <S.ServiceText>채팅</S.ServiceText>
        </S.ServiceItem>
        <S.ServiceItem onClick={() => (window.location.href = "/main")} data-aos="fade-down" data-aos-delay="200">
          <S.ServiceIcon>
            <img src="/images/address-card-solid.svg" alt="board" />
          </S.ServiceIcon>
          <S.ServiceText>게시판</S.ServiceText>
        </S.ServiceItem>
        <S.ServiceItem onClick={() => navigate("/")} data-aos="fade-down" data-aos-delay="300">
          <S.ServiceIcon>
            <img src="/images/microphone-solid.svg" alt="voice" />
          </S.ServiceIcon>
          <S.ServiceText>음성</S.ServiceText>
        </S.ServiceItem>
      </S.ServiceWrapper>
    </S.ServiceSection>
  );
};

export default ServiceSection;
