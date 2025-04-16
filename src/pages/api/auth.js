
import api from './axios';

const signup = async (id, username, email, pw) => {
  try {
    const res = await api.post('/api/auth/signup', {
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

export default signup;
