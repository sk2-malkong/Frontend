import api from './axios'; // Import the axios instance you've created

/**
 * 사용자 제한 정보를 가져오는 서비스
 */
const limitService = {
    /**
     * 사용자의 운영원칙 위반 내역 및 제한 정보를 가져옴
     * @returns {Promise<Object>} 사용자 제한 정보
     */
    postUserLimits: async () => {
        try {
            const response = await api.post('/user/limits');
            return response.data;
        } catch (error) {
            console.error('사용자 제한 정보 조회 실패:', error);
            throw error;
        }
    }
};

export default limitService;