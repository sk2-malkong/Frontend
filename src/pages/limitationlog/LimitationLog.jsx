import React, { useState, useEffect } from "react";
import S from "./style";
// SVG 아이콘 임포트
import { ReactComponent as DownArrowIcon } from './downarrrow_btn.svg';
import { ReactComponent as RightArrowIcon } from './R-arrow.svg';
import { ReactComponent as LeftArrowIcon } from './L-arrow.svg';

/**
 * 운영원칙 위반 안내 내역 컴포넌트
 * @returns {JSX.Element} 운영원칙 위반 안내 화면
 */
const LimitationLog = () => {
    // 상세 정보 표시 여부 상태
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    // 카드 높이 조절을 위한 상태
    const [cardHeight, setCardHeight] = useState("14.375rem"); // 230px
    // 현재 보여지는 위반 상세 정보 인덱스
    const [currentDetailIndex, setCurrentDetailIndex] = useState(0);

    // 예시 상세 데이터 - 나중에 API로 대체될 예정
    // API 구현 시 이 부분을 useEffect + fetch/axios 등으로 대체하면 됨
    // 각 항목은 욕설 단어, 대체어, 의미, 조치 시간 정보를 포함
    // violationDetails: 전제 욕설 데이터
    const violationDetails = [
        {
            violationWord: "좆같다",
            alternative: "힘들다",
            meaning: "남성의 성기를 지칭하는 좆과 '-같아'가 합쳐진 욕설",
            actionTime: "25.04.09 14:06"
        },
        {
            violationWord: "시발",
            alternative: "정말",
            meaning: "여성의 생식기를 의미하는 속어에서 유래한 욕설",
            actionTime: "25.04.08 11:32"
        },
        {
            violationWord: "개새끼",
            alternative: "이런",
            meaning: "개의 새끼를 사람에게 비유한 욕설",
            actionTime: "25.04.07 16:45"
        },
        {
            violationWord: "병신",
            alternative: "이상한 사람",
            meaning: "신체적 또는 정신적 장애를 비하하는 말",
            actionTime: "25.04.05 09:17"
        },
        {
            violationWord: "지랄",
            alternative: "헛소리",
            meaning: "간질병을 비하하는 말에서 유래한 욕설",
            actionTime: "25.04.03 18:22"
        }
    ];

    // 상세 정보 표시 상태가 변경될 때 카드 높이 조절
    // isDetailOpen 상태에 따라 카드 높이를 동적으로 변경하여 애니메이션 효과 구현
    useEffect(() => {
        if (isDetailOpen) {
            setCardHeight("37.125rem"); // 594px - 상세 정보 표시 시 높이
        } else {
            setCardHeight("14.375rem"); // 230px - 기본 높이
        }
    }, [isDetailOpen]);

    // 상세 정보 표시 상태 토글 함수
    // 화살표 버튼 클릭 시 호출됨 => 박스 사이즈 변경
    const toggleDetail = () => {
        setIsDetailOpen(!isDetailOpen);
    };

    // 이전 상세 정보 보기
    // 인덱스가 0일 경우 마지막 항목으로 순환
    // prevIndex: 현제 인덱스
    // 현제 데이터 인덱스가 0이라면 가장 마지막 인덱스로 이동, 아니면 현제 인덱스에서 하나 줄임
    const handlePrevDetail = () => {
        setCurrentDetailIndex(prevIndex =>
            prevIndex === 0 ? violationDetails.length - 1 : prevIndex - 1
        );
    };

    // 다음 상세 정보 보기
    // 인덱스가 마지막일 경우 첫 항목으로 순환
    // 현제 데이터 인덱스가 마지막 인덱스랑 같다면 첫 인덱스로 이동, 아니면 현제 인덱스에서 하나 늘림
    const handleNextDetail = () => {
        setCurrentDetailIndex(prevIndex =>
            prevIndex === violationDetails.length - 1 ? 0 : prevIndex + 1
        );
    };

    // 현재 표시할 상세 정보
    // 현재 인덱스에 해당하는 데이터를 가져옴
    // handlePrevDetail, handleNextDetail 에서 나온 정보 가지고 옴
    const currentDetail = violationDetails[currentDetailIndex];

    return (
        <S.Container>
            {/*
              카드 컨테이너: height prop에 따라 높이가 동적으로 변함
              transition 효과로 부드러운 애니메이션 적용
            */}
            <S.Card $height={cardHeight}>
                <S.Title>운영원칙 위반 안내 내역</S.Title>
                <S.Divider />

                {/* 기본 정보 영역: 항상 표시됨 */}
                <S.DetailContainer>
                    <S.LabelContainer>
                        <S.Label>조치 사유</S.Label>
                        <S.ReasonText>욕설 5회 사용</S.ReasonText>
                    </S.LabelContainer>

                    <S.LabelContainer>
                        <S.Label>제한 일시</S.Label>
                        <S.TimeContainer>
                            <S.TimeText>25.04.10</S.TimeText>
                            <S.TimeText>14:00</S.TimeText>
                            <S.Separator>~</S.Separator>
                            <S.TimeText>14:00</S.TimeText>
                            <S.TimeText>25.04.11</S.TimeText>
                        </S.TimeContainer>
                    </S.LabelContainer>
                </S.DetailContainer>

                {/*
                  화살표 버튼: 상세 정보 토글
                  $isOpen prop으로 아이콘 회전 방향 결정
                  접근성을 위한 aria-label 추가
                */}
                <S.ArrowButton
                    onClick={toggleDetail}
                    $isOpen={isDetailOpen}
                    aria-label={isDetailOpen ? "상세 정보 닫기" : "상세 정보 열기"}
                >
                    <S.ArrowIconWrapper $isOpen={isDetailOpen}>
                        <DownArrowIcon />
                    </S.ArrowIconWrapper>
                </S.ArrowButton>

                {/* 상세 정보 영역: isDetailOpen이 true일 때만 표시 */}
                {isDetailOpen && (
                    <S.DetailView>
                        {/*
                          네비게이션 버튼: 이전/다음 상세 정보 보기
                          SVG 아이콘을 사용하여 디자인적으로 일관성 유지
                        */}
                        <S.NavigationButton
                            $direction="prev"
                            onClick={handlePrevDetail}
                            aria-label="이전 위반 사항 보기"
                        >
                            <S.ArrowIconWrapper $isNavigation>
                                <LeftArrowIcon />
                            </S.ArrowIconWrapper>
                        </S.NavigationButton>

                        <S.NavigationButton
                            $direction="next"
                            onClick={handleNextDetail}
                            aria-label="다음 위반 사항 보기"
                        >
                            <S.ArrowIconWrapper $isNavigation>
                                <RightArrowIcon />
                            </S.ArrowIconWrapper>
                        </S.NavigationButton>

                        {/* 상세 정보 내용: 현재 선택된 위반 내역 표시 */}
                        <S.DetailItem>
                            <S.DetailLabel>욕설</S.DetailLabel>
                            <S.DetailValue>{currentDetail.violationWord}</S.DetailValue>
                        </S.DetailItem>

                        <S.DetailItem>
                            <S.DetailLabel>대체어</S.DetailLabel>
                            <S.DetailValue>{currentDetail.alternative}</S.DetailValue>
                        </S.DetailItem>

                        <S.DetailItem>
                            <S.DetailLabel>뜻</S.DetailLabel>
                            <S.DetailDescription>{currentDetail.meaning}</S.DetailDescription>
                        </S.DetailItem>

                        <S.DetailItem>
                            <S.DetailLabel>조치 일시</S.DetailLabel>
                            <S.DetailValue>{currentDetail.actionTime}</S.DetailValue>
                        </S.DetailItem>

                        {/*
                          페이지 인디케이터: 현재 보고 있는 항목 위치 표시
                          $active prop으로 현재 위치 강조
                        */}
                        <S.PageIndicator>
                            {violationDetails.map((_, index) => (
                                <S.PageDot
                                    key={index}
                                    $active={index === currentDetailIndex}
                                />
                            ))}
                        </S.PageIndicator>
                    </S.DetailView>
                )}
            </S.Card>
        </S.Container>
    );
};

export default LimitationLog;