import React from "react";
import { S } from "./style";
import ProfileFixIcon from "./profilefixicon.svg";

/**
 * 프로필 수정 컴포넌트
 * 사용자가 프로필 이미지와 닉네임을 수정할 수 있는 페이지 컴포넌트입니다.
 * - 프로필 이미지 변경: 이미지 클릭 시 파일 선택 가능
 * - 닉네임 변경: 입력 필드에 2-10자 이내 입력 (유효성 검증 적용)
 * - 수정 완료: 버튼 클릭 시 변경사항 저장
 * - 회원 탈퇴: 링크 클릭 시 탈퇴 프로세스 진행
 */
const ProfileFix = ({
                      nickname,
                      profileImage,
                      isLoading,
                      nicknameError,
                      isSubmitting,
                      showWithdrawalConfirm,
                      imageUploadStatus,
                      fileInputRef,
                      onNicknameChange,
                      onImageClick,
                      onFileChange,
                      onSubmit,
                      onWithdrawalClick,
                      onWithdrawalConfirm,
                      onWithdrawalCancel
                    }) => {
  return (
      <S.PageWrapper>
        <S.FrameWrapper>
          <S.ProfileCard>
            {/* 프로필 수정 페이지 헤더 */}
            <S.HeaderArea>
              <S.HeaderText>프로필 수정</S.HeaderText>
            </S.HeaderArea>

            {/* 프로필 이미지 영역 - 클릭하면 이미지 업로드 가능 */}
            <S.ProfileImageArea onClick={onImageClick}>
              {isLoading ? (
                  // 로딩 중 표시
                  <S.LoadingContainer>
                    로딩 중...
                  </S.LoadingContainer>
              ) : (
                  // 이미지 표시 (profileImage가 없으면 기본 이미지 사용)
                  <img
                      src={profileImage || ProfileFixIcon}
                      alt="Profile"
                      onError={(e) => {
                        console.log('이미지 로드 오류 발생:', e.target.src);
                        e.target.src = ProfileFixIcon;
                        console.log('기본 이미지로 대체됨');
                      }}
                  />
              )}
              {/* 숨겨진 파일 입력 - 이미지 선택 다이얼로그용 */}
              <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileChange}
                  accept="image/jpeg,image/png"
                  style={{ display: 'none' }}
              />
              {/* 카메라 아이콘 추가 */}
              <S.CameraIconWrapper>
                <div className="camera-icon">📷</div>
              </S.CameraIconWrapper>
            </S.ProfileImageArea>

            {/* 이미지 업로드 상태 메시지 */}
            {imageUploadStatus && (
                <S.ImageUploadStatus isError={imageUploadStatus.includes('실패')}>
                  {imageUploadStatus}
                </S.ImageUploadStatus>
            )}

            {/* 닉네임 입력 필드 - 2~10자 제한 */}
            <S.NicknameField>
              <S.InputBox
                  type="text"
                  value={nickname}
                  onChange={onNicknameChange}
                  maxLength={10}
                  placeholder="2-10자 이내"
                  onBlur={onNicknameChange}
              />
            </S.NicknameField>

            {/* 오류 메시지 영역 - 닉네임 필드와 수정 완료 버튼 사이 */}
            {nicknameError && (
                <S.ErrorMessage>
                  {nicknameError}
                </S.ErrorMessage>
            )}

            {/* 수정 완료 버튼 - 클릭 이벤트 구현 */}
            <S.SubmitButton
                onClick={onSubmit}
                disabled={isSubmitting}
            >
              <S.ButtonText>
                {isSubmitting ? '처리 중...' : '수정 완료'}
              </S.ButtonText>
            </S.SubmitButton>

            {/* 회원 탈퇴 영역 - 클릭 이벤트 구현 */}
            <S.WithdrawalArea onClick={onWithdrawalClick}>
              <S.WithdrawalText>회원 탈퇴</S.WithdrawalText>
            </S.WithdrawalArea>

            {/* 회원 탈퇴 확인 모달 */}
            {showWithdrawalConfirm && (
                <S.ModalOverlay>
                  <S.ModalContainer>
                    <S.ModalTitle>회원 탈퇴 확인</S.ModalTitle>
                    <S.ModalContent>정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.</S.ModalContent>
                    <S.ModalButtonContainer>
                      <S.ModalCancelButton onClick={onWithdrawalCancel}>
                        취소
                      </S.ModalCancelButton>
                      <S.ModalConfirmButton onClick={onWithdrawalConfirm}>
                        탈퇴하기
                      </S.ModalConfirmButton>
                    </S.ModalButtonContainer>
                  </S.ModalContainer>
                </S.ModalOverlay>
            )}
          </S.ProfileCard>
        </S.FrameWrapper>
      </S.PageWrapper>
  );
};

export default ProfileFix;