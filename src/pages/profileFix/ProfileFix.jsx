import React, { useState, useRef } from "react";
import { S } from "./style";
import ProfileFixIcon from "./profilefixicon.svg";

const ProfileFix = () => {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState(ProfileFixIcon);
  const fileInputRef = useRef(null);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 이미지 클릭 시 파일 선택 창 열기
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 시 처리
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <S.PageWrapper>
        <S.FrameWrapper>
          <S.ProfileCard>
            {/* 프로필 수정 페이지 헤더 */}
            <S.HeaderArea>
              <S.HeaderText>프로필 수정</S.HeaderText>
            </S.HeaderArea>

            {/* 프로필 이미지 영역 */}
            <S.ProfileImageArea onClick={handleImageClick}>
              <img src={profileImage} alt="Profile" />
              {/* 숨겨진 파일 입력 */}
              <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
              />
            </S.ProfileImageArea>

            {/* 닉네임 입력 필드 - 2~10자 제한 */}
            <S.NicknameField>
              <S.InputBox
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  maxLength={10}
                  placeholder="2-10자 이내"
              />
            </S.NicknameField>

            {/* 수정 완료 버튼 */}
            <S.SubmitButton>
              <S.ButtonText>수정 완료</S.ButtonText>
            </S.SubmitButton>

            {/* 회원 탈퇴 영역 */}
            <S.WithdrawalArea>
              <S.WithdrawalText>회원 탈퇴</S.WithdrawalText>
            </S.WithdrawalArea>
          </S.ProfileCard>
        </S.FrameWrapper>
      </S.PageWrapper>
  );
};

export default ProfileFix;