import React from "react";
import styled from "styled-components";

/**
 * px 값을 rem으로 변환하는 유틸리티 함수
 * 16px을 1rem으로 기준으로 계산합니다.
 */
const pxToRem = (px: number): string => `${px / 16}rem`;

/**
 * 자물쇠 컴포넌트의 스타일 정의
 */
const S = {
    /**
     * 자물쇠 컨테이너
     * 자물쇠 아이콘의 크기와 위치를 조절합니다.
     */
    LockContainer: styled.div`
        transform: scale(3); // 전체 아이콘을 3배 확대
        transform-origin: center; // 중앙을 기준으로 확대
        z-index: 1;
    `,

    /**
     * 자물쇠 래퍼 컴포넌트
     * 자물쇠 아이콘의 위치를 중앙에 배치합니다.
     */
    LockWrapper: styled.div`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    `,

    /**
     * 자물쇠 라벨 컴포넌트
     * 자물쇠 아이콘의 크기와 정렬을 관리합니다.
     */
    LockLabel: styled.div`
        width: ${pxToRem(45)}; // 크기 설정
        height: ${pxToRem(45)}; // 크기 설정
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
    `,

    /**
     * 자물쇠 내부 래퍼 컴포넌트
     * 자물쇠 아이콘의 내부 요소를 배치합니다.
     */
    LockInnerWrapper: styled.div`
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: rotate(-10deg);
    `,

    /**
     * 자물쇠 고리 컴포넌트
     * 자물쇠의 윗부분(고리)을 스타일링합니다. 호버시 회전 효과가 적용됩니다.
     */
    Shackle: styled.span`
        background-color: transparent;
        height: ${pxToRem(9)}; // 고리 높이
        width: ${pxToRem(9)}; // 고리 너비
        border-top-right-radius: ${pxToRem(10)}; // 상단 오른쪽 모서리 둥글게
        border-top-left-radius: ${pxToRem(10)}; // 상단 왼쪽 모서리 둥글게
        border-top: 3px solid #464B4E; // 상단 테두리
        border-left: 3px solid #464B4E; // 왼쪽 테두리
        border-right: 3px solid #464B4E; // 오른쪽 테두리
        transition: all 0.3s;

        /* Overlap3에 호버시 자물쇠 고리 색상 변경 */
        .hover-active & {
            border-top: 3px solid #4E71FF;
            border-left: 3px solid #4E71FF;
            border-right: 3px solid #4E71FF;
        }
    `,

    /**
     * 자물쇠 몸체 컴포넌트
     * 자물쇠의 하단 부분(몸체)을 스타일링합니다.
     */
    LockBody: styled.svg`
        width: ${pxToRem(15)};

        path {
            transition: fill 0.3s ease;

            /* Overlap3에 호버시 자물쇠 몸체 색상 변경 */
            .hover-active & {
                fill: #FFF100;
            }
        }
    `,
};

/**
 * 자물쇠 아이콘 컴포넌트
 * 호버시 애니메이션 효과가 있는 자물쇠 아이콘을 렌더링합니다.
 * isHovered 속성을 받아 호버 상태에 따라 스타일을 변경합니다.
 */
const LockIcon: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
    return (
        <S.LockWrapper className={isHovered ? "hover-active" : ""}>
            <S.LockContainer>
                <S.LockLabel className="lock-label">
                    <S.LockInnerWrapper>
                        <S.Shackle className="shackle"></S.Shackle>
                        <S.LockBody
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 5C0 2.23858 2.23858 0 5 0H23C25.7614 0 28 2.23858 28 5V23C28 25.7614 25.7614 28 23 28H5C2.23858 28 0 25.7614 0 23V5ZM16 13.2361C16.6137 12.6868 17 11.8885 17 11C17 9.34315 15.6569 8 14 8C12.3431 8 11 9.34315 11 11C11 11.8885 11.3863 12.6868 12 13.2361V18C12 19.1046 12.8954 20 14 20C15.1046 20 16 19.1046 16 18V13.2361Z"
                                fill="#464B4E"
                            ></path>
                        </S.LockBody>
                    </S.LockInnerWrapper>
                </S.LockLabel>
            </S.LockContainer>
        </S.LockWrapper>
    );
};

export default LockIcon;