import React, { useState, useRef, useEffect } from "react";
import { S } from "./style";
import ProfileFixIcon from "./profilefixicon.svg";
import api from "../api/axios"; // 경로는 실제 프로젝트 구조에 맞게 조정해야 합니다

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
  const [imageFile, setImageFile] = useState(null); // 업로드할 이미지 파일
  const [imageUploadStatus, setImageUploadStatus] = useState(""); // 이미지 업로드 상태 메시지
  const fileInputRef = useRef(null); // 파일 입력 요소 참조

  // 컴포넌트 마운트 시 사용자 프로필 정보 가져오기
  useEffect(() => {
    fetchUserProfile();
  }, []);

  /**
   * 사용자 프로필 정보를 가져오는 함수
   * 컴포넌트 마운트 시 실행되어 현재 저장된 프로필 정보를 불러옴
   */
  const fetchUserProfile = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('로그인이 필요합니다. 토큰이 존재하지 않습니다.');
        return;
      }
// 수정부분/user/profile    /upload
      const response = await api.get('/user/profile', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // 서버에서 받아온 사용자 정보로 상태 업데이트
      const userData = response.data;

      if (userData.nickname) {
        setNickname(userData.nickname);
      }

      if (userData.profileImageUrl) {
        setProfileImage(userData.profileImageUrl);
      }

    } catch (error) {
      console.error('프로필 정보를 불러오는데 실패했습니다:', error);
    }
  };

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
   * 사용자가 이미지 파일 선택 시 이미지 미리보기 업데이트 및 서버에 업로드
   */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 형식 검증 (jpg, png만 허용)
    const fileType = file.type;
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      setImageUploadStatus("이미지는 JPG 또는 PNG 형식만 가능합니다.");
      return;
    }

    // 이미지 파일 상태 저장
    setImageFile(file);

    // 이미지 미리보기 업데이트
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result);
    };
    reader.readAsDataURL(file);

    // 이미지 즉시 업로드
    await uploadProfileImage(file);
  };

  /**
   * 프로필 이미지 업로드 함수
   * 선택한 이미지 파일을 서버에 업로드하고 결과 처리
   * @param {File} file - 업로드할 이미지 파일
   */
  const uploadProfileImage = async (file) => {
    try {
      setImageUploadStatus("업로드 중...");

      // 로컬 스토리지에서 액세스 토큰 가져오기
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setImageUploadStatus('로그인이 필요합니다. 토큰이 존재하지 않습니다.');
        return;
      }

      // FormData 객체 생성 및 파일 추가
      const formData = new FormData();
      formData.append('file', file);

      // 서버에 이미지 업로드 요청 (토큰 포함)
      const response = await api.post('/user/profile/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}` // 액세스 토큰을 Authorization 헤더에 추가
        }
      });

      // 성공 처리
      setImageUploadStatus(`이미지 업로드 성공`);
      console.log('이미지 업로드 성공:', response.data);

      // 필요한 경우 프로필 이미지 URL 업데이트
      // 백엔드에서 URL을 반환하는 경우:
      if (response.data && response.data.imageUrl) {
        setProfileImage(response.data.imageUrl);

        // 세션 스토리지에 이미지 URL 저장 (새로고침 시 데이터 유지용)
        sessionStorage.setItem('profileImageUrl', response.data.imageUrl);
      }

    } catch (error) {
      // 오류 처리
      console.error('이미지 업로드 실패:', error);
      setImageUploadStatus('이미지 업로드 실패. 다시 시도해주세요.');
    }
  };

  /**
   * 프로필 수정 제출 핸들러
   * 입력 유효성 검사 후 API 호출
   */
  const handleSubmit = async () => {
    // 유효성 검사
    if (!validateNickname()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        alert('로그인이 필요합니다.');
        setIsSubmitting(false);
        return;
      }

      // 닉네임 업데이트 API 호출
      // 이미지는 이미 uploadProfileImage에서 처리되었으므로 여기서는 닉네임만 처리
      await api.post('/user/profile/update', { nickname }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // 성공 처리
      alert("프로필이 성공적으로 수정되었습니다.");
      setIsSubmitting(false);

      // 세션 스토리지에 닉네임 저장 (새로고침 시 데이터 유지용)
      sessionStorage.setItem('userNickname', nickname);

      // 성공 후 페이지 이동 등의 로직
      // window.location.href = '/profile';
    } catch (error) {
      // 오류 처리
      console.error('프로필 수정 실패:', error);
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
   * 실제 탈퇴 처리 API 호출
   */
  const handleWithdrawalConfirm = async () => {
    try {
      setIsSubmitting(true);

      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        alert('로그인이 필요합니다.');
        setIsSubmitting(false);
        setShowWithdrawalConfirm(false);
        return;
      }

      // 회원 탈퇴 API 호출
      await api.post('/user/withdrawal', {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // 성공 처리
      alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
      setIsSubmitting(false);

      // 로그아웃 처리 및 메인 페이지로 이동
      localStorage.removeItem('accessToken');
      sessionStorage.clear();
      window.location.href = '/';
    } catch (error) {
      // 오류 처리
      console.error('회원 탈퇴 실패:', error);
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
                <div style={{
                  fontSize: '0.8rem',
                  width: '100%',
                  textAlign: 'center',
                  marginTop: '0.5rem',
                  color: imageUploadStatus.includes('실패') ? '#ff4444' : '#1A1A1A'
                }}>
                  {imageUploadStatus}
                </div>
            )}

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