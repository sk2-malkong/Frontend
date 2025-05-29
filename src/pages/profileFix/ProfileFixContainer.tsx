import React, { useState, useRef, useEffect } from "react";
import ProfileFix from "./ProfileFix";
import ProfileFixIcon from "./profilefixicon.svg";
import userApi from "../api/userApi"; // 기존 userApi 사용

// userApi 인터페이스 정의
interface UserApiInterface {
    getProfile: () => Promise<UserProfileData>;
    uploadProfileImage: (file: File) => Promise<ImageUploadResponse>;
    updateProfile: (data: { username: string }) => Promise<any>;
    withdrawUser: (data: { password: string }) => Promise<any>;  // 비밀번호 포함
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
    const [withdrawalPassword, setWithdrawalPassword] = useState<string>("");  // 회원 탈퇴 비밀번호 상태 추가
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
            const possibleImageKeys = ['profileImageUrl', 'profile_image_url', 'profileImage', 'profile_image', 'imageUrl', 'image_url', 'image'];
            for (const key of possibleImageKeys) {
                if (data[key]) {
                    console.log(`발견된 이미지 키: ${key}, 값:`, data[key]);
                }
            }
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
        const tempImageUrl = localStorage.getItem('tempProfileImageUrl');
        console.log('localStorage에서 임시 이미지 URL 확인:', tempImageUrl || '없음');
        if (tempImageUrl) {
            const cacheBreaker = `?t=${new Date().getTime()}`;
            const imageUrlWithCacheBuster = tempImageUrl + cacheBreaker;
            setProfileImage(imageUrlWithCacheBuster);
        }
        fetchUserProfile();
        console.log('=== 컴포넌트 마운트 완료 ===');
    }, []);

    // 사용자 프로필 정보를 가져오는 함수
    const fetchUserProfile = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('로그인이 필요합니다.');
                setIsLoading(false);
                return;
            }
            const userData: UserProfileData = await userApi.getProfile();
            inspectServerData(userData);
            if (userData.nickname) setNickname(userData.nickname);

            let profileImageUrl: string | null = null;
            if (userData.profileImage && typeof userData.profileImage === 'string') {
                profileImageUrl = userData.profileImage;
            } else {
                const possibleImageFields = ['profileImageUrl', 'profile_image_url', 'profile_image', 'imageUrl', 'image_url', 'image'];
                for (const field of possibleImageFields) {
                    if (userData[field] && typeof userData[field] === 'string') {
                        profileImageUrl = userData[field] as string;
                        break;
                    }
                }
            }

            if (profileImageUrl && profileImageUrl !== 'null' && profileImageUrl !== 'undefined') {
                if (profileImageUrl.startsWith('/')) {
                    const baseURL = 'http://43.203.14.194/api';
                    profileImageUrl = `${baseURL}${profileImageUrl}`;
                }
                const cacheBreaker = `?t=${new Date().getTime()}`;
                const imageUrlWithCacheBuster = profileImageUrl + cacheBreaker;
                setProfileImage(imageUrlWithCacheBuster);
                localStorage.setItem('tempProfileImageUrl', profileImageUrl);
            } else {
                setProfileImage(ProfileFixIcon);
            }

        } catch (error) {
            console.error('프로필 정보를 불러오는데 실패:', error);
            setProfileImage(ProfileFixIcon);
        } finally {
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

    // 닉네임 입력 핸들러
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNickname(e.target.value);
    };

    // 비밀번호 입력 핸들러 (회원 탈퇴용)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setWithdrawalPassword(e.target.value);
    };

    // 이미지 클릭 핸들러
    const handleImageClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // 파일 선택 핸들러
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        const fileType = file.type;
        if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
            setImageUploadStatus("이미지는 JPG 또는 PNG 형식만 가능합니다.");
            return;
        }

        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && typeof e.target.result === 'string') {
                setProfileImage(e.target.result);
            }
        };
        reader.readAsDataURL(file);

        await uploadProfileImage(file);
    };

    // 이미지 업로드 함수
    const uploadProfileImage = async (file: File): Promise<void> => {
        try {
            setImageUploadStatus("업로드 중...");
            const responseData: ImageUploadResponse = await userApi.uploadProfileImage(file);
            inspectServerData(responseData);

            const imageUrl = responseData.profileImage || responseData.imageUrl || null;
            if (imageUrl) {
                const cacheBreaker = `?t=${new Date().getTime()}`;
                const imageUrlWithCacheBuster = imageUrl + cacheBreaker;
                setProfileImage(imageUrlWithCacheBuster);
                localStorage.setItem('tempProfileImageUrl', imageUrl);
                setImageUploadStatus("이미지 업로드 성공");
            } else {
                setImageUploadStatus("이미지 URL을 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            setImageUploadStatus("이미지 업로드 실패. 다시 시도해주세요.");
        }
    };

    // 프로필 제출
    const handleSubmit = async (): Promise<void> => {
        if (!validateNickname()) return;

        try {
            setIsSubmitting(true);
            await userApi.updateProfile({ username: nickname });
            alert("프로필이 성공적으로 수정되었습니다.");
            window.location.href = '/post/mypage'; // 마이페이지로 이동
        } catch (error) {
            console.error('프로필 수정 실패:', error);
            alert("프로필 수정 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 회원 탈퇴 클릭
    const handleWithdrawalClick = (): void => {
        setShowWithdrawalConfirm(true);
    };

    // 회원 탈퇴 확인
    const handleWithdrawalConfirm = async (): Promise<void> => {
        try {
            setIsSubmitting(true);

            // userApi 모듈을 사용해 회원 탈퇴 요청
            await userApi.withdrawUser({ password: withdrawalPassword });  // 비밀번호 포함

            // 성공 처리
            alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
            localStorage.removeItem('accessToken');
            sessionStorage.clear();
            window.location.href = '/post/main';  // 게시판 메인 페이지로 이동

        } catch (error) {
            // 오류 처리 - 로그아웃하지 않고 현재 페이지 유지
            console.error('회원 탈퇴 실패:', error);
            alert("비밀번호가 틀렸거나 오류가 발생했습니다. 다시 시도해주세요.");
            setShowWithdrawalConfirm(true);  // 모달은 유지
        } finally {
            setIsSubmitting(false);
        }
    };

    // 회원 탈퇴 취소
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
            withdrawalPassword={withdrawalPassword}
            onNicknameChange={handleNicknameChange}
            onImageClick={handleImageClick}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onWithdrawalClick={handleWithdrawalClick}
            onWithdrawalConfirm={handleWithdrawalConfirm}
            onWithdrawalCancel={handleWithdrawalCancel}
            onPasswordChange={handlePasswordChange}
        />
    );
};

export default ProfileFixContainer;