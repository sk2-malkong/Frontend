import styled from "styled-components";

/**
 * px 값을 rem으로 변환하는 유틸리티 함수
 * 16px을 1rem으로 기준으로 계산합니다.
 */
const pxToRem = (px: number): string => `${px / 16}rem`;

/**
 * 헤더 관련 스타일 컴포넌트 모음
 */
const S = {
    /**
     * 헤더 컨테이너
     * 화면 상단에 고정된 헤더를 위한 컴포넌트입니다.
     */
    HeaderContainer: styled.div`
        background-color: #000000;
        height: ${pxToRem(70)};
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        box-shadow: 0 ${pxToRem(2)} ${pxToRem(5)} rgba(0, 0, 0, 0.1);
    `,

    /**
     * 헤더 내부 컨테이너
     * 헤더 내용을 중앙에 배치합니다.
     */
    HeaderInner: styled.div`
        max-width: ${pxToRem(1920)};
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 ${pxToRem(24)};
    `,

    /**
     * 로고 컨테이너
     * 헤더 내 로고 영역입니다.
     */
    LogoContainer: styled.div`
        height: 100%;
        display: flex;
        align-items: center;

        img {
            max-height: ${pxToRem(40)};
            width: auto;
        }
    `,

    /**
     * 로고 텍스트 컴포넌트
     * 헤더 내 "PURGO" 텍스트 스타일입니다.
     */
    LogoText: styled.div`
        font-family: "Pretendard-Bold", Helvetica;
        font-size: ${pxToRem(24)};
        font-weight: 700;
        color: #c2dfff;
        letter-spacing: ${pxToRem(-0.5)};
    `,

    /**
     * 버튼 컨테이너
     * 헤더 내 버튼 그룹 영역입니다.
     */
    ButtonContainer: styled.div`
        display: flex;
        gap: ${pxToRem(16)};
    `,

    /**
     * 헤더 버튼
     * 로그인 및 앱 등록 버튼 스타일입니다.
     */
    HeaderButton: styled.button<{ primary?: boolean }>`
        background-color: ${props => props.primary ? '#c2dfff' : 'transparent'};
        color: ${props => props.primary ? '#111111' : '#333333'};
        border: ${props => props.primary ? 'none' : `${pxToRem(1)} solid #cccccc`};
        border-radius: ${pxToRem(4)};
        padding: ${pxToRem(8)} ${pxToRem(16)};
        font-family: "Pretendard-Medium", Helvetica;
        font-size: ${pxToRem(14)};
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background-color: ${props => props.primary ? '#b5d8ff' : '#f5f5f5'};
        }
    `,
};

export default S;