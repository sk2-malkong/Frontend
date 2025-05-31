import React, { useState, useEffect } from "react";
import ProfileFix from "./ProfileFix";
import userApi from "../api/userApi"; // 기존 userApi 사용

// userApi 인터페이스 정의
interface UserApiInterface {
    getProfile: () => Promise<UserProfileData>;
    updateProfile: (data: { username: string }) => Promise<any>;
    withdrawUser: (data: { password: string }) => Promise<any>;  // 비밀번호 포함
}

// 서버 응답 데이터 타입 정의
interface UserProfileData {
    nickname?: string;
    [key: string]: any; // 추가 속성을 위한 인덱스 시그니처
}

const ProfileFixContainer: React.FC = () => {
    // 상태 관리: 닉네임만 관리
    const [nickname, setNickname] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nicknameError, setNicknameError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showWithdrawalConfirm, setShowWithdrawalConfirm] = useState<boolean>(false);
    const [withdrawalPassword, setWithdrawalPassword] = useState<string>("");  // 회원 탈퇴 비밀번호 상태 추가

    // 컴포넌트 마운트 시 사용자 프로필 정보 가져오기
    useEffect(() => {
        console.log('=== 컴포넌트 마운트 시작 ===');
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
            console.log('사용자 데이터:', userData);
            if (userData.nickname) setNickname(userData.nickname);

        } catch (error) {
            console.error('프로필 정보를 불러오는데 실패:', error);
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
            isLoading={isLoading}
            nicknameError={nicknameError}
            isSubmitting={isSubmitting}
            showWithdrawalConfirm={showWithdrawalConfirm}
            withdrawalPassword={withdrawalPassword}
            onNicknameChange={handleNicknameChange}
            onSubmit={handleSubmit}
            onWithdrawalClick={handleWithdrawalClick}
            onWithdrawalConfirm={handleWithdrawalConfirm}
            onWithdrawalCancel={handleWithdrawalCancel}
            onPasswordChange={handlePasswordChange}
        />
    );
};

export default ProfileFixContainer;