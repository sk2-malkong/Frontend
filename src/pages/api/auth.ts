import api from './axios';

interface SignupData {
  id: string;
  username: string;
  email: string;
  pw: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userDto: {
    username: string;
    email: string;
  };
}

interface UserProfile {
  username: string;
  email: string;
  badWordCount: number;
}

// 회원가입
const signup = async ({ id, username, email, pw }: SignupData): Promise<any> => {
  try {
    const res = await api.post('/auth/signup', { id, username, email, pw });
    console.log('회원가입 성공:', res.data);
    return res.data;
  } catch (error: any) {
    const serverMessage = error.response?.data?.message || error.response?.data || error.message;
    console.error('회원가입 실패:', serverMessage);
    throw new Error(serverMessage);
  }
};

// 로그인
const login = async (id: string, pw: string): Promise<any> => {
  try {
    const response = await api.post('/auth/login', { id, pw }, {
      headers: { 'Content-Type': 'application/json' },
    });

    const accessToken = response.headers['authorization']?.replace('Bearer ', '');
    const refreshToken = response.headers['refresh-token'];
    const userInfo = response.data.userDto || response.data.user || {};

    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    if (userInfo.email) localStorage.setItem('email', userInfo.email);
    if (userInfo.username) localStorage.setItem('username', userInfo.username);

    return response.data;
  } catch (error: any) {
    console.error('로그인 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
  }
};

// 토큰 재발급
const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('저장된 RefreshToken이 없습니다.');
    }
    console.log('🔄 [재발급 요청] RefreshToken:', refreshToken);

    const response = await api.post('/auth/refresh', {
      refreshToken: refreshToken
    });

    const newAccessToken = response.headers['access-token']?.replace('Bearer ', '');
    const newRefreshToken = response.headers['refresh-token'];

    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
    }
    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken);
    }

    console.log('🔁 AccessToken 재발급 완료');
    return newAccessToken!;
  } catch (error: any) {
    console.error('❌ AccessToken 재발급 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'AccessToken 재발급에 실패했습니다.');
  }
};

// 로그아웃
const logout = async (): Promise<void> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await api.post('/api/auth/logout', {}, {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    console.log('로그아웃 완료');
  } catch (error: any) {
    console.error('로그아웃 실패:', error.response?.data || error.message);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
  }
};

// 아이디 찾기
const findId = async (email: string): Promise<any> => {
  try {
    const res = await api.post('/auth/findId', { email });
    console.log('아이디 찾기 성공:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('아이디 찾기 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '아이디 찾기에 실패했습니다.');
  }
};

// 비밀번호 재설정
const resetPassword = async (id: string, email: string, newPw: string): Promise<any> => {
  try {
    const res = await api.post('/auth/resetPassword', { id, email, newPw });
    console.log('비밀번호 재설정 성공:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('비밀번호 재설정 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '비밀번호 재설정에 실패했습니다.');
  }
};

// 아이디 중복 확인
const checkId = async (id: string): Promise<string> => {
  try {
    const res = await api.get('/auth/checkId', { params: { id } });
    return res.data.message || "사용 가능한 아이디입니다.";
  } catch (error: any) {
    console.error('아이디 중복확인 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '이미 사용 중인 아이디입니다.');
  }
};

// 닉네임 중복 확인
const checkName = async (username: string): Promise<string> => {
  try {
    const res = await api.get('/auth/checkName', { params: { username } });
    return res.data.message || "사용 가능한 닉네임입니다.";
  } catch (error: any) {
    console.error('닉네임 중복확인 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '이미 사용 중인 닉네임입니다.');
  }
};

// 프로필 조회
const profile = async (): Promise<UserProfile> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('AccessToken이 없습니다.');
    }

    const res = await api.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    console.error('프로필 조회 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '프로필 조회에 실패했습니다.');
  }
};

const auth = {
  signup,
  login,
  logout,
  findId,
  resetPassword,
  checkId,
  checkName,
  profile,
  refreshAccessToken
};

export default auth;
