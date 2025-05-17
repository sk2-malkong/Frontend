import React, {useState} from 'react';
import S from "./style";
import banerTitleImg from './banertitle.png';
import LockIcon from "../ActionIcons/LockIcon/LockIcon";
import FileIcon from "../ActionIcons/FileIcon/FileIcon";
import PrinterIcon from "../ActionIcons/PrinterIcon/PrinterIcon";
import ApiKeyPopup from "../_component/ApiKeyPopup";

/**
 * PdMain 컴포넌트 - 메인 페이지의 레이아웃과 기능을 구현한 컴포넌트
 * 헤더, 메인 섹션, 푸터로 구성되며 API 키 신청 팝업 기능 포함
 */
const PdMain: React.FC = () => {
    // API 키 팝업 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // 팝업 열기 핸들러
    const openPopup = () => setIsPopupOpen(true);

    // 팝업 닫기 핸들러
    const closePopup = () => setIsPopupOpen(false);

    return (
        <S.FrameContainer>
            {/* 헤더 영역 */}
            <Header openPopup={openPopup}/>

            <S.InnerDiv>
                {/* 메인 배너 영역 */}
                <MainBanner/>

                {/* 중앙 섹션 영역 */}
                <MiddleSection/>

                {/* 푸터 영역 */}
                <Footer/>
            </S.InnerDiv>

            {/* API 키 발급 팝업 */}
            <ApiKeyPopup isOpen={isPopupOpen} onClose={closePopup}/>
        </S.FrameContainer>
    );
};

/**
 * Header 컴포넌트 - 페이지 상단 헤더 영역
 * 로고와 API 키 신청 버튼을 포함
 */
const Header = ({openPopup}: { openPopup: () => void }) => (
    <S.HeaderContainer>
        <S.HeaderInner>
            <S.LogoContainer>
                <S.LogoText>PURGO</S.LogoText>
            </S.LogoContainer>
            <S.ButtonContainer>
                <S.HeaderButton primary onClick={openPopup}>
                    API 키 신청
                </S.HeaderButton>
            </S.ButtonContainer>
        </S.HeaderInner>
    </S.HeaderContainer>
);

/**
 * MainBanner 컴포넌트 - 메인 페이지 상단 배너 영역
 * 환영 메시지와 서비스 소개 이미지를 포함
 */
const MainBanner = () => (
    <S.Overlap>
        {/* 호버 시 확장되는 오버레이 효과 */}
        <S.OverlayEffect className="overlay-1"/>
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
            <PrinterIcon/>
        </S.InnerDiv2>
    </S.Overlap>
);

/**
 * MiddleSection 컴포넌트 - 메인 페이지 중앙 섹션
 * 제품 소개와 API 키 소개 영역으로 구성
 */
const MiddleSection = () => (
    <S.MiddleSection>
        {/* 제품 소개 영역 */}
        <ProductIntroSection/>

        {/* API 키 소개 영역 */}
        <ApiKeyIntroSection/>
    </S.MiddleSection>
);

/**
 * ProductIntroSection 컴포넌트 - 제품 소개 영역
 * 자물쇠 아이콘과 호버 효과 포함
 * 위치 완전 고정 버전
 * 호버 상태에 따라 자물쇠 아이콘 색상 변경
 */
const ProductIntroSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <S.Overlap3
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={isHovered ? "hover-active" : ""}
        >
            {/* 호버 시 확장되는 오버레이 효과 */}
            <S.OverlayEffect className="overlay-2"/>
            <S.Group3/>
            <S.TitleContainer>
                <S.TextWrapper2 className="hover-title">
                    제품 소개
                </S.TextWrapper2>
                <S.TextWrapper3 style={{opacity: isHovered ? 1 : 0}}>
                    제품 특징을 알려줄게요.
                </S.TextWrapper3>
            </S.TitleContainer>
            {/* 자물쇠 아이콘에 호버 상태 전달 */}
            <LockIcon isHovered={isHovered}/>
        </S.Overlap3>
    );
};

/**
 * ApiKeyIntroSection 컴포넌트 - API 키 소개 영역
 * 파일 아이콘과 호버 효과 포함
 * 위치 완전 고정 버전
 */
const ApiKeyIntroSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <S.Overlap2
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 호버 시 확장되는 오버레이 효과 */}
            <S.OverlayEffect className="overlay-3"/>
            <S.TitleContainer>
                <S.TextWrapper2 className="hover-title">
                    API 키 사용법
                </S.TextWrapper2>
                <S.TextWrapper3 style={{opacity: isHovered ? 1 : 0}}>
                    API 키에 대한 자세한 사용법입니다.
                </S.TextWrapper3>
            </S.TitleContainer>
            {/* 파일 아이콘 */}
            <FileIcon/>
        </S.Overlap2>
    );
};

/**
 * Footer 컴포넌트 - 페이지 하단 푸터 영역
 */
const Footer = () => (
    <S.DivWrapper>
        <S.TextWrapper5>푸터 페이지</S.TextWrapper5>
    </S.DivWrapper>
);

export default PdMain;