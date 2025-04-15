import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3306/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 회원가입 요청
export const signup = async (data) => {
  return await instance.post('/signup', data);
};

// 아이디 중복 검사
export const checkId = async (id) => {
  return await instance.get(`/checkId?id=${id}`);
};

// 닉네임 중복 검사
export const checkName = async (username) => {
  return await instance.get(`/checkName?username=${username}`);
};

export default instance;
