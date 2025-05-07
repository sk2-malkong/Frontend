import React, { useState, useEffect } from "react";
import S from "./style";
// SVG 아이콘 임포트
import { ReactComponent as DownArrowIcon } from './downarrrow_btn.svg';
import { ReactComponent as RightArrowIcon } from './R-arrow.svg';
import { ReactComponent as LeftArrowIcon } from './L-arrow.svg';

/**
 * 운영원칙 위반 안내 내역 컴포넌트
 * @param {Object} props 컴포넌트 props
 * @param {Array} props.badwordLogs 욕설 감지 로그 배열
 * @param {string} props.startDate 제한 시작 일시
 * @param {string} props.endDate 제한 종료 일시
 * @param {boolean} props.isActive 현재 제한이 활성화되어 있는지 여부
 * @param {Function} props.formatDate 날짜 포맷 변환 함수
 * @param {Function} props.formatTime 시간 포맷 변환 함수
 * @returns {JSX.Element} 운영원칙 위반 안내 화면
 */
const LimitationLog = ({
                           badwordLogs,
                           startDate,
                           endDate,
                           isActive,
                           formatDate,
                           formatTime
                       }) => {
    // 상세 정보 표시 여부 상태
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    // 카드 높이 조절을 위한 상태
    const [cardHeight, setCardHeight] = useState("14.375rem"); // 230px
    // 현재 보여지는 위반 상세 정보 인덱스
    const [currentDetailIndex, setCurrentDetailIndex] = useState(0);

    // 상세 정보 표시 상태가 변경될 때 카드 높이 조절
    useEffect(() => {
        if (isDetailOpen) {
            setCardHeight("37.125rem"); // 594px - 상세 정보 표시 시 높이
        } else {
            setCardHeight("14.375rem"); // 230px - 기본 높이
        }
    }, [isDetailOpen]);

    // 상세 정보 표시 상태 토글 함수
    const toggleDetail = () => {
        setIsDetailOpen(!isDetailOpen);
        // 상세 정보 닫을 때 현재 인덱스 초기화
        if (isDetailOpen) {
            setCurrentDetailIndex(0);
        }
    };

    // 이전 상세 정보 보기
    const handlePrevDetail = () => {
        setCurrentDetailIndex(prevIndex =>
            prevIndex === 0 ? badwordLogs.length - 1 : prevIndex - 1
        );
    };

    // 다음 상세 정보 보기
    const handleNextDetail = () => {
        setCurrentDetailIndex(prevIndex =>
            prevIndex === badwordLogs.length - 1 ? 0 : prevIndex + 1
        );
    };

    // 현재 표시할 상세 정보
    const currentDetail = badwordLogs[currentDetailIndex];

    return (
        <S.Container>
            <S.Card $height={cardHeight}>
                <S.Title>운영원칙 위반 안내 내역</S.Title>
                <S.Divider />

                {/* 기본 정보 영역: 항상 표시됨 */}
                <S.DetailContainer>
                    <S.LabelContainer>
                        <S.Label>조치 사유</S.Label>
                        <S.ReasonText>욕설 {badwordLogs.length}회 사용</S.ReasonText>
                    </S.LabelContainer>

                    <S.LabelContainer>
                        <S.Label>제한 일시</S.Label>
                        <S.TimeContainer>
                            <S.TimeText>{`${formatDate(startDate)} ${formatTime(startDate)}`}</S.TimeText>
                            <S.Separator>~</S.Separator>
                            <S.TimeText>{`${formatDate(endDate)} ${formatTime(endDate)}`}</S.TimeText>
                        </S.TimeContainer>
                    </S.LabelContainer>
                </S.DetailContainer>

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
                {isDetailOpen && badwordLogs.length > 0 && (
                    <S.DetailView>
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
                            <S.DetailLabel>감지 문장</S.DetailLabel>
                            <S.DetailValue>{currentDetail.originalWord}</S.DetailValue>
                        </S.DetailItem>

                        <S.DetailItem>
                            <S.DetailLabel>대체 문장</S.DetailLabel>
                            <S.DetailValue>{currentDetail.filteredWord}</S.DetailValue>
                        </S.DetailItem>

                        <S.DetailItem>
                            <S.DetailLabel>조치 일시</S.DetailLabel>
                            <S.DetailValue>
                                {`${formatDate(currentDetail.createdAt)} ${formatTime(currentDetail.createdAt)}`}
                            </S.DetailValue>
                        </S.DetailItem>

                        {/* 페이지 인디케이터: 현재 보고 있는 항목 위치 표시 */}
                        <S.PageIndicator>
                            {badwordLogs.map((_, index) => (
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