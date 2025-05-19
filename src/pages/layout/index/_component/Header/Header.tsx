import React from 'react';
import S from "./styles"; // Import Header-specific styles

/**
 * Header 컴포넌트 - 페이지 상단 헤더 영역
 * 로고와 API 키 신청 버튼을 포함
 */
interface HeaderProps {
    openPopup: () => void;
}

const Header: React.FC<HeaderProps> = ({ openPopup }) => (
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

export default Header;