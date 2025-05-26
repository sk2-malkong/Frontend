// FileIcon.tsx 부분 수정 (paste-3.txt 파일 수정)
import React from "react";
import styled from "styled-components";

/**
 * px 값을 rem으로 변환하는 유틸리티 함수
 * 16px을 1rem으로 기준으로 계산합니다.
 */
const pxToRem = (px: number): string => `${px / 16}rem`;

/**
 * 파일 아이콘 컴포넌트의 스타일 정의
 */
const S = {
    /**
     * 파일 아이콘 래퍼 컴포넌트
     * 파일 아이콘의 위치를 중앙에 배치합니다.
     */
    FileIconWrapper: styled.div`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10;
    `,

    /**
     * 파일 컨테이너 컴포넌트
     * 파일 아이콘의 크기와 3D 효과를 관리합니다.
     */
    FilFileContainer: styled.div`
        position: relative;
        width: ${pxToRem(240)}; // 60 * 4
        height: ${pxToRem(160)}; // 40 * 4
        cursor: pointer;
        transform-origin: bottom;
        perspective: ${pxToRem(1500)};
        z-index: 50;
        transform: scale(0.35); // 전체 아이콘을 0.35배 크기로 조정
        transform-origin: center; // 중앙을 기준으로 변형
    `,

    /**
     * 작업 파일 5 컴포넌트
     * 파일 아이콘의 가장 바깥쪽 레이어입니다.
     */
    WorkFile5: styled.div`
        background-color: #464B4E; // 기본 배경색
        width: 100%;
        height: 100%;
        transform-origin: top;
        border-radius: ${pxToRem(16)}; // 모서리 둥글게
        border-top-left-radius: 0;
        transition: all 0.3s ease;
        position: relative;

        .overlay-3:hover & {
            background-color: #4E71FF; // amber-600 호버 시 색상 #d97706
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 99%;
            left: 0;
            width: ${pxToRem(80)}; // 20 * 4
            height: ${pxToRem(16)}; // 4 * 4
            background-color: #464B4E; // 기본 배경색
            border-top-left-radius: ${pxToRem(16)}; // 상단 모서리 둥글게
            border-top-right-radius: ${pxToRem(16)}; // 상단 모서리 둥글게

            .overlay-3:hover & {
                background-color: #4E71FF; // amber-600 호버 시 색상
            }
        }

        &::before {
            content: '';
            position: absolute;
            top: ${pxToRem(-15)};
            left: ${pxToRem(75.5)};
            width: ${pxToRem(16)}; // 4 * 4
            height: ${pxToRem(16)}; // 4 * 4
            background-color: #464B4E; // 기본 배경색
            clip-path: polygon(0 35%, 0% 100%, 50% 100%);

            .overlay-3:hover & {
                background-color: #4E71FF; // amber-600 호버 시 색상
            }
        }
    `,

    /**
     * 작업 파일 4 컴포넌트
     * 파일 아이콘의 네 번째 레이어입니다.
     */
    WorkFile4: styled.div`
        position: absolute;
        inset: ${pxToRem(4)}; // 안쪽 여백
        background-color: #61686c; // 기본 배경색
        border-radius: ${pxToRem(16)}; // 모서리 둥글게
        transition: all 0.3s ease;
        transform-origin: bottom;
        user-select: none;

        .overlay-3:hover & {
            background-color: #a1a1aa; // zinc-400 호버 시 색상
            transform: rotateX(-20deg);
        }
    `,

    /**
     * 작업 파일 3 컴포넌트
     * 파일 아이콘의 세 번째 레이어입니다.
     */
    WorkFile3: styled.div`
        position: absolute;
        inset: ${pxToRem(4)}; // 안쪽 여백
        background-color: #7b848a; // 기본 배경색
        border-radius: ${pxToRem(16)}; // 모서리 둥글게
        transition: all 0.3s ease;
        transform-origin: bottom;

        .overlay-3:hover & {
            background-color: #d4d4d8; // zinc-300 호버 시 색상
            transform: rotateX(-30deg);
        }
    `,

    /**
     * 작업 파일 2 컴포넌트
     * 파일 아이콘의 두 번째 레이어입니다.
     */
    WorkFile2: styled.div`
        position: absolute;
        inset: ${pxToRem(4)}; // 안쪽 여백
        background-color: #959fa7; // 기본 배경색
        border-radius: ${pxToRem(16)}; // 모서리 둥글게
        transition: all 0.3s ease;
        transform-origin: bottom;

        .overlay-3:hover & {
            background-color: #e4e4e7; // zinc-200 호버 시 색상
            transform: rotateX(-38deg);
        }
    `,

    /**
     * 작업 파일 1 컴포넌트
     * 파일 아이콘의 첫 번째(가장 안쪽) 레이어입니다.
     */
    WorkFile1: styled.div`
        position: absolute;
        bottom: 0;
        width: 100%;
        height: ${pxToRem(156)};
        background: linear-gradient(to top, #464B4E, #5a6166); // 기본 그라디언트 배경색
        border-radius: ${pxToRem(16)}; // 모서리 둥글게
        border-top-right-radius: 0;
        transition: all 0.3s ease;
        transform-origin: bottom;
        display: flex;
        align-items: flex-end;

        .overlay-3:hover & {
            background: linear-gradient(to top, #4E71FF, #8DD8FF); // amber-500에서 amber-400 그라디언트 호버 시 색상 f59e0b, #fbbf24
            transform: rotateX(-46deg) translateY(${pxToRem(1)});
            box-shadow: inset 0 ${pxToRem(20)} ${pxToRem(40)} #8DD8FF, inset 0 ${pxToRem(-20)} ${pxToRem(40)} #4E71FF;
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 99%;
            right: 0;
            width: ${pxToRem(146)};
            height: ${pxToRem(16)};
            background-color: #464B4E; // 기본 배경색
            border-top-left-radius: ${pxToRem(16)}; // 상단 모서리 둥글게
            border-top-right-radius: ${pxToRem(16)}; // 상단 모서리 둥글게

            .overlay-3:hover & {
                background-color: #4E71FF; // amber-400 호버 시 색상
            }
        }

        &::before {
            content: '';
            position: absolute;
            top: ${pxToRem(-10)};
            right: ${pxToRem(142)};
            width: ${pxToRem(12)}; // size-3
            height: ${pxToRem(12)}; // size-3
            background-color: #61686c; // 기본 배경색
            clip-path: polygon(100% 14%, 50% 100%, 100% 100%);

            .overlay-3:hover & {
                background-color: #4E71FF; // amber-400 호버 시 색상
            }
        }
    `,
};

/**
 * 파일 아이콘 컴포넌트
 * 호버시 애니메이션이 있는 파일 아이콘을 렌더링합니다.
 */
const FileIcon: React.FC = () => {
    return (
        <S.FileIconWrapper>
            <S.FilFileContainer>
                <S.WorkFile5 className="work-file-5"></S.WorkFile5>
                <S.WorkFile4 className="work-file-4"></S.WorkFile4>
                <S.WorkFile3 className="work-file-3"></S.WorkFile3>
                <S.WorkFile2 className="work-file-2"></S.WorkFile2>
                <S.WorkFile1 className="work-file-1"></S.WorkFile1>
            </S.FilFileContainer>
        </S.FileIconWrapper>
    );
};

export default FileIcon;