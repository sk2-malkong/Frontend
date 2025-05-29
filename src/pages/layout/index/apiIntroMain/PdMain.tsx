import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from "./style";
import banerTitleImg from './Group 3696.svg';
import LockIcon from "../ActionIcons/LockIcon/LockIcon";
import FileIcon from "../ActionIcons/FileIcon/FileIcon";
import ApiKeyPopup from "../_component/ApiKeyPopup";
import Header from "../_component/Header/Header";
import AIMessagePurifier from './AIMessagePurifier';

/**
 * PdMain 컴포넌트 - 메인 페이지의 레이아웃과 기능을 구현한 컴포넌트
 * 헤더, 메인 섹션, 푸터로 구성되며 API 키 신청 팝업 기능 포함
 */
const PdMain: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <S.FrameContainer>
            <Header openPopup={openPopup} />

            <S.InnerDiv>
                <MainBanner />
                <MiddleSection />
                <Footer />
            </S.InnerDiv>

            <ApiKeyPopup isOpen={isPopupOpen} onClose={closePopup} />
        </S.FrameContainer>
    );
};

/**
 * MainBanner 컴포넌트 - style.ts에서 가져온 StyledBanner를 사용
 */
const MainBanner = () => (
    <S.StyledBanner>
        <div className="card">
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="info-top">
                <S.InnerDiv2>
                    <S.Group2 className="group2">
                        <S.ContentContainer>
                            <S.ImageWrapper className="image-wrapper">
                                <S.Image
                                    src={banerTitleImg}
                                    alt="비속어 필터링 서비스"
                                    className="small"
                                    />
                            </S.ImageWrapper>
                            <S.TextWrapper>
                                비속어 필터링 서비스 개발자센터에 오신 것을 환영합니다.
                            </S.TextWrapper>
                            <S.P className="text-p">
                                새로운 기회와 가치를 함께 만들어봐요.
                            </S.P>
                        </S.ContentContainer>
                    </S.Group2>
                    <S.Group2><S.JsonEffect><AIMessagePurifier/></S.JsonEffect></S.Group2>
                
                </S.InnerDiv2>
            </div>
        </div>
    </S.StyledBanner>
);

/**
 * MiddleSection 컴포넌트
 */
const MiddleSection = () => (
    <S.MiddleSection>
        <ProductIntroSection />
        <ApiKeyIntroSection />
    </S.MiddleSection>
);

/**
 * ProductIntroSection 컴포넌트
 * 클릭 시 /detail 페이지로 이동하는 기능 추가
 * 파일 아이콘으로 변경됨
 */
const ProductIntroSection = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <S.Overlap3
            onClick={() => navigate("/detail")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={isHovered ? "hover-active" : ""}
            style={{ cursor: "pointer" }}
        >
            <S.OverlayEffect className="overlay-2" />
            <S.Group3 />
            <S.TitleContainer>
                <S.TextWrapper2 className="hover-title">
                    서비스 소개
                </S.TextWrapper2>
                <S.TextWrapper3 style={{ opacity: isHovered ? 1 : 0 }}>
                    서비스 특징을 알려줄게요.
                </S.TextWrapper3>
            </S.TitleContainer>
            <FileIcon />
        </S.Overlap3>
    );
};

/**
 * ApiKeyIntroSection 컴포넌트
 * 자물쇠 아이콘으로 변경됨
 */
const ApiKeyIntroSection = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <S.Overlap2
            onClick={() => navigate("/docs/start")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: "pointer" }}
        >
            <S.OverlayEffect className="overlay-3" />
            <S.TitleContainer>
                <S.TextWrapper2 className="hover-title">
                    API 키 사용법
                </S.TextWrapper2>
                <S.TextWrapper3 style={{ opacity: isHovered ? 1 : 0 }}>
                    API 키에 대한 자세한 사용법입니다.
                </S.TextWrapper3>
            </S.TitleContainer>
            <LockIcon isHovered={isHovered} />
        </S.Overlap2>
    );
};

/**
 * Footer 컴포넌트
 */
const Footer = () => (
    <S.DivWrapper>
        <S.FooterContent>
            <S.ContactList>
                <S.ContactItem>
                    <S.ContactLabel>이메일:</S.ContactLabel>
                    <S.ContactLink href="mailto:purgo@gmail.com">
                        purgo@gmail.com
                    </S.ContactLink>
                </S.ContactItem>
                <S.ContactItem>
                    <S.ContactLabel>전화:</S.ContactLabel>
                    <S.ContactLink href="tel:02-123-1234">
                        02-123-1234
                    </S.ContactLink>
                </S.ContactItem>
            </S.ContactList>
            <S.Copyright>
                © 2025 주식회사 purgo. All rights reserved.
            </S.Copyright>
        </S.FooterContent>
    </S.DivWrapper>
);

export default PdMain;