import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api"; // EC2나 원격 백엔드 서버 주소

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true // 인증/세션 등 쿠키 기반 인증을 사용하는 경우에 필요
});

export default api;