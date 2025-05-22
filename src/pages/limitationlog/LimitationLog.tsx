import React, { useState, useEffect } from "react";
import S from "./style";
// SVG 아이콘 임포트
import { ReactComponent as DownArrowIcon } from './downarrrow_btn.svg';
import { ReactComponent as RightArrowIcon } from './R-arrow.svg';
import { ReactComponent as LeftArrowIcon } from './L-arrow.svg';

// 욕설 로그 항목 타입 정의
interface BadwordLog {
    originalWord: string;
    filteredWord: string;
    createdAt: string;
}

// 컴포넌트 Props 타입 정의
interface LimitationLogProps {
    badwordLogs: BadwordLog[];
    startDate: string;
    endDate: string;
    isActive: boolean;
    formatDate: (dateString: string) => string;
    formatTime: (dateString: string) => string;
}

const LimitationLog: React.FC<LimitationLogProps> = ({
    badwordLogs,
    startDate,
    endDate,
    isActive,
    formatDate,
    formatTime
}) => {
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
    const [cardHeight, setCardHeight] = useState<string>("14.375rem");
    const [currentDetailIndex, setCurrentDetailIndex] = useState<number>(0);

    useEffect(() => {
        if (isDetailOpen) {
            setCardHeight("37.125rem");
        } else {
            setCardHeight("14.375rem");
        }
    }, [isDetailOpen]);

    const toggleDetail = () => {
        setIsDetailOpen(prev => !prev);
        if (isDetailOpen) {
            setCurrentDetailIndex(0);
        }
    };

    const handlePrevDetail = () => {
        setCurrentDetailIndex(prevIndex =>
            prevIndex === 0 ? badwordLogs.length - 1 : prevIndex - 1
        );
    };

    const handleNextDetail = () => {
        setCurrentDetailIndex(prevIndex =>
            prevIndex === badwordLogs.length - 1 ? 0 : prevIndex + 1
        );
    };

    const currentDetail = badwordLogs[currentDetailIndex];

    return (
        <S.Container>
            <S.Card $height={cardHeight}>
                <S.Title>운영원칙 위반 안내 내역</S.Title>
                <S.Divider />

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
