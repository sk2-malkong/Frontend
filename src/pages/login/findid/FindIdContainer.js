import React, { useState } from 'react';
import S from '../findid/style';
import { useForm } from 'react-hook-form';
import auth from '../../api/auth';

const FindIdContainer = () => {
  const [resultMessage, setResultMessage] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setResultMessage('');
    try {
      const res = await auth.findId(data.email); // 실제 서버 요청
      setResultMessage(res); // ex: "회원님의 아이디는 testuser입니다."
    } catch (err) {
      setResultMessage('❌ 해당 이메일로 가입된 계정을 찾을 수 없습니다.');
    }
  };

  return (
    <S.LoginPageWrapper>
      <S.LoginBox>
        <h2 style={{ textAlign: 'center' }}>아이디 찾기</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.Input
            type="email"
            placeholder="이메일"
            {...register("email", {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: emailRegex,
                message: '올바른 이메일 형식을 입력해주세요.'
              }
            })}
          />
          {isSubmitted && errors.email && (
            <p style={{ color: 'red' }}>{errors.email.message}</p>
          )}
          {isSubmitted && resultMessage && (
            <p style={{ color: resultMessage.startsWith('❌') ? 'red' : 'green' }}>
              {resultMessage}
            </p>
          )}
          <S.LoginButton type="submit">아이디 찾기</S.LoginButton>
        </form>
      </S.LoginBox>
    </S.LoginPageWrapper>
  );
};

export default FindIdContainer;
