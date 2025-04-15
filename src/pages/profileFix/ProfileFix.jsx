import React from "react";
import { S } from "./style";

const ProfileFix = () => {
  return (
    <S.PageWrapper>
      <S.FrameWrapper>
        <S.ProfileCard>
          {/* 프로필 수정 페이지 헤더 */}
          <S.HeaderArea>
            <S.HeaderText>프로필 수정</S.HeaderText>
          </S.HeaderArea>

          {/* 닉네임 입력 필드 - 2~10자 제한 */}
          <S.NicknameField>
            <S.GuideText>2-10자 이내</S.GuideText>
          </S.NicknameField>

          {/* 수정 완료 버튼 */}
          <S.SubmitButton>
            <S.ButtonText>수정 완료</S.ButtonText>
          </S.SubmitButton>

          {/* 프로필 이미지 영역 */}
          <S.ProfileImageArea>
            {/* 카메라 아이콘 제거됨 */}
          </S.ProfileImageArea>

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