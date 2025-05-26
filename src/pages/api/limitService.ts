import api from './axios';

/**
 * 비속어 로그 항목 타입
 */
interface BadwordLog {
    filteredWord: string;
    originalWord: string;
}

/**
 * 사용자 제한 정보 타입
 */
interface UserLimitInfo {
    endDate: string | null;
    badwordLogs: BadwordLog[];
    isActive: boolean;
    startDate: string | null;
}

/**
 * 사용자 제한 정보를 가져오는 서비스
 */
const limitService = {
    /**
     * 사용자의 운영원칙 위반 내역 및 제한 정보를 가져옴
     * @returns {Promise<UserLimitInfo>} 사용자 제한 정보
     */
    postUserLimits: async (): Promise<UserLimitInfo> => {
        try {
            const response = await api.post<UserLimitInfo>('/user/limits');
            return response.data;
        } catch (error) {
            console.error('사용자 제한 정보 조회 실패:', error);
            throw error;
        }
    }
};

export default limitService;
