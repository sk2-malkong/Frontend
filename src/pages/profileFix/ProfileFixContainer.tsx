import React, { useState, useRef, useEffect } from "react";
import ProfileFix, { ProfileFixProps } from "./ProfileFix";
import ProfileFixIcon from "./profilefixicon.svg";
import userApi from "../api/userApi"; // 기존 userApi 사용

// userApi 인터페이스 정의
interface UserApiInterface {
    getProfile: () => Promise<UserProfileData>;
    uploadProfileImage: (file: File) => Promise<ImageUploadResponse>;
    updateProfile: (data: { username: string }) => Promise<any>;
    withdrawUser: () => Promise<any>;
}

// 서버 응답 데이터 타입 정의
interface UserProfileData {
    nickname?: string;
    profileImage?: string;
    profileImageUrl?: string;
    profile_image_url?: string;
    profile_image?: string;
    imageUrl?: string;
    image_url?: string;
    image?: string;
    [key: string]: any; // 추가 속성을 위한 인덱스 시그니처
}

interface ImageUploadResponse {
    profileImage?: string;
    imageUrl?: string;
    [key: string]: any; // 추가 속성을 위한 인덱스 시그니처
}

const ProfileFixContainer: React.FC = () => {
    // 상태 관리: 닉네임과 프로필 이미지
    const [nickname, setNickname] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nicknameError, setNicknameError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showWithdrawalConfirm, setShowWithdrawalConfirm] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUploadStatus, setImageUploadStatus] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // profileImage 상태 변경 로그
    useEffect(() => {
        console.log('profileImage 상태가 변경됨:', profileImage || '빈 문자열');
    }, [profileImage]);

    // 서버 응답 데이터 구조 분석 함수
    const inspectServerData = (data: UserProfileData): void => {
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

    // 사용자 프로필 정보를 가져오는 함수
    const fetchUserProfile = async (): Promise<void> => {
        setIsLoading(true);
        console.log('=== 프로필 정보 가져오기 시작 ===');

        try {
            const accessToken = localStorage.getItem('accessToken');
            console.log('액세스 토큰 존재 여부:', !!accessToken);

            if (!accessToken) {
                console.error('로그인이 필요합니다. 토큰이 존재하지 않습니다.');
                setIsLoading(false);
                return;
            }

            // userApi 모듈을 사용하여 프로필 정보 요청
            const userData: UserProfileData = await userApi.getProfile();

            // 응답 구조 상세 분석
            inspectServerData(userData);

            console.log('프로필 데이터 확인:');
            console.log('- nickname 존재 여부:', !!userData.nickname);
            console.log('- profileImageUrl 존재 여부:', !!userData.profileImageUrl);

            if (userData.nickname) {
                console.log('닉네임 업데이트:', userData.nickname);
                setNickname(userData.nickname);
            }

            // 이미지 URL을 찾기 위한 여러 가능한 필드명 시도
            let profileImageUrl: string | null = null;

            // 'profileImage' 필드를 먼저 확인
            if (userData.profileImage && typeof userData.profileImage === 'string') {
                profileImageUrl = userData.profileImage;
                console.log("'profileImage' 필드에서 이미지 URL 찾음:", profileImageUrl);
            } else {
                // 다른 가능한 필드명도 확인
                const possibleImageFields = ['profileImageUrl', 'profile_image_url', 'profile_image', 'imageUrl', 'image_url', 'image'];

                for (const field of possibleImageFields) {
                    if (userData[field] && typeof userData[field] === 'string') {
                        profileImageUrl = userData[field] as string;
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
                    const baseURL = 'http://localhost:8080/api'; // axios 기본 URL을 직접 참조하는 대신 명시적으로 지정
                    profileImageUrl = `${baseURL}${profileImageUrl}`;
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
                console.log('프로필 이미지 URL이 없거나 유효하지 않아 기본 이미지로 설정');
                setProfileImage(ProfileFixIcon);
            }

        } catch (error) {
            console.error('프로필 정보를 불러오는데 실패했습니다:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log('오류 상세 정보:', errorMessage);
            // 서버에서 데이터를 가져오는 데 실패하면 기본 이미지 설정
            setProfileImage(ProfileFixIcon);
        } finally {
            console.log('=== 프로필 정보 가져오기 완료 ===');
            setIsLoading(false);
        }
    };

    // 닉네임 유효성 검사 함수
    const validateNickname = (): boolean => {
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

    // 닉네임 입력 변경 핸들러
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNickname(e.target.value);
    };

    // 이미지 클릭 핸들러
    const handleImageClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // 파일 선택 변경 핸들러
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
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
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && typeof e.target.result === 'string') {
                console.log('이미지 미리보기 설정 완료 (base64 데이터)');
                setProfileImage(e.target.result);
            }
        };
        reader.readAsDataURL(file);

        console.log('이미지 업로드 함수 호출...');
        // 이미지 즉시 업로드
        await uploadProfileImage(file);
        console.log('=== 이미지 파일 선택 처리 완료 ===');
    };

    // 프로필 이미지 업로드 함수
    const uploadProfileImage = async (file: File): Promise<void> => {
        try {
            setImageUploadStatus("업로드 중...");
            console.log('서버에 이미지 업로드 요청 시작...');

            // userApi 모듈을 사용해 이미지 업로드
            const responseData: ImageUploadResponse = await userApi.uploadProfileImage(file);

            // 성공 처리
            setImageUploadStatus(`이미지 업로드 성공`);
            console.log('이미지 업로드 응답:', responseData);

            // 서버 응답 구조 상세 분석
            inspectServerData(responseData);

            // 백엔드에서 URL을 반환하는 경우:
            let imageUrl: string | null = null;

            // 'profileImage' 필드 확인 (서버 응답에서 이 필드에 이미지 URL이 있을 것으로 예상)
            if (responseData && responseData.profileImage) {
                imageUrl = responseData.profileImage;
                console.log("'profileImage' 필드에서 이미지 URL 찾음:", imageUrl);
            }
            // imageUrl 필드 확인 (다른 가능한 필드명)
            else if (responseData && responseData.imageUrl) {
                imageUrl = responseData.imageUrl;
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
                console.log('서버 응답에 이미지 URL이 없습니다:', responseData);
            }

        } catch (error) {
            // 오류 처리
            console.error('이미지 업로드 실패:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log('오류 상세 정보:', errorMessage);
            setImageUploadStatus('이미지 업로드 실패. 다시 시도해주세요.');
        }
    };

    // 프로필 수정 제출 핸들러
    const handleSubmit = async (): Promise<void> => {
        // 유효성 검사
        if (!validateNickname()) {
            return;
        }

        try {
            setIsSubmitting(true);

            console.log('닉네임 업데이트 요청 시작...');

            // userApi 모듈을 사용해 프로필 업데이트
            await userApi.updateProfile({ username: nickname });

            // 성공 처리
            alert("프로필이 성공적으로 수정되었습니다.");

            // 프로필 정보 다시 불러오기
            fetchUserProfile();

        } catch (error) {
            // 오류 처리
            console.error('프로필 수정 실패:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log('오류 상세 정보:', errorMessage);
            alert("프로필 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 회원 탈퇴 클릭 핸들러
    const handleWithdrawalClick = (): void => {
        setShowWithdrawalConfirm(true);
    };

    // 회원 탈퇴 확인 핸들러
    const handleWithdrawalConfirm = async (): Promise<void> => {
        try {
            setIsSubmitting(true);

            // userApi 모듈을 사용해 회원 탈퇴 요청
            await userApi.withdrawUser();

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

    // 회원 탈퇴 취소 핸들러
    const handleWithdrawalCancel = (): void => {
        setShowWithdrawalConfirm(false);
    };

    return (
        <ProfileFix
            nickname={nickname}
            profileImage={profileImage}
            isLoading={isLoading}
            nicknameError={nicknameError}
            isSubmitting={isSubmitting}
            showWithdrawalConfirm={showWithdrawalConfirm}
            imageUploadStatus={imageUploadStatus}
            fileInputRef={fileInputRef}
            onNicknameChange={handleNicknameChange}
            onImageClick={handleImageClick}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onWithdrawalClick={handleWithdrawalClick}
            onWithdrawalConfirm={handleWithdrawalConfirm}
            onWithdrawalCancel={handleWithdrawalCancel}
        />
    );
};

export default ProfileFixContainer;