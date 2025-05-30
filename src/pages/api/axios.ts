import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// ============================================================================
// 상수 및 설정
// ============================================================================
const API_BASE_URL = 'http://43.203.14.194/api';
const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    EMAIL: 'email',
    USERNAME: 'username',
    ID: 'id',
    PENALTY_END_DATE: 'penaltyEndDate',
    TOKEN_LOGS: 'tokenRefreshLogs'
} as const;

// ============================================================================
// 로깅 유틸리티
// ============================================================================
class TokenLogger {
    private logs: string[] = [];

    log(message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}`;

        console.log(logMessage);
        this.logs.push(logMessage);

        if (process.env.NODE_ENV === 'development') {
            this.saveToStorage(logMessage);
        }
    }

    private saveToStorage(logMessage: string): void {
        const existingLogs = localStorage.getItem(STORAGE_KEYS.TOKEN_LOGS) || '';
        localStorage.setItem(STORAGE_KEYS.TOKEN_LOGS, existingLogs + logMessage + '\n');
    }

    getLogs(): string[] {
        return [...this.logs];
    }

    clearLogs(): void {
        this.logs.length = 0;
        localStorage.removeItem(STORAGE_KEYS.TOKEN_LOGS);
        console.log('토큰 로그가 클리어되었습니다.');
    }
}

// ============================================================================
// 토큰 관리 클래스
// ============================================================================
class TokenManager {
    private logger: TokenLogger;

    constructor(logger: TokenLogger) {
        this.logger = logger;
    }

    getAccessToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    setTokens(accessToken: string, refreshToken?: string): void {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        this.logger.log('✅ 새 액세스 토큰 발급 및 저장 완료');

        if (refreshToken) {
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
            this.logger.log('✅ 새 리프레시 토큰 저장 완료');
        }
    }

    clearAllTokens(): void {
        Object.values(STORAGE_KEYS).forEach(key => {
            if (key !== STORAGE_KEYS.TOKEN_LOGS) {
                localStorage.removeItem(key);
            }
        });
        this.logger.log('🚪 자동 로그아웃 처리');
    }

    async refreshToken(): Promise<string> {
        const refreshToken = this.getRefreshToken();

        if (!refreshToken) {
            this.logger.log('❌ 리프레시 토큰이 없음 - 재로그인 필요');
            throw new Error('No refresh token available');
        }

        this.logger.log('🔄 토큰 갱신 시도 중...');

        try {
            const response = await this.callRefreshAPI(refreshToken);
            this.logger.log('✅ 토큰 갱신 API 호출 성공');

            const { newAccessToken, newRefreshToken } = this.extractTokensFromResponse(response);

            if (!newAccessToken) {
                this.logger.log('❌ 새 액세스 토큰을 받지 못함');
                throw new Error('No new access token received');
            }

            // 새 토큰들 저장
            this.setTokens(newAccessToken, newRefreshToken);
            this.logger.log('✅ 토큰 갱신 및 저장 완료');

            return newAccessToken;

        } catch (error) {
            this.handleRefreshError(error);
            throw error;
        }
    }

    // 제거후 재발급 시도
    private async callRefreshAPI(refreshToken: string): Promise<AxiosResponse> {
        // 헤더 최소화를 위한 새로운 axios 인스턴스 (쿠키도 제거)
        const refreshApi = axios.create({
            baseURL: API_BASE_URL,
            withCredentials: false,  // 쿠키 전송하지 않음
        });

        // 헤더 완전 최소화 - Content-Type도 명시하지 않음 (axios가 자동 추론)
        return await refreshApi.post('/auth/refresh', { refreshToken });
    }

    private extractTokensFromResponse(response: AxiosResponse): {
        newAccessToken: string | undefined;
        newRefreshToken: string | undefined;
    } {
        // 디버깅: 응답 헤더 전체 로그 출력 (대소문자 구분 확인)
        this.logger.log(`🔍 서버 응답 헤더 전체: ${JSON.stringify(response.headers, null, 2)}`);

        // 모든 가능한 헤더 키 패턴 확인
        const headerKeys = Object.keys(response.headers);
        this.logger.log(`🔍 사용 가능한 헤더 키들: ${headerKeys.join(', ')}`);

        // 대소문자를 구분하여 정확한 키 찾기
        const exactAccessTokenKey = headerKeys.find(key =>
            key.toLowerCase() === 'access-token' || key === 'Access-Token'
        );
        const exactRefreshTokenKey = headerKeys.find(key =>
            key.toLowerCase() === 'refresh-token' || key === 'Refresh-Token'
        );

        this.logger.log(`🔍 정확한 액세스 토큰 헤더 키: ${exactAccessTokenKey}`);
        this.logger.log(`🔍 정확한 리프레시 토큰 헤더 키: ${exactRefreshTokenKey}`);

        // 토큰 관련 헤더들 모두 확인 (백엔드에서 실제로 보내는 키 포함)
        const possibleAccessTokenKeys = [
            'Access-Token', 'access-token', 'accesstoken', 'AccessToken',
            'authorization', 'Authorization',
        ];
        const possibleRefreshTokenKeys = [
            'refresh-token', 'Refresh-Token', 'refreshtoken', 'RefreshToken',

        ];

        let newAccessToken: string | undefined;
        let newRefreshToken: string | undefined;

        // 액세스 토큰 찾기
        for (const key of possibleAccessTokenKeys) {
            if (response.headers[key]) {
                newAccessToken = response.headers[key];
                this.logger.log(`✅ 액세스 토큰 발견! 헤더 키: ${key}, 값: ${newAccessToken}`);
                break;
            }
        }

        // 리프레시 토큰 찾기
        for (const key of possibleRefreshTokenKeys) {
            if (response.headers[key]) {
                newRefreshToken = response.headers[key];
                this.logger.log(`✅ 리프레시 토큰 발견! 헤더 키: ${key}, 값: ${newRefreshToken}`);
                break;
            }
        }

        if (!newAccessToken) {
            this.logger.log(`❌ 액세스 토큰을 찾을 수 없음. 시도한 키들: ${possibleAccessTokenKeys.join(', ')}`);

            // 응답 본문도 확인해보기
            if (response.data) {
                this.logger.log(`🔍 응답 본문 확인: ${JSON.stringify(response.data, null, 2)}`);

                // 응답 본문에서 토큰 찾기 시도
                if (response.data.accessToken) {
                    newAccessToken = response.data.accessToken;
                    this.logger.log(`✅ 응답 본문에서 액세스 토큰 발견: ${newAccessToken}`);
                }
                if (response.data.refreshToken) {
                    newRefreshToken = response.data.refreshToken;
                    this.logger.log(`✅ 응답 본문에서 리프레시 토큰 발견`);
                }
            }
        }

        if (!newRefreshToken) {
            this.logger.log(`❌ 리프레시 토큰을 찾을 수 없음. 시도한 키들: ${possibleRefreshTokenKeys.join(', ')}`);
        }

        // Bearer 접두사가 있다면 값에서만 제거
        const cleanAccessToken = newAccessToken?.replace(/^Bearer\s+/i, '');

        return {
            newAccessToken: cleanAccessToken,
            newRefreshToken
        };
    }

    private handleRefreshError(error: any): void {
        if (error.response?.status === 403) {
            this.logger.log('❌ 리프레시 토큰도 만료됨 - 재로그인 필요');
        } else {
            this.logger.log(`❌ 토큰 갱신 실패: ${error.message}`);
        }
    }
}

// ============================================================================
// 요청 큐 관리 클래스
// ============================================================================
class RequestQueue {
    private failedQueue: Array<{
        resolve: (value: any) => void;
        reject: (error: any) => void;
    }> = [];

    add(resolve: (value: any) => void, reject: (error: any) => void): void {
        this.failedQueue.push({ resolve, reject });
    }

    processAll(error: any, token: string | null = null): void {
        this.failedQueue.forEach(({ resolve, reject }) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
        this.clear();
    }

    clear(): void {
        this.failedQueue = [];
    }

    get length(): number {
        return this.failedQueue.length;
    }
}

// ============================================================================
// HTTP 인터셉터 클래스
// ============================================================================
class HttpInterceptor {
    private tokenManager: TokenManager;
    private requestQueue: RequestQueue;
    private isRefreshing = false;

    constructor(tokenManager: TokenManager) {
        this.tokenManager = tokenManager;
        this.requestQueue = new RequestQueue();
    }

    setupRequestInterceptor(api: any): void {
        api.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = this.tokenManager.getAccessToken();
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );
    }

    setupResponseInterceptor(api: any): void {
        api.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                return this.handleResponseError(api, error);
            }
        );
    }

    private async handleResponseError(api: any, error: AxiosError): Promise<any> {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (this.isTokenExpiredError(error) && !originalRequest._retry) {
            return this.handleTokenExpiration(api, originalRequest);
        }

        return Promise.reject(error);
    }

    private isTokenExpiredError(error: AxiosError): boolean {
        return error.response?.status === 403;
    }

    private async handleTokenExpiration(api: any, originalRequest: any): Promise<any> {
        if (this.isRefreshing) {
            return this.addToQueue(api, originalRequest);
        }

        return this.refreshTokenAndRetry(api, originalRequest);
    }

    private addToQueue(api: any, originalRequest: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.requestQueue.add(resolve, reject);
        }).then(token => {
            this.updateRequestHeaders(originalRequest, token as string);
            return api(originalRequest);
        });
    }

    private async refreshTokenAndRetry(api: any, originalRequest: any): Promise<any> {
        originalRequest._retry = true;
        this.isRefreshing = true;

        try {
            const newAccessToken = await this.tokenManager.refreshToken();
            this.updateRequestHeaders(originalRequest, newAccessToken);
            this.requestQueue.processAll(null, newAccessToken);
            return api(originalRequest);

        } catch (refreshError) {
            this.requestQueue.processAll(refreshError, null);
            this.tokenManager.clearAllTokens();
            // window.location.href = '/login';
            return Promise.reject(refreshError);

        } finally {
            this.isRefreshing = false;
        }
    }

    private updateRequestHeaders(request: any, token: string): void {
        if (request.headers) {
            delete request.headers.Authorization;
            request.headers.Authorization = `Bearer ${token}`;
        }
    }
}

// ============================================================================
// API 클라이언트 초기화
// ============================================================================
const logger = new TokenLogger();
const tokenManager = new TokenManager(logger);
const interceptor = new HttpInterceptor(tokenManager);

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

interceptor.setupRequestInterceptor(api);
interceptor.setupResponseInterceptor(api);

// 개발자 도구용 전역 함수
(window as any).getTokenLogs = () => logger.getLogs();
(window as any).clearTokenLogs = () => logger.clearLogs();

export default api;