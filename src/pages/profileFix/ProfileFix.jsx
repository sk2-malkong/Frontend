import React, { useState, useRef, useEffect } from "react";
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
const ProfileFix = () => {
  // 상태 관리: 닉네임과 프로필 이미지
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const [profileImage, setProfileImage] = useState(ProfileFixIcon); // 프로필 이미지 상태
  const [nicknameError, setNicknameError] = useState(""); // 닉네임 오류 메시지
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 진행 상태
  const [showWithdrawalConfirm, setShowWithdrawalConfirm] = useState(false); // 탈퇴 확인 모달 표시 상태
  const fileInputRef = useRef(null); // 파일 입력 요소 참조

  /**
   * 닉네임 유효성 검사 함수
   * @returns {boolean} 닉네임이 유효하면 true, 아니면 false
   */
  const validateNickname = () => {
    if (nickname.length === 0) {
      setNicknameError("닉네임을 입력해주세요.");
      return false;
    } else if (nickname.length < 2) {
      setNicknameError("닉네임은 2자 이상이어야 합니다.");
      return false;
    } else {
      setNicknameError("");
      return true;
    }
  };

  // 닉네임 변경 시 오류 메시지 초기화
  useEffect(() => {
    if (nickname.length > 0) {
      setNicknameError("");
    }
  }, [nickname]);

  /**
   * 닉네임 입력 변경 핸들러
   * 사용자가 닉네임 필드에 입력할 때마다 상태 업데이트
   */
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  /**
   * 이미지 클릭 핸들러
   * 프로필 이미지 클릭 시 숨겨진 파일 선택 다이얼로그 열기
   */
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  /**
   * 파일 선택 변경 핸들러
   * 사용자가 이미지 파일 선택 시 이미지 미리보기 업데이트
   */
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

  /**
   * 프로필 수정 제출 핸들러
   * 입력 유효성 검사 후 API 호출 (현재는 모의 구현)
   */
  const handleSubmit = async () => {
    // 유효성 검사
    if (!validateNickname()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // API 호출을 모의 구현 (실제로는 axios 등으로 구현)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 성공 처리
      alert("프로필이 성공적으로 수정되었습니다.");
      setIsSubmitting(false);

      // 성공 후 페이지 이동 등의 로직
      // window.location.href = '/profile';
    } catch (error) {
      // 오류 처리
      alert("프로필 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  /**
   * 회원 탈퇴 클릭 핸들러
   * 회원 탈퇴 확인 모달 표시
   */
  const handleWithdrawalClick = () => {
    setShowWithdrawalConfirm(true);
  };

  /**
   * 회원 탈퇴 확인 핸들러
   * 실제 탈퇴 처리 API 호출 (현재는 모의 구현)
   */
  const handleWithdrawalConfirm = async () => {
    try {
      setIsSubmitting(true);

      // API 호출을 모의 구현 (실제로는 axios 등으로 구현)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 성공 처리
      alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
      setIsSubmitting(false);

      // 로그아웃 처리 및 메인 페이지로 이동
      // localStorage.removeItem('token');
      // window.location.href = '/';
    } catch (error) {
      // 오류 처리
      alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
      setShowWithdrawalConfirm(false);
    }
  };

  /**
   * 회원 탈퇴 취소 핸들러
   * 탈퇴 확인 모달 닫기
   */
  const handleWithdrawalCancel = () => {
    setShowWithdrawalConfirm(false);
  };

  return (
      <S.PageWrapper>
        <S.FrameWrapper>
          <S.ProfileCard>
            {/* 프로필 수정 페이지 헤더 */}
            <S.HeaderArea>
              <S.HeaderText>프로필 수정</S.HeaderText>
            </S.HeaderArea>

            {/* 프로필 이미지 영역 - 클릭하면 이미지 업로드 가능 */}
            <S.ProfileImageArea onClick={handleImageClick}>
              <img src={profileImage} alt="Profile" />
              {/* 숨겨진 파일 입력 - 이미지 선택 다이얼로그용 */}
              <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
              />
              {/* 카메라 아이콘 추가 */}
              <S.CameraIconWrapper>
                <div className="camera-icon">📷</div>
              </S.CameraIconWrapper>
            </S.ProfileImageArea>

            {/* 닉네임 입력 필드 - 2~10자 제한 */}
            <S.NicknameField>
              <S.InputBox
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  maxLength={10}
                  placeholder="2-10자 이내"
                  onBlur={validateNickname}
              />
            </S.NicknameField>

            {/* 오류 메시지 영역 - 닉네임 필드와 수정 완료 버튼 사이 */}
            {nicknameError && (
                <div style={{
                  color: '#ff4444',
                  fontSize: '0.8rem',
                  width: '100%',
                  textAlign: 'center',
                  position: 'absolute',
                  top: '16.2rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  maxWidth: 'calc(100% - 3rem)'
                }}>
                  {nicknameError}
                </div>
            )}

            {/* 수정 완료 버튼 - 클릭 이벤트 구현 */}
            <S.SubmitButton
                onClick={handleSubmit}
                style={{
                  cursor: 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  pointerEvents: isSubmitting ? 'none' : 'auto'
                }}
            >
              <S.ButtonText>
                {isSubmitting ? '처리 중...' : '수정 완료'}
              </S.ButtonText>
            </S.SubmitButton>

            {/* 회원 탈퇴 영역 - 클릭 이벤트 구현 */}
            <S.WithdrawalArea onClick={handleWithdrawalClick} style={{ cursor: 'pointer' }}>
              <S.WithdrawalText>회원 탈퇴</S.WithdrawalText>
            </S.WithdrawalArea>

            {/* 회원 탈퇴 확인 모달 */}
            {showWithdrawalConfirm && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1000
                }}>
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '2rem',
                    maxWidth: '90%',
                    width: '20rem',
                    textAlign: 'center',
                    color: '#1A1A1A'
                  }}>
                    <h3 style={{ marginTop: 0, color: '#1A1A1A' }}>회원 탈퇴 확인</h3>
                    <p style={{ color: '#1A1A1A' }}>정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                      <button
                          onClick={handleWithdrawalCancel}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#f2f2f2',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer'
                          }}
                      >
                        취소
                      </button>
                      <button
                          onClick={handleWithdrawalConfirm}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer'
                          }}
                      >
                        탈퇴하기
                      </button>
                    </div>
                  </div>
                </div>
            )}
          </S.ProfileCard>
        </S.FrameWrapper>
      </S.PageWrapper>
  );
};

export default ProfileFix;