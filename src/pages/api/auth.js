import api from './axios';

// 회원가입
const signup = async (id, username, email, pw) => {
  try {
    const res = await api.post('/auth/signup', {
      id,
      username,
      email,
      pw,
    });
    console.log('회원가입 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('회원가입 실패:', error.response?.data || error.message);
    throw error.response?.data || new Error('회원가입 실패');
  }
};

// 로그인
const login = async (id, pw) => {
  try {
    console.log('로그인 요청:', { id, pw });

    const response = await api.post('/auth/login', { id, pw }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const accessToken = response.headers['authorization']?.replace('Bearer ', '');
    const refreshToken = response.headers['refresh-token'];
    const userInfo = response.data.userDto || response.data.user || {};

    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    if (userInfo.email) localStorage.setItem('email', userInfo.email);

    console.log('로그인 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('로그인 실패:', error.response?.data || error.message);
    throw error.response?.data || new Error('로그인에 실패했습니다.');
  }
};

// 로그아웃
const logout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    await api.post('/api/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    console.log('로그아웃 완료');
  } catch (error) {
    console.error('로그아웃 실패:', error.response?.data || error.message);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
  }
};

// 아이디 찾기 (이메일로)
const findId = async (email) => {
  try {
    const res = await api.post('/auth/findId', { email });
    console.log('아이디 찾기 성공:', res.data);
    return res.data; // ex: "회원님의 아이디는 testuser입니다."
  } catch (error) {
    console.error('아이디 찾기 실패:', error.response?.data || error.message);
    throw error.response?.data || new Error('아이디 찾기에 실패했습니다.');
  }
};

// 비밀번호 재설정
const resetPassword = async (id, email, newPw) => {
  try {
    const res = await api.post('/auth/resetPassword', {
      id,
      email,
      newPw,
    });
    console.log('비밀번호 재설정 성공:', res.data);
    return res.data; // ex: "비밀번호가 성공적으로 재설정되었습니다."
  } catch (error) {
    console.error('비밀번호 재설정 실패:', error.response?.data || error.message);
    throw error.response?.data || new Error('비밀번호 재설정에 실패했습니다.');
  }
};
// 아이디 중복 확인
const checkId = async (id) => {
  try {
    const res = await api.get(`/auth/checkId`, { params: { id } });
    return res.data.message || "사용 가능한 아이디입니다.";
  } catch (error) {
    throw new Error("이미 사용 중인 아이디입니다.");
  }
};

// 닉네임 중복 확인
const checkName = async (username) => {
  try {
    const res = await api.get(`/auth/checkName`, { params: { username } });
    return res.data.message || "사용 가능한 닉네임입니다.";
  } catch (error) {
    throw new Error("이미 사용 중인 닉네임입니다.");
  }
};

// 내보내기
export default {
  signup,
  login,
  logout,
  findId,
  resetPassword,
  checkId,
  checkName
};
