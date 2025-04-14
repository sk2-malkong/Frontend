import React from 'react';
import S from './style';

const MyPage = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Logo>
          <S.LogoIcon src="/images/purgo-icon.png" alt="Purgo Logo" />
          <S.LogoText>Purgo</S.LogoText>
        </S.Logo>
      </S.Header>
      
      <S.MainContent>
        <S.ProfileSection>
          <S.ProfileHeader>
            <S.Title>내 정보</S.Title>
            <S.ProfileEditButton>프로필 수정</S.ProfileEditButton>
          </S.ProfileHeader>
          
          <S.ProfileInfo>
            <S.ProfileImageWrapper>
              <S.ProfileImage />
            </S.ProfileImageWrapper>
            
            <S.UserInfoContainer>
              <S.UserName>동글이</S.UserName>
              <S.UserEmail>sk_rookies@example.com</S.UserEmail>
            </S.UserInfoContainer>
          </S.ProfileInfo>
        </S.ProfileSection>
        
        <S.StatsSection>
          <S.StatsCircle>
            <S.StatsLabel>비슷어 사용 횟수</S.StatsLabel>
            <S.StatsNumber>105</S.StatsNumber>
            <S.StatsUnit>회</S.StatsUnit>
          </S.StatsCircle>
        </S.StatsSection>
        
        <S.SettingsSection>
          <S.SettingsHeader>계정</S.SettingsHeader>
          <S.SettingsList>
            <S.SettingsItem>작성한 게시글</S.SettingsItem>
            <S.SettingsItem>이용 제한 내역</S.SettingsItem>
          </S.SettingsList>
        </S.SettingsSection>
      </S.MainContent>
      
      <S.Footer>
        <S.FooterText>프라이버시</S.FooterText>
      </S.Footer>
    </S.Container>
  );
};

export default MyPage;