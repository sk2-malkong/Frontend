import React, { useState } from 'react';
import S from '../findid/style';
import { useForm } from 'react-hook-form';

const FindIdContainer = () => {
  const [notFound, setNotFound] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const onSubmit = async (data) => {
    setNotFound(false);

    // 실제로는 서버에 이메일 조회 요청을 보내야 합니다
    // 여기선 임시로 email이 test@example.com만 존재한다고 가정
    if (data.email !== 'test@example.com') {
      setNotFound(true);
    } else {
      alert('해당 이메일로 가입된 아이디가 존재합니다!');
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
          {isSubmitted && !errors.email && notFound && (
            <p style={{ color: 'red' }}>이메일이 존재하지 않습니다.</p>
          )}

          <S.LoginButton type="submit">아이디 찾기</S.LoginButton>
        </form>
      </S.LoginBox>
    </S.LoginPageWrapper>
  );
};

export default FindIdContainer;