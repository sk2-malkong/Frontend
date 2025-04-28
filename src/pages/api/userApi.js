import api from './axios';

/**
 * 사용자 프로필 정보 가져오기
 * @returns {Promise<Object>} 사용자 프로필 데이터
 */
const getProfile = async () => {
    try {
        console.log('프로필 정보 요청 시작');

        const response = await api.get('/user/profile');

        console.log('프로필 응답 데이터:', response.data);
        return response.data;
    } catch (error) {
        console.error('프로필 정보 가져오기 실패:', error);
        console.error('에러 응답:', error.response);
        throw error.response?.data || new Error('프로필 정보를 가져오는데 실패했습니다.');
    }
};

/**
 * 사용자 비속어 사용 횟수 가져오기
 * @returns {Promise<number>} 비속어 사용 횟수
 */
const getPenaltyCount = async () => {
    try {
        console.log('비속어 사용 횟수 요청 시작');

        const response = await api.get('/user/penaltyCount');

        console.log('비속어 사용 횟수 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('비속어 사용 횟수 가져오기 실패:', error);
        console.error('에러 응답:', error.response);
        throw error.response?.data || new Error('비속어 사용 횟수를 가져오는데 실패했습니다.');
    }
};

/**
 * 프로필 이미지 업로드
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<Object>} 업로드 결과 데이터
 */
const uploadProfileImage = async (file) => {
    try {
        console.log('프로필 이미지 업로드 요청 시작');

        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/user/profile/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log('이미지 업로드 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('이미지 업로드 실패:', error);
        console.error('에러 응답:', error.response);
        throw error.response?.data || new Error('이미지 업로드에 실패했습니다.');
    }
};

/**
 * 사용자 프로필 정보 업데이트
 * @param {Object} profileData - 업데이트할 프로필 데이터
 * @returns {Promise<Object>} 업데이트 결과 데이터
 */
const updateProfile = async (profileData) => {
    try {
        console.log('프로필 정보 업데이트 요청 시작:', profileData);

        const response = await api.put('/user/profile', profileData);

        console.log('프로필 업데이트 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('프로필 정보 업데이트 실패:', error);
        console.error('에러 응답:', error.response);
        throw error.response?.data || new Error('프로필 정보 업데이트에 실패했습니다.');
    }
};

/**
 * 회원 탈퇴 요청
 * @returns {Promise<Object>} 탈퇴 처리 결과 데이터
 */
const withdrawUser = async () => {
    try {
        console.log('회원 탈퇴 요청 시작');

        const response = await api.post('/user/withdrawal');

        console.log('회원 탈퇴 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('회원 탈퇴 실패:', error);
        console.error('에러 응답:', error.response);
        throw error.response?.data || new Error('회원 탈퇴에 실패했습니다.');
    }
};

const userApi = {
    getProfile,
    getPenaltyCount,
    uploadProfileImage,
    updateProfile,
    withdrawUser
};

export default userApi;