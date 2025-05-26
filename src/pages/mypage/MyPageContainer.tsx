import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import MyPage from './MyPage';
import userApi from '../api/userApi';

// 프로필 데이터 인터페이스 정의
interface UserProfile {
    username: string;
    email: string;
    profileImage?: string;
}

// API 응답 타입 정의
interface ProfileApiResponse {
    username: string;
    email: string;
    profileImage?: string;
    [key: string]: any; // 추가 속성이 있을 수 있음
}

const MyPageContainer: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [penaltyCount, setPenaltyCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // 데이터 로딩 함수
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                console.log('데이터 요청 시작...');

                // 프로필 데이터 먼저 요청 - 타입 단언(Type Assertion) 사용
                const profileData = await userApi.getProfile() as ProfileApiResponse;
                console.log('API에서 받아온 프로필 데이터:', profileData);

                // 프로필 데이터 업데이트
                setUserProfile({
                    username: profileData.username,
                    email: profileData.email,
                    profileImage: profileData.profileImage
                });

                // 받은 데이터를 로컬 스토리지에도 저장
                localStorage.setItem('username', profileData.username || '');
                localStorage.setItem('email', profileData.email || '');

                try {
                    // 비속어 횟수 요청 - 타입 단언 사용
                    const count = await userApi.postPenaltyCount() as number;
                    console.log('API에서 받아온 비속어 횟수:', count);

                    // 숫자값이 직접 반환되므로 바로 상태 업데이트
                    setPenaltyCount(count);
                } catch (penaltyErr) {
                    console.error('비속어 횟수 로딩 실패:', penaltyErr);
                    // 비속어 카운트 오류가 있어도 전체 화면은 계속 로드
                }

                setLoading(false);
            } catch (err: any) {
                console.error('프로필 데이터 로딩 중 오류:', err);
                setError('데이터를 불러오는데 실패했습니다: ' + err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 디버깅용 콘솔 로그
    console.log('현재 컴포넌트 상태:', { loading, error, userProfile, penaltyCount });

    // 프로필 수정 페이지로 이동하는 핸들러 함수
    const handleEditProfile = (): void => {
        navigate('/post/profilefix');
    };

    // 이용 제한 내역 페이지로 이동하는 핸들러 함수
    const handleNavigateToLimitLog = (): void => {
        navigate('/post/limitlog');
    };
    
    const handleNavigateToMyPosts = (): void => {
        navigate('/post/myposts');
    };

    return (
        <MyPage
            loading={loading}
            error={error}
            userProfile={userProfile}
            penaltyCount={penaltyCount}
            onEditProfile={handleEditProfile}
            onNavigateToLimitLog={handleNavigateToLimitLog}
            onNavigateToMyPosts={handleNavigateToMyPosts}
        />
    );
};

export default MyPageContainer;