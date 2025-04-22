import React, { useEffect, useState } from "react";
import S from "./style";
import userApi from '../api/userApi';

const MyPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 로딩 함수
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('프로필 데이터 요청 시작...');

        const profileData = await userApi.getProfile();
        console.log('API에서 받아온 프로필 데이터:', profileData);

        // 데이터를 받았으면 상태 업데이트
        setUserProfile({
          username: profileData.username,
          email: profileData.email,
          profileImage: profileData.profileImage
        });

        // 받은 데이터를 로컬 스토리지에도 저장
        localStorage.setItem('username', profileData.username || '');
        localStorage.setItem('email', profileData.email || '');

        setLoading(false);
      } catch (err) {
        console.error('프로필 로딩 중 오류:', err);
        setError('프로필을 불러오는데 실패했습니다: ' + err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 디버깅용 콘솔 로그
  console.log('현재 컴포넌트 상태:', { loading, error, userProfile });

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  // 간략화된 참조 방식
  const username = userProfile?.username || '사용자';
  const email = userProfile?.email || 'email@example.com';

  return (
      <S.DivWrapper>
        <S.MainDiv>
          <S.Link />

          <S.TopSection>
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
                  {userProfile?.profileImage ? (
                      <img
                          src={userProfile.profileImage}
                          alt="프로필 이미지"
                          style={{width: '100%', height: '100%', borderRadius: '50%'}}
                      />
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 150 151" fill="none">
                        <path d="M150 75.5C150 116.921 116.421 150.5 75 150.5C33.5786 150.5 0 116.921 0 75.5C0 34.0786 33.5786 0.5 75 0.5C116.421 0.5 150 34.0786 150 75.5Z" fill="#D9D9D9"/>
                        <path d="M27.6922 133.701C31.7509 113.727 51.3876 98.5769 75 98.5769C98.6124 98.5769 118.249 113.727 122.308 133.701C109.402 144.204 92.9364 150.5 75 150.5C57.0636 150.5 40.5978 144.204 27.6922 133.701Z" fill="white"/>
                        <path d="M98.0769 65.4038C98.0769 78.4144 87.5298 88.9615 74.5192 88.9615C61.5087 88.9615 50.9615 78.4144 50.9615 65.4038C50.9615 52.3933 61.5087 41.8462 74.5192 41.8462C87.5298 41.8462 98.0769 52.3933 98.0769 65.4038Z" fill="white"/>
                      </svg>
                  )}
                </S.ProfileImageContainer>
                <S.Frame9>
                  <S.UsernameText>{username}</S.UsernameText>
                  <S.EmailText>{email}</S.EmailText>
                </S.Frame9>
              </S.FrameWrapper>
            </S.ProfileFrame>

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

          <S.LogoutFrame>
            <S.LogoutText>로그아웃</S.LogoutText>
          </S.LogoutFrame>
        </S.MainDiv>
      </S.DivWrapper>
  );
};

export default MyPage;