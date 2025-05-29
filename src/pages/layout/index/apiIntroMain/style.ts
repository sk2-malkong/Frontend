// style.ts 파일 수정

import styled from "styled-components";

/**
 * px 값을 rem으로 변환하는 유틸리티 함수
 * 16px을 1rem으로 기준으로 계산합니다.
 */
const pxToRem = (px: number): string => `${px / 16}rem`;

/**
 * 각 영역별 호버시 사용할 배경색 변수
 * 기본 배경색(base)과 호버시 배경색(hover)을 정의합니다.
 */
const overlapColors = {
    primary: {
        base: "#262b2f",    // 기본 배경색
        hover: "#c2dfff",   // 호버시 배경색
    },
    secondary: {
        base: "#212529",    // 기본 배경색
        hover: "#c2dfff",   // 호버시 배경색
    },
    tertiary: {
        base: "#31363a",    // 기본 배경색
        hover: "#c2dfff",   // 호버시 배경색
    }
};

/**
 * 스타일 컴포넌트 정의 - 헤더 관련 스타일은 제거됨
 */
const S = {
    // ==================== 레이아웃 구조 컴포넌트 ====================

    /**
     * 전체 프레임을 감싸는 최상위 컨테이너
     * 화면 전체 높이를 차지하고 내용을 가로 중앙에 배치합니다.
     */
    FrameContainer: styled.div`
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100vh; /* 뷰포트 높이에 맞춤 */
        overflow: hidden; /* 스크롤 방지 */
    `,

    /**
     * 전체 컨텐츠를 담는 내부 컨테이너
     * 최대 너비를 제한하고 중앙 정렬합니다.
     */
    InnerDiv: styled.div`
        background-color: #ffffff;
        position: relative;
        width: 100%; /* 전체 너비 사용 */
        height: 100%; /* 부모 컨테이너의 높이에 맞춤 */
        max-width: ${pxToRem(1920)}; /* 최대 너비 제한 */
        margin: 0 auto; /* 중앙 정렬 */
        padding-top: ${pxToRem(70)}; /* 헤더 높이만큼 패딩 추가 */
        padding-bottom: ${pxToRem(52)}; /* 푸터 높이의 절반만큼 패딩 추가 */
        display: flex;
        flex-direction: column;
    `,

    /**
     * 내부 콘텐츠 영역을 위한 컨테이너
     * 높이와 너비를 조절하고 내부 요소를 배치합니다.
     */
    InnerDiv2: styled.div`
        height: 80%;
        position: relative;
        width: 90%;
        max-width: ${pxToRem(1010)};
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        z-index: 1; /* 오버레이 위에 표시 */

        @media (max-width: 1200px) {
            width: 90%; /* 작은 화면에서 비율 유지 */
        }


    `,

    /**
     * 화면 중앙 섹션 컨테이너
     * 화면의 절반을 차지하는 영역입니다.
     */
    MiddleSection: styled.div`
        flex: 0 0 50%; /* 화면의 1/2 차지하도록 설정 */
        display: flex;
        width: 100%;
    `,

    /**
     * 콘텐츠 그룹을 위한 컨테이너
     * 섹션 내에서 콘텐츠 영역을 정의합니다.
     */
    Group2: styled.div`
        width: 60%;
        position: relative;
        z-index: 1; /* 오버레이 위에 표시 */

        @media (max-width: 768px) {
            width: 90%;
        }
    `,
    JsonEffect:styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* 왼쪽 정렬 */
        text-align: right;
        width: 100%;
        z-index: 1;
        margin-top: -10.8rem;
         width: fit-content;        /* 콘텐츠 폭 만큼만 */
         margin-left: auto; 
    
    
    `,

    /**
     * 푸터 영역 컨테이너
     * 화면 하단에 고정된 푸터를 위한 컴포넌트입니다.
     * 높이를 절반으로 줄였습니다.
     */
    DivWrapper: styled.div`
        background-color: #060b11;
        height: ${pxToRem(52)}; /* 기존 104px에서 절반으로 줄임 */
        position: fixed; /* 화면 하단에 고정 */
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 1000; /* 다른 요소보다 앞에 배치 */
    `,

    // ==================== 오버레이 효과 관련 컴포넌트 ====================

    /**
     * 오버레이 호버 효과를 위한 컴포넌트
     * 클릭 가능한 영역에 호버시 원형으로 퍼지는 애니메이션 효과를 줍니다.
     */
    OverlayEffect: styled.div`
        width: ${pxToRem(100)};
        height: ${pxToRem(100)};
        position: absolute;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 1s ease-out;
        z-index: 0;

        &.overlay-1 {
            background: ${overlapColors.primary.hover};
        }

        &.overlay-2 {
            background: ${overlapColors.secondary.hover};
        }

        &.overlay-3 {
            background: ${overlapColors.tertiary.hover};
        }
    `,

    /**
     * 첫 번째 오버랩 영역 컴포넌트
     * 물결 효과로 대체되었습니다.
     */
    Overlap: styled.div`
        background-color: ${overlapColors.primary.base};
        flex: 0 0 50%;
        position: relative;
        width: 100%;
        overflow: hidden;
    `,

    /**
     * 두 번째 오버랩 영역 컴포넌트 (제품 소개 - 파일 아이콘)
     * 호버시 파일 아이콘 애니메이션과 오버레이 효과가 나타납니다.
     */
    Overlap3: styled.div`
        background-color: ${overlapColors.secondary.base};
        flex: 1;
        position: relative;
        overflow: hidden; /* 오버레이가 넘치지 않도록 설정 */
        display: flex;
        flex-direction: column;
        padding: ${pxToRem(23)} ${pxToRem(24)};
        cursor: pointer; /* 커서 스타일 변경 */
        transition: background-color 0.3s ease;

        /* 파일 아이콘 호버 효과 */
        &:hover .work-file-5,
        &:hover .work-file-5::after,
        &:hover .work-file-5::before {
            background-color: #4E71FF; /* amber-600 색상 */
        }

        &:hover .work-file-4 {
            background-color: #a1a1aa; /* zinc-400 색상 */
            transform: rotateX(-20deg);
        }

        &:hover .work-file-3 {
            background-color: #d4d4d8; /* zinc-300 색상 */
            transform: rotateX(-30deg);
        }

        &:hover .work-file-2 {
            background-color: #e4e4e7; /* zinc-200 색상 */
            transform: rotateX(-38deg);
        }

        &:hover .work-file-1 {
            background: linear-gradient(to top, #4E71FF, #4765e8); /* amber-500에서 amber-400 그라디언트 */
            transform: rotateX(-46deg) translateY(${pxToRem(1)});
            box-shadow: inset 0 ${pxToRem(20)} ${pxToRem(40)} #4E71FF, inset 0 ${pxToRem(-20)} ${pxToRem(40)} #4765e8;
        }

        &:hover .work-file-1::after {
            background-color: #4E71FF; /* amber-400 색상 */
        }

        &:hover .work-file-1::before {
            background-color: #4E71FF; /* amber-400 색상 */
        }

        &:hover .overlay-2 {
            transform: translate(-50%, -50%) scale(20);
        }

        /* 호버 시 텍스트 색상 변경 */
        &:hover .hover-title {
            color: #111111;
        }
    `,

    /**
     * 세 번째 오버랩 영역 컴포넌트 (API 키 사용법 - 자물쇠 아이콘)
     * 호버시 자물쇠 애니메이션과 오버레이 효과가 나타납니다.
     */
    Overlap2: styled.div`
        background-color: ${overlapColors.tertiary.base};
        flex: 1;
        position: relative;
        overflow: hidden; /* 오버레이가 넘치지 않도록 설정 */
        display: flex;
        flex-direction: column;
        padding: ${pxToRem(23)} ${pxToRem(24)};
        cursor: pointer; /* 커서 스타일 변경 */
        transition: background-color 0.3s ease;

        /* 자물쇠 아이콘 호버 효과 */
        &:hover .shackle {
            transform: rotateY(150deg) translateX(3px);
            transform-origin: right;
            border-top: 3px solid #4E71FF !important;
            border-left: 3px solid #4E71FF !important;
            border-right: 3px solid #4E71FF !important;
        }

        &:hover path {
            fill: #4E71FF !important;
        }

        &:hover .overlay-3 {
            transform: translate(-50%, -50%) scale(20);
        }

        /* 호버 시 텍스트 색상 변경 */
        &:hover .hover-title {
            color: #111111;
        }

        /* hover-active 클래스 효과도 포함 */
        &.hover-active .shackle {
            border-top: 3px solid #4E71FF !important;
            border-left: 3px solid #4E71FF !important;
            border-right: 3px solid #4E71FF !important;
        }

        &.hover-active path {
            fill: #4E71FF !important;
        }
    `,

    /**
     * 그룹 3 컨테이너
     * 배경 요소를 위한 포지셔닝 컴포넌트입니다.
     */
    Group3: styled.div`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    `,

    // ==================== 텍스트 스타일 컴포넌트 ====================

    /**
     * 기본 텍스트 컴포넌트
     * 흰색 텍스트를 렌더링합니다.
     */
    TextWrapper: styled.p`
        color: #ffffff;
        font-family: "Pretendard-Medium", Helvetica;
        font-size: ${pxToRem(16)};
        font-weight: 500;
        letter-spacing: ${pxToRem(-0.60)};
        line-height: ${pxToRem(31.9)};
        white-space: normal; /* 텍스트 줄바꿈 허용 */
        z-index: 1;

        @media (max-width: 768px) {
            font-size: ${pxToRem(14)};
            line-height: ${pxToRem(28)};
        }
    `,

    /**
     * 단락 텍스트 컴포넌트
     * 상단 여백이 있는 흰색 텍스트입니다.
     */
    P: styled.p`
        color: #ffffff;
        font-family: "Pretendard-Medium", Helvetica;
        font-size: ${pxToRem(16)};
        font-weight: 500;
        letter-spacing: ${pxToRem(-0.60)};
        line-height: ${pxToRem(31.9)};
        white-space: normal; /* 텍스트 줄바꿈 허용 */
        z-index: 1;

        @media (max-width: 768px) {
            font-size: ${pxToRem(14)};
            line-height: ${pxToRem(28)};
        }
    `,

    /**
     * 두 번째 텍스트 래퍼 컴포넌트
     * 어두운 배경의 텍스트를 위한 컴포넌트입니다.
     */
    TextWrapper2: styled.div`
        color: #64676A;
        font-family: "Pretendard-Medium", Helvetica;
        font-size: ${pxToRem(24)};
        font-weight: bold;
        letter-spacing: ${pxToRem(-0.60)};
        white-space: normal;
        z-index: 1;
        transition: color 0.3s ease;
        margin-bottom: ${pxToRem(2)} ;

        @media (max-width: 768px) {
            font-size: ${pxToRem(20)};
        }
    `,

    /**
     * 세 번째 텍스트 래퍼 컴포넌트
     * 상단 여백이 있는 어두운 배경의 텍스트입니다.
     * 호버시 위치 변경 효과 제거 버전
     */
    TextWrapper3: styled.p`
        color: #111111;
        font-family: "Pretendard-Medium", Helvetica;
        font-size: ${pxToRem(16)};
        font-weight: 500;
        letter-spacing: ${pxToRem(-0.60)};
        white-space: normal;
        z-index: 1;

        /* 항상 표시하되 opacity만 조절하여 위치 변경 방지 */
        /* visibility, max-height 관련 속성 제거 */
        transition: opacity 0.3s ease;

        &.description-text {
            display: block; /* 항상 표시 */
            height: auto; /* 고정 높이 사용 */
        }

        @media (max-width: 768px) {
            font-size: ${pxToRem(20)};
        }
    `,

    /**
     * 네 번째 텍스트 래퍼 컴포넌트
     * 큰 크기의 중앙 정렬 텍스트입니다.
     */
    TextWrapper4: styled.div`
        color: #ffffff;
        font-family: "Pretendard-Medium", Helvetica;
        font-size: ${pxToRem(40)};
        font-weight: 500;
        letter-spacing: ${pxToRem(-0.60)};
        line-height: ${pxToRem(31.9)};
        white-space: normal;
        text-align: center;
        margin-top: auto;
        margin-bottom: auto;
        z-index: 1;

        @media (max-width: 768px) {
            font-size: ${pxToRem(32)};
        }
    `,

    /**
     * 다섯 번째 텍스트 래퍼 컴포넌트
     * 푸터에 위치하는 작은 크기의 중앙 정렬 텍스트입니다.
     */
    TextWrapper5: styled.div`
        color: #ffffff;
        font-family: "Pretendard-Medium", Helvetica;
        font-size: ${pxToRem(14)};
        font-weight: 500;
        letter-spacing: ${pxToRem(-0.60)};
        line-height: ${pxToRem(31.9)};
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%); /* 완전 중앙 정렬 */
        white-space: normal;
        text-align: center;
    `,

    // ==================== 기타 UI 요소 컴포넌트 ====================

    /**
     * 사각형 요소 컴포넌트
     * 둥근 모서리를 가진 사각형 UI 요소입니다.
     */
    Rectangle: styled.div`
        background-color: #5b6771;
        border-radius: ${pxToRem(40)};
        height: ${pxToRem(150)};
        width: ${pxToRem(150)};
        z-index: 1;

        @media (max-width: 1200px) {
            height: ${pxToRem(200)};
            width: ${pxToRem(200)};
        }

        @media (max-width: 768px) {
            height: ${pxToRem(150)};
            width: ${pxToRem(150)};
        }
    `,

    /**
     * 이미지 래퍼 컴포넌트
     * 이미지를 담는 컨테이너입니다.
     */
    ImageWrapper: styled.div`
        width: 100%;
        margin-bottom: ${pxToRem(15)};
        position: relative;
    `,

    /**
     * 이미지 컴포넌트
     * 반응형으로 크기가 조절되는 이미지입니다.
     */
    Image: styled.img`
        width: 100%;
        height: auto;
        display: block;
        /* 이미지 크기 조절을 위한 클래스 */
        &.small {
            max-width: 60%;
        }

        &.medium {
            max-width: 80%;
        }

        &.large {
            max-width: 100%;
        }
    `,

    // ==================== 새로 추가된 애니메이션 컴포넌트 ====================

    /**
     * 타이틀 컨테이너
     * 제목과 설명 텍스트를 감싸는 컨테이너입니다.
     */
    TitleContainer: styled.div`
        position: relative;

        /* 호버 효과 스타일 추가 */
        .hover-title {
            color: #64676A;
            transition: color 0.3s ease;
        }

        &:hover .hover-title {
            color: #111111;
        }
    `,

    /**
     * 물결 효과가 적용된 배너 컴포넌트
     * 개선된 Card 컴포넌트의 물결 애니메이션을 적용합니다.
     */
    StyledBanner: styled.div`
        /* 배너 크기 변수 설정 */
        --card-width: ${pxToRem(1800)};
        --card-height: ${pxToRem(800)};

        /* 웨이브 크기 계산 - 배너 너비 기준으로 설정 */
        --wave-width: calc(2.25 * var(--card-width));
        --wave-height: calc(2.92 * var(--card-width));

        position: relative;
        width: 100%;
        height: 100%;
        flex: 0 0 50%;
        background-color: ${overlapColors.primary.base};

        .card {
            background: transparent;
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .wave {
            position: absolute;
            width: var(--wave-width);
            height: var(--wave-height);
            opacity: 0.6;
            left: 0;
            top: 0;
            margin-left: -50%;
            margin-top: calc(-0.292 * var(--card-width));
            background: linear-gradient(744deg, #4E71FF, #8DD8FF 60%, #BBFBFF);
            border-radius: 40%;
            //50
            animation: wave 30s infinite linear;
            z-index: 0;
        }

        .wave:nth-child(2),
        .wave:nth-child(3) {
            top: calc(0.525 * var(--card-height));
        }

        .playing .wave {
            animation-duration: 3000ms;
        }

        .playing .wave:nth-child(2) {
            animation-duration: 4000ms;
        }

        .wave:nth-child(2) {
            animation-duration: 30s;
        }

        .playing .wave:nth-child(3) {
            animation-duration: 5000ms;
        }

        .wave:nth-child(3) {
            animation-duration: 25s;
        }

        @keyframes wave {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        .info-top {
            text-align: center;
            position: absolute;
            top: calc(0.17 * var(--card-height));
            left: 0;
            right: 0;
            color: rgb(255, 255, 255);
            font-weight: 600;
            z-index: 1;
        }
    `,
    ContentContainer: styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* 왼쪽 정렬 */
        text-align: left;
        width: 100%;
        z-index: 1;
        margin-top: ${pxToRem(-70)};

        /* 클래스 이름을 사용한 선택자로 변경 */
        .image-wrapper {
            margin-bottom: ${pxToRem(10)};
        }

        /* 직접 스타일을 적용하는 방식으로 변경 */
        p {
            margin-bottom: ${pxToRem(-8)};
        }

        /* text-p 클래스를 가진 요소의 마진 제거 */
        .text-p {
            margin-top: 0;
        }
    `,

    // ===========================푸터 페이지 ===============================

    /**
     * 푸터 전체 영역 컴포넌트
     * 페이지 하단에 위치하는 회사 정보 및 연락처 섹션입니다.
     */
    FooterWrapper: styled.footer`
        background-color: #f8f9fa;
        border-top: ${pxToRem(1)} solid #e9ecef;
        padding: ${pxToRem(40)} 0 ${pxToRem(20)};
        margin-top: ${pxToRem(80)};
    `,

    /**
     * 푸터 내용 컨테이너
     * 푸터 내부 요소들의 배치를 관리합니다.
     */
    FooterContent: styled.div`
        display: flex;
        justify-content: space-between; /* 양 끝에 배치 */
        align-items: center; /* 세로 중앙 정렬 */
        width: 100%; /* 전체 너비 사용 */
        height: 100%; /* 부모(DivWrapper) 높이에 맞춤 */
        padding: 0 ${pxToRem(20)}; /* 좌우 여백 */
        max-width: none; /* max-width 제한 제거 */
        margin: 0; /* margin 제거 */

        @media (max-width: ${pxToRem(768)}) {
            flex-direction: column;
            gap: ${pxToRem(15)};
            padding: ${pxToRem(10)} ${pxToRem(20)}; /* 모바일에서 상하 패딩 추가 */
        }
    `,

    /**
     * 회사 정보 섹션 컴포넌트
     * 회사명을 표시하는 영역입니다.
     */
    CompanySection: styled.div`
        flex: 1;
    `,

    /**
     * 회사명 텍스트 컴포넌트
     * 회사명을 표시하는 제목 텍스트입니다.
     */
    CompanyName: styled.h3`
        font-size: ${pxToRem(24)};
        font-weight: 700;
        color: #333;
        margin-bottom: ${pxToRem(12)};
    `,

    /**
     * 연락처 섹션 컴포넌트
     * 연락처 정보를 담는 영역입니다.
     */
    ContactSection: styled.div`
        flex-shrink: 0;
    `,

    /**
     * 연락처 제목 컴포넌트
     * "연락처" 제목을 표시합니다.
     */
    ContactTitle: styled.h4`
        font-size: ${pxToRem(18)};
        font-weight: 600;
        color: #333;
        margin-bottom: ${pxToRem(16)};
    `,

    /**
     * 연락처 목록 컨테이너
     * 개별 연락처 항목들을 세로로 배치합니다.
     */
    ContactList: styled.div`
        display: flex;
        flex-direction: column;
        gap: ${pxToRem(8)};
    `,

    /**
     * 개별 연락처 항목 컴포넌트
     * 라벨과 연락처 정보를 가로로 배치합니다.
     */
    ContactItem: styled.div`
        display: flex;
        align-items: center;
        gap: ${pxToRem(8)};
    `,

    /**
     * 연락처 라벨 컴포넌트
     * "이메일:", "전화:" 등의 라벨을 표시합니다.
     */
    ContactLabel: styled.span`
        font-size: ${pxToRem(14)};
        color: #666;
        min-width: ${pxToRem(50)};
    `,

    /**
     * 연락처 링크 컴포넌트
     * 클릭 가능한 이메일 및 전화번호 링크입니다.
     */
    ContactLink: styled.a`
        font-size: ${pxToRem(14)};
        color: #666;
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
            color: #666;
            text-decoration: underline;
        }
    `,

    /**
     * 푸터 하단 영역 컴포넌트
     * 저작권 정보를 표시하는 하단 섹션입니다.
     */
    FooterBottom: styled.div`
        max-width: ${pxToRem(1200)};
        margin: 0 auto;
        padding: ${pxToRem(20)} ${pxToRem(20)} 0;
        border-top: ${pxToRem(1)} solid #e9ecef;
        margin-top: ${pxToRem(30)};
    `,

    /**
     * 저작권 텍스트 컴포넌트
     * 저작권 정보를 표시하는 작은 텍스트입니다.
     */
    Copyright: styled.p`
        font-size: ${pxToRem(14)};
        color: #888;
        text-align: center;
        margin: 0;
    `,

};

export default S;