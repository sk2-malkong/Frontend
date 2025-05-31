import React from "react";
import S from "./style";
import ProfileFixIcon from "./profilefixicon.svg";

/**
 * ProfileFix 컴포넌트의 props 타입 정의
 */
export interface ProfileFixProps {
    nickname: string;
    isLoading: boolean;
    nicknameError: string;
    isSubmitting: boolean;
    showWithdrawalConfirm: boolean;
    withdrawalPassword: string;  // 회원 탈퇴 시 사용할 비밀번호 상태
    onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    onWithdrawalClick: () => void;
    onWithdrawalConfirm: () => void;
    onWithdrawalCancel: () => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // 비밀번호 입력 핸들러
}

/**
 * 프로필 수정 컴포넌트
 * 사용자가 닉네임을 수정할 수 있는 페이지 컴포넌트입니다.
 * - 프로필 이미지: 기본 이미지로 고정 표시
 * - 닉네임 변경: 입력 필드에 2-10자 이내 입력 (유효성 검증 적용)
 * - 수정 완료: 버튼 클릭 시 변경사항 저장
 * - 회원 탈퇴: 링크 클릭 시 탈퇴 프로세스 진행
 */
const ProfileFix: React.FC<ProfileFixProps> = ({
                                                   nickname,
                                                   isLoading,
                                                   nicknameError,
                                                   isSubmitting,
                                                   showWithdrawalConfirm,
                                                   withdrawalPassword,
                                                   onNicknameChange,
                                                   onSubmit,
                                                   onWithdrawalClick,
                                                   onWithdrawalConfirm,
                                                   onWithdrawalCancel,
                                                   onPasswordChange
                                               }) => {
    return (
        <S.PageWrapper>
            <S.FrameWrapper>
                <S.ProfileCard>
                    {/* 프로필 수정 페이지 헤더 */}
                    <S.HeaderArea>
                        <S.HeaderText>프로필 수정</S.HeaderText>
                    </S.HeaderArea>

                    {/* 프로필 이미지 영역 - 기본 이미지만 표시 */}
                    <S.ProfileImageArea>
                        {isLoading ? (
                            // 로딩 중 표시
                            <S.LoadingContainer>
                                로딩 중...
                            </S.LoadingContainer>
                        ) : (
                            // 기본 이미지만 표시
                            <img
                                src={ProfileFixIcon}
                                alt="Profile"
                            />
                        )}
                    </S.ProfileImageArea>

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
                                <S.ModalContent>
                                    정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                                </S.ModalContent>

                                {/* 비밀번호 입력 필드 추가 */}
                                <S.PasswordInput
                                    type="password"
                                    placeholder="비밀번호를 입력하세요"
                                    value={withdrawalPassword}
                                    onChange={onPasswordChange}
                                />

                                <S.ModalButtonContainer>
                                    <S.ModalCancelButton onClick={onWithdrawalCancel}>
                                        취소
                                    </S.ModalCancelButton>
                                    <S.ModalConfirmButton
                                        onClick={onWithdrawalConfirm}
                                        disabled={isSubmitting || withdrawalPassword.length === 0}
                                    >
                                        {isSubmitting ? '처리 중...' : '탈퇴하기'}
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