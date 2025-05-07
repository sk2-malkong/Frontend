import styled from "styled-components";

// 공통 테마 상수
// 유지보수성을 높이기 위해 색상값을 중앙에서 관리
// 색상 변경 시 여기만 수정하면 전체 적용됨
const COLORS = {
    primary: '#1A1A1A',    // 주요 텍스트 색상
    secondary: '#A6A6A6',  // 보조 텍스트 및 구분선 색상
    tertiary: '#777777',   // 상세 라벨 색상
    error: '#F91F15',      // 경고/에러 색상 (사유 텍스트)
    white: '#FFFFFF'       // 배경 색상
};

// 폰트 스타일 상수화
// 일관된 폰트 적용을 위한 중앙 관리
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

// 스타일 컴포넌트 객체
// S 객체에 모든 스타일 컴포넌트를 담아 관리
const S = {};

// 전체 페이지 컨테이너
// 화면 중앙에 카드를 배치하기 위한 컨테이너
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

// 카드 컨테이너
// 메인 컨텐츠를 담는 카드 형태의 컨테이너
// $height prop으로 높이가 동적으로 변경됨
S.Card = styled.div`
  width: 28.4375rem; /* 455px */
  height: ${props => props.$height || "14.375rem"}; /* 230px */
  position: relative;
  background: ${COLORS.white};
  box-shadow: 0.3125rem 0.3125rem 0.8125rem rgba(230, 230, 230, 0.90); /* 5px 5px 13px */
  -webkit-box-shadow: 0.3125rem 0.3125rem 0.8125rem rgba(230, 230, 230, 0.90);
  border-radius: 0.625rem; /* 10px */
  padding: 1.25rem; /* 20px */
  transition: height 0.5s ease; /* 높이 변경 시 애니메이션 효과 */
  overflow: hidden;
`;

// 제목 텍스트
// 카드 상단 제목 스타일
S.Title = styled.h1`
  color: ${COLORS.primary};
  font-size: 1.5rem; /* 24px */
  font-family: ${FONTS.bold.family};
  font-weight: ${FONTS.bold.weight};
  word-wrap: break-word;
  margin: 0 0 1.25rem 0; /* 0 0 20px 0 */
`;

// 구분선
// 제목과 내용 사이의 구분선
S.Divider = styled.div`
    width: 100%;
    height: 0.0625rem; /* 1px */
    background-color: ${COLORS.secondary};
    margin: 1.25rem 0; /* 20px 0 */
`;

// 상세 정보 컨테이너
// 기본 정보(조치 사유, 제한 일시)를 담는 컨테이너
S.DetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem; /* 10px */
  margin-top: 1.25rem; /* 20px */
`;

// 라벨 컨테이너
// 라벨과 값을 가로로 배치하는 컨테이너
S.LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem; /* 10px */
`;

// 라벨 텍스트
// "조치 사유", "제한 일시" 등의 라벨 스타일
S.Label = styled.span`
  color: ${COLORS.secondary};
  font-size: 1.25rem; /* 20px */
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  word-wrap: break-word;
  width: 6.25rem; /* 100px */
  display: inline-block;
`;

// 사유 텍스트
// 위반 사유 텍스트 (빨간색 강조)
S.ReasonText = styled.span`
  color: ${COLORS.error};
  font-size: 1rem; /* 16px */
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  word-wrap: break-word;
`;

// 시간 컨테이너
// 제한 일시 정보를 담는 컨테이너
S.TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem; /* 4px */
`;

// 시간 텍스트
// 날짜 및 시간 텍스트 스타일
S.TimeText = styled.span`
  color: ${COLORS.primary};
  font-size: 1rem; /* 16px */
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  line-height: 1.192rem; /* 19.07px */
  word-wrap: break-word;
`;

// 구분자
// 시간 사이의 ~ 구분자 스타일
S.Separator = styled.span`
  color: ${COLORS.primary};
  font-size: 1rem; /* 16px */
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  line-height: 1.192rem; /* 19.07px */
  word-wrap: break-word;
`;

// 화살표 버튼
// 상세 정보 토글 버튼
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
  
  /* 호버 효과 - 사용자 인터랙션 피드백 */
  &:hover {
    opacity: 0.8;
  }
  
  /* 포커스 효과 - 접근성 향상 */
  &:focus {
    outline: 0.125rem solid ${COLORS.secondary};
    outline-offset: 0.125rem;
  }
`;

// 화살표 아이콘 래퍼
// SVG 아이콘을 감싸는 컨테이너
// $isOpen 또는 $isNavigation prop에 따라 스타일 변경
S.ArrowIconWrapper = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  -webkit-transition: transform 0.3s ease;
  /* $isOpen이 true면 아이콘을 180도 회전시켜 방향 변경 */
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  -webkit-transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* 내부 SVG 아이콘 스타일 */
  svg {
    /* 네비게이션 버튼인 경우 더 큰 아이콘 사이즈 적용 */
    width: ${props => props.$isNavigation ? '2rem' : '1.5rem'}; /* 32px or 24px */
    height: ${props => props.$isNavigation ? '2rem' : '1.5rem'}; /* 32px or 24px */
  }
