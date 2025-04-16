import React, { useEffect } from "react";
import S from "./style";

const MyPage = () => {
  // 화면 크기 변경 감지를 위한 useEffect
  useEffect(() => {
    // 초기 렌더링 및 화면 크기 변경 시 레이아웃 조정을 위한 코드
    const handleResize = () => {
      // 필요한 경우 여기에 추가 레이아웃 로직 작성
    };

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
    
    // 컴포넌트 마운트 시 한 번 실행
    handleResize();
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <S.DivWrapper>
      <S.MainDiv>
        <S.Link />
        
        {/* 상단 섹션 (프로필 + 뱃지) */}
        <S.TopSection>
          {/* 사용자 프로필 섹션 */}
          <S.ProfileFrame>
            <S.ProfileHeader>
              <S.MyInfoWrapper>
                <S.MyInfoText>내 정보</S.MyInfoText>
              </S.MyInfoWrapper>
              <S.EditProfileButton>
                <S.EditProfileText>프로필 수정</S.EditProfileText>
              </S.EditProfileButton>
            </S.ProfileHeader>
            <S.FrameWrapper>
              <S.ProfileImageContainer>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 150 151" fill="none">
                  <path d="M150 75.5C150 116.921 116.421 150.5 75 150.5C33.5786 150.5 0 116.921 0 75.5C0 34.0786 33.5786 0.5 75 0.5C116.421 0.5 150 34.0786 150 75.5Z" fill="#D9D9D9"/>
                  <path d="M27.6922 133.701C31.7509 113.727 51.3876 98.5769 75 98.5769C98.6124 98.5769 118.249 113.727 122.308 133.701C109.402 144.204 92.9364 150.5 75 150.5C57.0636 150.5 40.5978 144.204 27.6922 133.701Z" fill="white"/>
                  <path d="M98.0769 65.4038C98.0769 78.4144 87.5298 88.9615 74.5192 88.9615C61.5087 88.9615 50.9615 78.4144 50.9615 65.4038C50.9615 52.3933 61.5087 41.8462 74.5192 41.8462C87.5298 41.8462 98.0769 52.3933 98.0769 65.4038Z" fill="white"/>
                </svg>
              </S.ProfileImageContainer>
              <S.Frame9>
                <S.UsernameText>동글이</S.UsernameText>
                <S.EmailText>sk_rookies@example.com</S.EmailText>
              </S.Frame9>
            </S.FrameWrapper>
          </S.ProfileFrame>
          
          {/* 비속어 사용 횟수 뱃지 */}
          <S.BadgeWrapper>
            <S.BadgeCircle>
              <S.BadgeContent>
                <S.BadgeTitle>비속어 사용 횟수</S.BadgeTitle>
                <S.BadgeCount>105</S.BadgeCount>
                <S.BadgeUnit>회</S.BadgeUnit>
              </S.BadgeContent>
            </S.BadgeCircle>
          </S.BadgeWrapper>
        </S.TopSection>
        
        {/* 계정 관련 섹션 */}
        <S.AccountFrame>
          <S.AccountTitle>계정</S.AccountTitle>
          <S.GroupWrapper>
            <S.Group>
              <S.Frame2>
                <S.TextWrapper2>작성한 게시글</S.TextWrapper2>
              </S.Frame2>
              <S.Line />
              <S.Frame3>
                <S.TextWrapper2>이용 제한 내역</S.TextWrapper2>
              </S.Frame3>
            </S.Group>
          </S.GroupWrapper>
        </S.AccountFrame>
        
        {/* 로그아웃 버튼 */}
        <S.LogoutFrame>
          <S.LogoutText>로그아웃</S.LogoutText>
        </S.LogoutFrame>
      </S.MainDiv>
    </S.DivWrapper>
  );
};

export default MyPage;