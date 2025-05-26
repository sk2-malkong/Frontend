import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    //베이스 주소'http://43.203.14.194/api','http://localhost:8080/api'
    baseURL: 'http://43.203.14.194/api',
    withCredentials: true,
});

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들을 저장하는 배열
let failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
}> = [];

// 대기 중인 요청들을 처리하는 함수
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });

    failedQueue = [];
};

// 토큰 재발급 함수 (auth.js에서 가져오지 않고 여기서 직접 구현)
const refreshAccessToken = async (): Promise<string> => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("리프레시 토큰이 없습니다.");
    }

    const response = await api.post("/auth/refresh", { refreshToken });
    const newAccessToken = response.headers["access-token"]?.replace("Bearer ", "");
    const newRefreshToken = response.headers["refresh-token"];

    if (newAccessToken) localStorage.setItem("accessToken", newAccessToken);
    if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

    if (!newAccessToken) {
        throw new Error("새로운 액세스 토큰을 받지 못했습니다.");
    }

    return newAccessToken;
};

// 로그아웃 처리 함수
const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("penaltyEndDate");

    // 로그인 페이지로 리다이렉트
    window.location.href = '/login';
};

// 요청 인터셉터 (토큰 붙이기)
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터 (토큰 만료되면 자동 재발급)
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // 401 에러이고, 이미 재시도하지 않은 요청인 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            // 이미 토큰 갱신 중인 경우
            if (isRefreshing) {
                // 대기열에 추가하고 토큰 갱신 완료를 기다림
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // 토큰 갱신 시도
                const newAccessToken = await refreshAccessToken();

                // 새로운 토큰으로 헤더 업데이트
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                // 대기 중인 요청들에게 새 토큰 전달
                processQueue(null, newAccessToken);

                // 원래 요청 재시도
                return api(originalRequest);

            } catch (refreshError) {
                // 리프레시 토큰도 만료된 경우
                console.error('토큰 갱신 실패:', refreshError);

                // 대기 중인 요청들에게 에러 전달
                processQueue(refreshError, null);

                // 로그아웃 처리
                handleLogout();

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;