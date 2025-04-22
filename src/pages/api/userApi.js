import api from './axios';

// 사용자 프로필 정보 가져오기
const getProfile = async () => {
    try {
        console.log('프로필 정보 요청 시작');
        console.log('토큰:', localStorage.getItem('accessToken'));

        const response = await api.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        console.log('프로필 응답 데이터:', response.data);
        return response.data;
    } catch (error) {
        console.error('프로필 정보 가져오기 실패:', error);
        console.error('에러 응답:', error.response);
        throw error.response?.data || new Error('프로필 정보를 가져오는데 실패했습니다.');
    }
};

const userApi = {
    getProfile
};

export default userApi;