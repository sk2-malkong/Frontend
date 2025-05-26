import styled from "styled-components";

// 색상 상수
const COLORS = {
  primary: '#1A1A1A',
  secondary: '#A6A6A6',
  tertiary: '#777777',
  error: '#F91F15',
  white: '#FFFFFF'
};

// 폰트 상수
const FONTS = {
  regular: {
    family: 'Pretendard, sans-serif',
    weight: 400
  },
  semiBold: {
    family: 'Pretendard, sans-serif',
    weight: 600
  },
  bold: {
    family: 'Pretendard, sans-serif',
    weight: 700
  }
};

// prop 타입 정의
interface CardProps {
  $height?: string;
}

interface ArrowIconWrapperProps {
  $isOpen?: boolean;
  $isNavigation?: boolean;
}

interface NavigationButtonProps {
  $direction: 'prev' | 'next';
}

interface NavigationIconProps {
  $direction: 'prev' | 'next';
}

interface PageDotProps {
  $active?: boolean;
}

// 스타일 정의
const S: { [key: string]: any } = {};

S.Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: ${COLORS.white};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.Card = styled.div<CardProps>`
  width: 28.4375rem;
  height: ${props => props.$height || "14.375rem"};
  position: relative;
  background: ${COLORS.white};
  box-shadow: 0.3125rem 0.3125rem 0.8125rem rgba(230, 230, 230, 0.90);
  -webkit-box-shadow: 0.3125rem 0.3125rem 0.8125rem rgba(230, 230, 230, 0.90);
  border-radius: 0.625rem;
  padding: 1.25rem;
  transition: height 0.5s ease;
  overflow: hidden;
`;

S.Title = styled.h1`
  color: ${COLORS.primary};
  font-size: 1.5rem;
  font-family: ${FONTS.bold.family};
  font-weight: ${FONTS.bold.weight};
  word-wrap: break-word;
  margin: 0 0 1.25rem 0;
`;

S.Divider = styled.div`
  width: 100%;
  height: 0.0625rem;
  background-color: ${COLORS.secondary};
  margin: 1.25rem 0;
`;

S.DetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 1.25rem;
`;

S.LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;
`;

S.Label = styled.span`
  color: ${COLORS.secondary};
  font-size: 1.25rem;
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  word-wrap: break-word;
  width: 6.25rem;
  display: inline-block;
`;

S.ReasonText = styled.span`
  color: ${COLORS.error};
  font-size: 1rem;
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  word-wrap: break-word;
`;

S.TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

S.TimeText = styled.span`
  color: ${COLORS.primary};
  font-size: 1rem;
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  line-height: 1.192rem;
  word-wrap: break-word;
`;

S.Separator = styled.span`
  color: ${COLORS.primary};
  font-size: 1rem;
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  line-height: 1.192rem;
  word-wrap: break-word;
`;

S.ArrowButton = styled.button`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 0.125rem solid ${COLORS.secondary};
    outline-offset: 0.125rem;
  }
`;

S.ArrowIconWrapper = styled.div<ArrowIconWrapperProps>`
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  -webkit-transition: transform 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  -webkit-transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: ${props => props.$isNavigation ? '2rem' : '1.5rem'};
    height: ${props => props.$isNavigation ? '2rem' : '1.5rem'};
  }
`;

S.DetailView = styled.div`
  width: 100%;
  position: relative;
  padding: 1.25rem 0;
  margin-top: 1.25rem;
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  border-top: 0.0625rem solid ${COLORS.secondary};
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-0.625rem);
      -webkit-transform: translateY(-0.625rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      -webkit-transform: translateY(0);
    }
  }
`;

S.DetailItem = styled.div`
  margin-bottom: 0.9375rem;
  width: 100%;
  box-sizing: border-box;
`;

S.DetailLabel = styled.span`
  color: ${COLORS.tertiary};
  font-size: 1.25rem;
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  line-height: 1.25rem;
  word-wrap: break-word;
  display: block;
  margin-bottom: 0.3125rem;
`;

S.DetailValue = styled.span`
  color: ${COLORS.primary};
  font-size: 1.25rem;
  font-family: ${FONTS.regular.family};
  font-weight: ${FONTS.regular.weight};
  line-height: 1.25rem;
  word-wrap: break-word;
`;

S.DetailDescription = styled.span`
  color: ${COLORS.primary};
  font-size: 1.25rem;
  font-family: ${FONTS.regular.family};
  font-weight: ${FONTS.regular.weight};
  line-height: 1.875rem;
  word-wrap: break-word;
`;

S.NavigationButton = styled.button<NavigationButtonProps>`
  width: 2.75rem;
  height: 2.75rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  ${props => props.$direction === 'prev' ? 'left: 0;' : 'right: 0;'}
  background: transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 0.125rem solid ${COLORS.secondary};
    outline-offset: 0.125rem;
  }
`;

S.NavigationIcon = styled.div<NavigationIconProps>`
  width: 0.992rem;
  height: 1.638rem;
  position: absolute;
  left: ${props => props.$direction === 'prev' ? '0.859rem' : '0.899rem'};
  top: 0.556rem;
  background: ${COLORS.primary};
  clip-path: polygon(0 0, 100% 50%, 0 100%);
`;

S.PageIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
`;

S.PageDot = styled.div<PageDotProps>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${props => props.$active ? COLORS.primary : COLORS.secondary};
  transition: background-color 0.3s ease;
  -webkit-transition: background-color 0.3s ease;
`;

S.PageNavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
  width: 100%;
`;

S.PageText = styled.span`
  color: ${COLORS.tertiary};
  font-size: 1rem;
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  line-height: 1.25rem;
  word-wrap: break-word;
`;

S.EmptyMessage = styled.div`
  color: #111111;
  font-size: 2.25rem;
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  text-align: center;
  padding: 5rem;
  background: ${COLORS.white};
`;

export default S;
