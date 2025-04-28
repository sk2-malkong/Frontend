import axios from 'axios';
import auth from './auth'; // refreshAccessToken 함수 가져오기

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

// 요청 인터셉터 (토큰 붙이기)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (토큰 만료되면 자동 재발급)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken이 만료되었고, 아직 재시도 안 했으면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await auth.refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // 재시도
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        window.location.href = '/login'; // 재로그인 유도
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
