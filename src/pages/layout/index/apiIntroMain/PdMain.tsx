import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import S from "./style";
import banerTitleImg from './banertitle.png';
import LockIcon from "../ActionIcons/LockIcon/LockIcon";
import FileIcon from "../ActionIcons/FileIcon/FileIcon";
import PrinterIcon from "../ActionIcons/PrinterIcon/PrinterIcon";
import ApiKeyPopup from "../_component/ApiKeyPopup";
import Header from "../_component/Header/Header"; // Import the new Header component

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
 * MainBanner 컴포넌트
 */
const MainBanner = () => (
    <S.Overlap>
        <S.OverlayEffect className="overlay-1" />
        <S.InnerDiv2>
            <S.Group2 className="group2">
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
            </S.Group2>
            <PrinterIcon />
        </S.InnerDiv2>
    </S.Overlap>
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
 */
const ProductIntroSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <S.Overlap3
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={isHovered ? "hover-active" : ""}
        >
            <S.OverlayEffect className="overlay-2" />
            <S.Group3 />
            <S.TitleContainer>
                <S.TextWrapper2 className="hover-title">
                    제품 소개
                </S.TextWrapper2>
                <S.TextWrapper3 style={{ opacity: isHovered ? 1 : 0 }}>
                    제품 특징을 알려줄게요.
                </S.TextWrapper3>
            </S.TitleContainer>
            <LockIcon isHovered={isHovered} />
        </S.Overlap3>
    );
};

/**
 * ApiKeyIntroSection 컴포넌트
 */
const ApiKeyIntroSection = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate(); // ✅ 내비게이터 사용

    return (
        <S.Overlap2
            onClick={() => navigate("/docs/start")} // ✅ 클릭 시 이동
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: "pointer" }} // ✅ 커서 변경
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
            <FileIcon />
        </S.Overlap2>
    );
};

/**
 * Footer 컴포넌트
 */
const Footer = () => (
    <S.DivWrapper>
        <S.TextWrapper5>푸터 페이지</S.TextWrapper5>
    </S.DivWrapper>
);

export default PdMain;
