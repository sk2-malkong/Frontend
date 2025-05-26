import axios from "axios";
import api from "./axios";

// 로그인 요청 데이터 타입
interface LoginRequest {
  id: string;
  password: string;
}


// 회원가입 요청 데이터 타입
interface RegisterRequest {
  id: string;
  password: string;
  username: string;
  email: string;
}
interface BadWord {
  word: string;
  count: number;
}
interface AbuseTotal {
  total_abuse_count: number;
}

// 사용자 프로필 타입
export interface UserProfile {
  userId: number;
  id: string;
  username: string;
  email: string;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
  comments?: any[];
  endDate?: string | null;     // ✅ 이용 제한 만료일 (변경됨)
  isActive: boolean;           // ✅ 현재 계정 제한 여부
}

// 로그인
const login = async (id: string, pw: string): Promise<any> => {
  try {
    const response = await api.post("/auth/login", { id, pw }, {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = response.data;

    // ✅ endDate 저장
    if (data.endDate) {
      localStorage.setItem("penaltyEndDate", data.endDate);
    }

    // 토큰 및 사용자 정보 저장
    const accessToken = response.headers['authorization']?.replace('Bearer ', '');
    const refreshToken = response.headers['refresh-token'];
    const userInfo = data.userDto || data.user || {};

    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    if (userInfo.email) localStorage.setItem("email", userInfo.email);
    if (userInfo.username) localStorage.setItem("username", userInfo.username); // ✅ 닉네임 저장

    return data;
  } catch (error: any) {
    console.error("로그인 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "로그인에 실패했습니다.");
  }
};

// 회원가입 (signup) 수정한 부분 api 수정
const signup = async ({ id, username, email, pw }: { id: string; username: string; email: string; pw: string }): Promise<any> => {
  const res = await api.post("/auth/signup", { id, username, email, pw });
  return res.data;
};

// 사용자 프로필 조회 함수
const profile = async (): Promise<UserProfile> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await api.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Cache-Control": "no-cache", // ✅ 캐시 방지: 항상 최신 정보 요청
    },
  });
  return response.data;
};

// 로그아웃
const logout = async (): Promise<void> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    await api.post("/api/auth/logout", {}, {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    console.log("로그아웃 완료");
  } catch (error: any) {
    console.error("로그아웃 실패:", error.response?.data || error.message);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    localStorage.removeItem("username");         // ✅ 닉네임 제거
    localStorage.removeItem("id");
    localStorage.removeItem("penaltyEndDate");  // ✅ 제한정보 제거
  }
};

// 토큰 재발급
// const refreshAccessToken = async (): Promise<string> => {
//   const refreshToken = localStorage.getItem("refreshToken");
//   const response = await api.post("/auth/refresh", { refreshToken });
//   const newAccessToken = response.headers["access-token"]?.replace("Bearer ", "");
//   const newRefreshToken = response.headers["refresh-token"];
//   if (newAccessToken) localStorage.setItem("accessToken", newAccessToken);
//   if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);
//   return newAccessToken!;
// };

// 아이디 찾기
const findId = async (email: string): Promise<any> => {
  const res = await api.post("/auth/findId", { email });
  return res.data;
};

// 비밀번호 재설정
const resetPassword = async (id: string, email: string, newPw: string): Promise<any> => {
  const res = await api.post("/auth/resetPassword", { id, email, newPw });
  return res.data;
};

// 아이디 중복 확인
const checkId = async (id: string): Promise<string> => {
  const res = await api.get("/auth/checkId", { params: { id } });
  return res.data.message || "사용 가능한 아이디입니다.";
};

// 닉네임 중복 확인
const checkName = async (username: string): Promise<string> => {
  const res = await api.get("/auth/checkName", { params: { username } });
  return res.data.message || "사용 가능한 닉네임입니다.";
}

// 욕 종류별 count 목록 조회
const countBadwords = async (): Promise<{ badwords: BadWord[] }> => {
  const res = await axios.get("http://3.37.74.62:8001/badwords");
  return res.data;
};
// 총합 욕
const getAbuseTotal = async (): Promise<AbuseTotal> => {
  const res = await axios.get("http://3.37.74.62:8001/abuse-total");
  return res.data;
};




// ✅ 전체 auth 객체 export
const auth = {
  login,
  signup,
  profile,
  logout,
  findId,
  resetPassword,
  checkId,
  checkName,
  countBadwords,
  getAbuseTotal
};

export default auth;