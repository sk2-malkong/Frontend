import React, { useState, useEffect } from "react";
import S from "./style";
// SVG 아이콘 직접 임포트
import { ReactComponent as DownArrrowIcon } from './downarrrow_btn.svg';

/**
 * 운영원칙 위반 안내 내역 컴포넌트
 * @returns {JSX.Element} 운영원칙 위반 안내 화면
 */
const LimitationLog = () => {
    // 상세 정보 표시 여부 상태
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    // 카드 높이 조절을 위한 상태
    const [cardHeight, setCardHeight] = useState("230px");

    // 상세 정보 표시 상태가 변경될 때 카드 높이 조절
    useEffect(() => {
        if (isDetailOpen) {
            setCardHeight("594px");
        } else {
            setCardHeight("230px");
        }
    }, [isDetailOpen]);

    // 상세 정보 표시 상태 토글 함수
    const toggleDetail = () => {
        setIsDetailOpen(!isDetailOpen);
        console.log("상세 정보 토글:", !isDetailOpen); // 디버깅용 로그
    };

    return (
        <S.Container>
            <S.Card $height={cardHeight}>
                <S.Title>운영원칙 위반 안내 내역</S.Title>
                <S.Divider />

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
                            <S.TimeText>25.04.11</S.TimeText>
                            <S.TimeText>14:00</S.TimeText>
                        </S.TimeContainer>
                    </S.LabelContainer>
                </S.DetailContainer>

                <S.ArrowButton
                    onClick={toggleDetail}
                    $isOpen={isDetailOpen} // $ 접두사로 DOM에 전달되지 않는 props 설정
                    aria-label={isDetailOpen ? "상세 정보 닫기" : "상세 정보 열기"} // 접근성 향상
                >
                    <S.ArrowIconWrapper $isOpen={isDetailOpen}>
                        <DownArrrowIcon />
                    </S.ArrowIconWrapper>
                </S.ArrowButton>

                {isDetailOpen && (
                    <S.DetailView>
                        <S.NavigationButton $direction="prev">
                            <S.NavigationIcon $direction="prev" />
                        </S.NavigationButton>
                        <S.NavigationButton $direction="next">
                            <S.NavigationIcon $direction="next" />
                        </S.NavigationButton>

                        <S.DetailItem>
                            <S.DetailLabel>욕설</S.DetailLabel>
                            <S.DetailValue>좆같다</S.DetailValue>
                        </S.DetailItem>

                        <S.DetailItem>
                            <S.DetailLabel>대체어</S.DetailLabel>
                            <S.DetailValue>힘들다</S.DetailValue>
                        </S.DetailItem>

                        <S.DetailItem>
                            <S.DetailLabel>뜻</S.DetailLabel>
                            <S.DetailDescription>남성의 성기를 지칭하는 좆과 '-같아'가 합쳐진 욕설</S.DetailDescription>
                        </S.DetailItem>

                        <S.DetailItem>
                            <S.DetailLabel>조치 일시</S.DetailLabel>
                            <S.DetailValue>25.04.09 14:06</S.DetailValue>
                        </S.DetailItem>
                    </S.DetailView>
                )}
            </S.Card>
        </S.Container>
    );
};

export default LimitationLog;