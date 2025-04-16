import api from './axios';

//회원가입
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

//로그인
 const login = async (id, pw) => {
  try {
    console.log('로그인 요청:', { id, pw });

    const response = await api.post('/auth/login', { id, pw }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //토큰 저장
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

//로그아웃
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

export default {signup ,login,logout} ;