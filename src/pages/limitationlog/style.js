import styled from "styled-components";

const S = {};

// 전체 페이지 컨테이너
S.Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 카드 컨테이너
S.Card = styled.div`
  width: 28.4375rem; /* 455px */
  height: ${props => props.$height || "14.375rem"}; /* 230px */
  position: relative;
  background: white;
  box-shadow: 0.3125rem 0.3125rem 0.8125rem rgba(230, 230, 230, 0.90); /* 5px 5px 13px */
  border-radius: 0.625rem; /* 10px */
  padding: 1.25rem; /* 20px */
  transition: height 0.5s ease;
  overflow: hidden;
`;

// 제목 텍스트
S.Title = styled.h1`
  color: #1A1A1A;
  font-size: 1.5rem; /* 24px */
  font-family: Pretendard, sans-serif;
  font-weight: 700;
  word-wrap: break-word;
  margin: 0 0 1.25rem 0; /* 0 0 20px 0 */
`;

// 구분선
S.Divider = styled.div`
  width: 100%;
  height: 0.0625rem; /* 1px */
  background-color: #A6A6A6;
  margin: 1.25rem 0; /* 20px 0 */
`;

// 상세 정보 컨테이너
S.DetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem; /* 10px */
  margin-top: 1.25rem; /* 20px */
`;

// 라벨 컨테이너
S.LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem; /* 10px */
`;

// 라벨 텍스트
S.Label = styled.span`
  color: #A6A6A6;
  font-size: 1.25rem; /* 20px */
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  word-wrap: break-word;
  width: 6.25rem; /* 100px */
  display: inline-block;
`;

// 사유 텍스트
S.ReasonText = styled.span`
  color: #F91F15;
  font-size: 1rem; /* 16px */
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  word-wrap: break-word;
`;

// 시간 컨테이너
S.TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem; /* 4px */
`;

// 시간 텍스트
S.TimeText = styled.span`
  color: #1A1A1A;
  font-size: 1rem; /* 16px */
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  line-height: 1.192rem; /* 19.07px */
  word-wrap: break-word;
`;

// 구분자
S.Separator = styled.span`
  color: #1A1A1A;
  font-size: 1rem; /* 16px */
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  line-height: 1.192rem; /* 19.07px */
  word-wrap: break-word;
`;

// 화살표 버튼
S.ArrowButton = styled.button`
  width: 2rem; /* 32px */
  height: 2rem; /* 32px */
  position: absolute;
  right: 1.25rem; /* 20px */
  bottom: 1.25rem; /* 20px */
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
`;

// 화살표 아이콘 래퍼
S.ArrowIconWrapper = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 1.5rem; /* 24px */
    height: 1.5rem; /* 24px */
  }
`;

// 상세 보기 컨테이너
S.DetailView = styled.div`
  width: 100%;
  position: relative;
  padding: 1.25rem 0; /* 20px 0 */
  margin-top: 1.25rem; /* 20px */
  border-top: 0.0625rem solid #A6A6A6; /* 1px */
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-0.625rem); /* -10px */
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// 상세 항목
S.DetailItem = styled.div`
  margin-bottom: 0.9375rem; /* 15px */
`;

// 상세 라벨
S.DetailLabel = styled.span`
  color: #777777;
  font-size: 1.25rem; /* 20px */
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  line-height: 1.25rem; /* 20px */
  word-wrap: break-word;
  display: block;
  margin-bottom: 0.3125rem; /* 5px */
`;

// 상세 값
S.DetailValue = styled.span`
    color: black;
    font-size: 1.25rem; /* 20px */
    font-family: Pretendard, sans-serif;
    font-weight: 400;
    line-height: 1.25rem; /* 20px */
    word-wrap: break-word;
`;

// 상세 설명
S.DetailDescription = styled.span`
    color: black;
    font-size: 1.25rem; /* 20px */
    font-family: Pretendard, sans-serif;
    font-weight: 400;
    line-height: 1.875rem; /* 30px */
    word-wrap: break-word;
`;

// 네비게이션 버튼
S.NavigationButton = styled.button`
    width: 2.75rem; /* 44px */
    height: 2.75rem; /* 44px */
    position: absolute;
    top: 1.25rem; /* 20px */
    ${props => props.$direction === 'prev' ? 'left: 0;' : 'right: 0;'}
    transform: ${props => props.$direction === 'prev' ? 'rotate(180deg)' : 'rotate(0deg)'};
    background: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;
`;

// 네비게이션 아이콘
S.NavigationIcon = styled.div`
    width: 0.992rem; /* 15.87px */
    height: 1.638rem; /* 26.21px */
    position: absolute;
    left: ${props => props.$direction === 'prev' ? '0.859rem' : '0.899rem'}; /* 13.75px or 14.38px */
    top: 0.556rem; /* 8.9px */
    background: black;
    clip-path: polygon(0 0, 100% 50%, 0 100%);
`;

export default S;