`;

// 상세 보기 컨테이너
// 상세 정보를 담는 컨테이너
// isDetailOpen이 true일 때만 표시됨
S.DetailView = styled.div`
  width: 100%;
  position: relative;
  padding: 1.25rem 0; /* 20px 0 */
  margin-top: 1.25rem; /* 20px */
  padding-left: 3.5rem; /* 56px - 네비게이션 버튼 공간 확보 */
  padding-right: 3.5rem; /* 56px - 네비게이션 버튼 공간 확보 */
  border-top: 0.0625rem solid ${COLORS.secondary}; /* 1px */
  /* 표시될 때 페이드인 애니메이션 효과 */
  animation: fadeIn 0.5s ease;
  
  /* 페이드인 애니메이션 정의 */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-0.625rem); /* -10px */
      -webkit-transform: translateY(-0.625rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      -webkit-transform: translateY(0);
    }
  }
`;

// 상세 항목
// 각 상세 정보 항목(욕설, 대체어 등)을 담는 컨테이너
S.DetailItem = styled.div`
  margin-bottom: 0.9375rem; /* 15px */
  width: 100%;
  box-sizing: border-box;
`;

// 상세 라벨
// 상세 정보의 라벨 텍스트 스타일
S.DetailLabel = styled.span`
  color: ${COLORS.tertiary};
  font-size: 1.25rem; /* 20px */
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  line-height: 1.25rem; /* 20px */
  word-wrap: break-word;
  display: block;
  margin-bottom: 0.3125rem; /* 5px */
`;

// 상세 값
// 상세 정보의 값 텍스트 스타일
S.DetailValue = styled.span`
  color: ${COLORS.primary};
  font-size: 1.25rem; /* 20px */
  font-family: ${FONTS.regular.family};
  font-weight: ${FONTS.regular.weight};
  line-height: 1.25rem; /* 20px */
  word-wrap: break-word;
`;

// 상세 설명
// 상세 정보의 설명 텍스트 스타일 (긴 텍스트용)
S.DetailDescription = styled.span`
  color: ${COLORS.primary};
  font-size: 1.25rem; /* 20px */
  font-family: ${FONTS.regular.family};
  font-weight: ${FONTS.regular.weight};
  line-height: 1.875rem; /* 30px */
  word-wrap: break-word;
`;

// 네비게이션 버튼
// 이전/다음 상세 정보로 이동하는 버튼
// $direction prop으로 좌/우 위치 결정
S.NavigationButton = styled.button`
  width: 2.75rem; /* 44px */
  height: 2.75rem; /* 44px */
  position: absolute;
  top: 50%; /* 중앙 정렬을 위해 50%로 변경 */
  transform: translateY(-50%); /* 중앙 정렬을 위한 추가 */
  -webkit-transform: translateY(-50%);
  /* 방향에 따라 좌/우 위치 결정 */
  ${props => props.$direction === 'prev' ? 'left: 0;' : 'right: 0;'}
  background: transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* 겹침 방지를 위한 z-index 추가 */
  
  /* 호버 효과 */
  &:hover {
    opacity: 0.8;
  }
  
  /* 포커스 효과 - 접근성 향상 */
  &:focus {
    outline: 0.125rem solid ${COLORS.secondary};
    outline-offset: 0.125rem;
  }
`;

// 네비게이션 아이콘 (SVG 아이콘으로 대체되었으나 구현을 위해 보존)
// 주: 현재는 SVG를 사용하지만, SVG가 로드되지 않을 경우를 대비한 폴백 스타일
S.NavigationIcon = styled.div`
  width: 0.992rem; /* 15.87px */
  height: 1.638rem; /* 26.21px */
  position: absolute;
  left: ${props => props.$direction === 'prev' ? '0.859rem' : '0.899rem'}; /* 13.75px or 14.38px */
  top: 0.556rem; /* 8.9px */
  background: ${COLORS.primary};
  clip-path: polygon(0 0, 100% 50%, 0 100%);
`;

// 페이지 인디케이터
// 현재 보고 있는 상세 정보의 위치를 표시하는 닷 컨테이너
S.PageIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem; /* 8px */
  margin-top: 1.25rem; /* 20px */
`;

// 페이지 닷
// 인디케이터의 각 닷 스타일
// $active prop으로 현재 페이지 강조
S.PageDot = styled.div`
    width: 0.5rem; /* 8px */
    height: 0.5rem; /* 8px */
    border-radius: 50%;
    /* 현재 페이지인 경우 짙은 색상, 아닌 경우 옅은 색상 */
    background-color: ${props => props.$active ? COLORS.primary : COLORS.secondary};
    transition: background-color 0.3s ease;
    -webkit-transition: background-color 0.3s ease;
`;

// 페이지 네비게이션 컨테이너
// 5개 단위 페이지 간 이동을 위한 컨트롤 영역
S.PageNavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem; /* 10px */
  margin-bottom: 1.25rem; /* 20px */
  width: 100%;
`;

// 페이지 정보 텍스트
// 현재 페이지 및 전체 페이지 표시
S.PageText = styled.span`
  color: ${COLORS.tertiary};
  font-size: 1rem; /* 16px */
  font-family: ${FONTS.semiBold.family};
  font-weight: ${FONTS.semiBold.weight};
  line-height: 1.25rem; /* 20px */
  word-wrap: break-word;
`;

export default S;