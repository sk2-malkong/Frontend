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
  const [profileImage, setProfileImage] = useState(""); // 프로필 이미지 상태를 빈 문자열로 초기화
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [nicknameError, setNicknameError] = useState(""); // 닉네임 오류 메시지
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 진행 상태
  const [showWithdrawalConfirm, setShowWithdrawalConfirm] = useState(false); // 탈퇴 확인 모달 표시 상태
  const [imageFile, setImageFile] = useState(null); // 업로드할 이미지 파일
  const [imageUploadStatus, setImageUploadStatus] = useState(""); // 이미지 업로드 상태 메시지
  const fileInputRef = useRef(null); // 파일 입력 요소 참조

  // profileImageUrl이 변경될 때마다 로그 출력 (디버깅용)
  useEffect(() => {
    console.log('profileImage 상태가 변경됨:', profileImage || '빈 문자열');
  }, [profileImage]);

  // 서버 응답 데이터 구조를 확인하기 위한 디버깅 함수
  const inspectServerData = (data) => {
    console.log('=== 서버 응답 데이터 상세 분석 ===');
    console.log('데이터 타입:', typeof data);

    if (typeof data === 'object') {
      console.log('데이터 키:', Object.keys(data));

      // 프로필 이미지 URL 관련 키 확인
      const possibleImageKeys = ['profileImageUrl', 'profile_image_url', 'profileImage', 'profile_image', 'imageUrl', 'image_url', 'image'];

      for (const key of possibleImageKeys) {
        if (data[key]) {
          console.log(`발견된 이미지 키: ${key}, 값:`, data[key]);
        }
      }

      // 중첩된 객체 확인
      for (const key in data) {
        if (data[key] && typeof data[key] === 'object') {
          console.log(`중첩된 객체 ${key}의 키:`, Object.keys(data[key]));
        }
      }
    }

    console.log('=== 서버 응답 분석 완료 ===');
  };

  // 컴포넌트 마운트 시 사용자 프로필 정보 가져오기
  useEffect(() => {
    console.log('=== 컴포넌트 마운트 시작 ===');

    // localStorage에서 임시 저장된 프로필 이미지 URL 확인 (새로고침 대응)
    const tempImageUrl = localStorage.getItem('tempProfileImageUrl');
    console.log('localStorage에서 임시 이미지 URL 확인:', tempImageUrl || '없음');

    if (tempImageUrl) {
      console.log('localStorage에서 임시 이미지 URL 발견, 상태 업데이트');
      // 캐시 방지 파라미터 추가
      const cacheBreaker = `?t=${new Date().getTime()}`;
      const imageUrlWithCacheBuster = tempImageUrl + cacheBreaker;
      console.log('캐시 방지 파라미터가 추가된 URL:', imageUrlWithCacheBuster);
      setProfileImage(imageUrlWithCacheBuster);
    } else {
      console.log('localStorage에 저장된 이미지 URL 없음');
    }

    // 서버에서 최신 프로필 정보 가져오기
    console.log('서버에서 최신 프로필 정보 요청');
    fetchUserProfile();

    console.log('=== 컴포넌트 마운트 완료 ===');
  }, []);

  /**
   * 사용자 프로필 정보를 가져오는 함수
   * 컴포넌트 마운트 시 실행되어 현재 저장된 프로필 정보를 불러옴
   */
  const fetchUserProfile = async () => {
    setIsLoading(true); // 로딩 시작
    console.log('=== 프로필 정보 가져오기 시작 ===');

    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log('액세스 토큰 존재 여부:', !!accessToken);

      if (!accessToken) {
        console.error('로그인이 필요합니다. 토큰이 존재하지 않습니다.');
        setIsLoading(false);
        return;
      }

      console.log('API 호출 시작: http://localhost:8080/api/user/profile');
      // GET 메서드로 프로필 정보 요청
      const response = await api.get('http://localhost:8080/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      console.log('API 호출 성공');
      console.log('서버 응답 상태:', response.status);
      console.log('서버 응답 헤더:', response.headers);

      // API 응답 전체 내용 로깅
      console.log('서버 응답 데이터:', JSON.stringify(response.data, null, 2));

      // 응답 구조 상세 분석
      inspectServerData(response.data);

      // 서버에서 받아온 사용자 정보로 상태 업데이트
      const userData = response.data;

      console.log('프로필 데이터 확인:');
      console.log('- nickname 존재 여부:', !!userData.nickname);
      console.log('- profileImageUrl 존재 여부:', !!userData.profileImageUrl);
      console.log('- profileImageUrl 값:', userData.profileImageUrl);

      if (userData.nickname) {
        console.log('닉네임 업데이트:', userData.nickname);
        setNickname(userData.nickname);
      }

      // 이미지 URL을 찾기 위한 여러 가능한 필드명 시도
      // 서버에서는 'profileImage' 필드에 이미지 URL이 있음
      let profileImageUrl = null;

      // 'profileImage' 필드를 먼저 확인
      if (userData.profileImage && typeof userData.profileImage === 'string') {
        profileImageUrl = userData.profileImage;
        console.log("'profileImage' 필드에서 이미지 URL 찾음:", profileImageUrl);
      } else {
        // 다른 가능한 필드명도 확인
        const possibleImageFields = ['profileImageUrl', 'profile_image_url', 'profile_image', 'imageUrl', 'image_url', 'image'];

        for (const field of possibleImageFields) {
          if (userData[field] && typeof userData[field] === 'string') {
            profileImageUrl = userData[field];
            console.log(`이미지 URL을 필드 '${field}'에서 찾음:`, profileImageUrl);
            break;
          }
        }
      }

      // profileImageUrl이 존재하고 null이 아닌 경우에만 상태 업데이트
      if (profileImageUrl && profileImageUrl !== 'null' && profileImageUrl !== 'undefined') {
        console.log('프로필 이미지 URL 업데이트:', profileImageUrl);

        // URL이 상대 경로인지 확인하고 필요하면 기본 URL 추가
        if (profileImageUrl.startsWith('/')) {
          profileImageUrl = `${api.defaults.baseURL}${profileImageUrl}`;
          console.log('상대 경로를 절대 경로로 변환:', profileImageUrl);
        }

        // URL에 캐시 방지 파라미터 추가
        const cacheBreaker = `?t=${new Date().getTime()}`;
        const imageUrlWithCacheBuster = profileImageUrl + cacheBreaker;
        console.log('캐시 방지 파라미터가 추가된 URL:', imageUrlWithCacheBuster);

        setProfileImage(imageUrlWithCacheBuster);

        // 로컬 스토리지에도 저장
        localStorage.setItem('tempProfileImageUrl', profileImageUrl);
        console.log('이미지 URL을 localStorage에 저장함');
      } else {
        // API에서 이미지 URL이 없을 경우 기본 이미지 설정
        console.log('프로필 이미지 URL이 없거나 유효하지 않아 기본 이미지로 설정');
        setProfileImage(ProfileFixIcon);
      }

    } catch (error) {
      console.error('프로필 정보를 불러오는데 실패했습니다:', error);
      console.log('오류 상세 정보:', JSON.stringify(error.response || error.message || error, null, 2));
      // 서버에서 데이터를 가져오는 데 실패하면 기본 이미지 설정
      setProfileImage(ProfileFixIcon);
    } finally {
      console.log('=== 프로필 정보 가져오기 완료 ===');
      setIsLoading(false); // 로딩 완료
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

    console.log('=== 이미지 파일 선택 처리 시작 ===');
    console.log('선택한 파일:', file.name, file.type, `${(file.size / 1024).toFixed(2)}KB`);

    // 파일 형식 검증 (jpg, png만 허용)
    const fileType = file.type;
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      console.log('잘못된 파일 형식:', fileType);
      setImageUploadStatus("이미지는 JPG 또는 PNG 형식만 가능합니다.");
      return;
    }

    // 이미지 파일 상태 저장
    setImageFile(file);
    console.log('이미지 파일 상태 저장 완료');

    // 이미지 미리보기 업데이트
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('이미지 미리보기 설정 완료 (base64 데이터)');
      setProfileImage(e.target.result);
    };
    reader.readAsDataURL(file);

    console.log('이미지 업로드 함수 호출...');
    // 이미지 즉시 업로드
    await uploadProfileImage(file);
    console.log('=== 이미지 파일 선택 처리 완료 ===');
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

      console.log('서버에 이미지 업로드 요청 시작...');

      // 서버에 이미지 업로드 요청 (토큰 포함)
      const uploadUrl = 'http://localhost:8080/api/user/profile/upload';
      console.log('업로드 URL:', uploadUrl);

      const response = await api.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}` // 액세스 토큰을 Authorization 헤더에 추가
        }
      });

      // 성공 처리
      setImageUploadStatus(`이미지 업로드 성공`);
      console.log('이미지 업로드 응답:', response.data);

      // 서버 응답 구조 상세 분석
      inspectServerData(response.data);

      // 백엔드에서 URL을 반환하는 경우:
      let imageUrl = null;

      // 'profileImage' 필드 확인 (서버 응답에서 이 필드에 이미지 URL이 있을 것으로 예상)
      if (response.data && response.data.profileImage) {
        imageUrl = response.data.profileImage;
        console.log("'profileImage' 필드에서 이미지 URL 찾음:", imageUrl);
      }
      // imageUrl 필드 확인 (다른 가능한 필드명)
      else if (response.data && response.data.imageUrl) {
        imageUrl = response.data.imageUrl;
        console.log("'imageUrl' 필드에서 이미지 URL 찾음:", imageUrl);
      }

      if (imageUrl) {
        // URL에 캐시 방지 파라미터 추가 (브라우저 캐싱 방지)
        const cacheBreaker = `?t=${new Date().getTime()}`;
        const imageUrlWithCacheBuster = imageUrl + cacheBreaker;

        console.log('캐시 방지 파라미터가 추가된 URL:', imageUrlWithCacheBuster);
        setProfileImage(imageUrlWithCacheBuster);

        // 로컬 스토리지에 이미지 URL 저장 (새로고침 시 임시 대응용)
        localStorage.setItem('tempProfileImageUrl', imageUrl);
        console.log('이미지 URL을 localStorage에 저장함:', imageUrl);
      } else {
        console.log('서버 응답에 이미지 URL이 없습니다:', response.data);
      }

    } catch (error) {
      // 오류 처리
      console.error('이미지 업로드 실패:', error);
      console.log('오류 상세 정보:', JSON.stringify(error.response || error.message || error, null, 2));
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

      console.log('닉네임 업데이트 요청 시작...');

      // 닉네임 업데이트 API 호출 - PUT 메서드 사용
      const updateUrl = 'http://localhost:8080/api/user/profile';
      console.log('업데이트 URL:', updateUrl);

      // PUT 메서드로 username 필드 업데이트
      await api.put(updateUrl, { username: nickname }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // 성공 처리
      alert("프로필이 성공적으로 수정되었습니다.");

      // 프로필 정보 다시 불러오기 (GET 메서드)
      fetchUserProfile();

    } catch (error) {
      // 오류 처리
      console.error('프로필 수정 실패:', error);
      console.log('오류 상세 정보:', JSON.stringify(error.response || error.message || error, null, 2));
      alert("프로필 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
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
                <S.ImageUploadStatus isError={imageUploadStatus.includes('실패')}>
                  {imageUploadStatus}
                </S.ImageUploadStatus>
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
                <S.ErrorMessage>
                  {nicknameError}
                </S.ErrorMessage>
            )}

            {/* 수정 완료 버튼 - 클릭 이벤트 구현 */}
            <S.SubmitButton
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
              <S.ButtonText>
                {isSubmitting ? '처리 중...' : '수정 완료'}
              </S.ButtonText>
            </S.SubmitButton>

            {/* 회원 탈퇴 영역 - 클릭 이벤트 구현 */}
            <S.WithdrawalArea onClick={handleWithdrawalClick}>
              <S.WithdrawalText>회원 탈퇴</S.WithdrawalText>
            </S.WithdrawalArea>

            {/* 회원 탈퇴 확인 모달 */}
            {showWithdrawalConfirm && (
                <S.ModalOverlay>
                  <S.ModalContainer>
                    <S.ModalTitle>회원 탈퇴 확인</S.ModalTitle>
                    <S.ModalContent>정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.</S.ModalContent>
                    <S.ModalButtonContainer>
                      <S.ModalCancelButton onClick={handleWithdrawalCancel}>
                        취소
                      </S.ModalCancelButton>
                      <S.ModalConfirmButton onClick={handleWithdrawalConfirm}>
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