import styled from "styled-components";

const S = {};

// 컨테이너 스타일
S.Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
`;

// 헤더 스타일
S.Header = styled.header`
  background-color: #4a7dff;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

S.Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

S.LogoIcon = styled.img`
  width: 24px;
  height: 24px;
`;

S.LogoText = styled.h1`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

// 메인 콘텐츠 스타일
S.MainContent = styled.main`
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 프로필 섹션 스타일
S.ProfileSection = styled.section`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

S.ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

S.Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

S.ProfileEditButton = styled.button`
  background-color: #4a7dff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
`;

S.ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

S.ProfileImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
`;

S.ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
`;

S.UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

S.UserName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

S.UserEmail = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0;
`;

// 통계 섹션 스타일
S.StatsSection = styled.section`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
`;

S.StatsCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

S.StatsLabel = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0;
  position: absolute;
  top: 40px;
`;

S.StatsNumber = styled.span`
  font-size: 42px;
  font-weight: 700;
  color: #000;
`;

S.StatsUnit = styled.span`
  font-size: 16px;
  color: #777;
  margin-left: 4px;
`;

// 설정 섹션 스타일
S.SettingsSection = styled.section`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

S.SettingsHeader = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

S.SettingsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

S.SettingsItem = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: #4a7dff;
  }
`;

// 푸터 스타일
S.Footer = styled.footer`
  text-align: center;
  padding: 16px;
  color: #999;
  font-size: 14px;
`;

S.FooterText = styled.p`
  margin: 0;
`;

export default S;