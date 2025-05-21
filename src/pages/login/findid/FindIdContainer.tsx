import React, { useState } from 'react';
import S from './style';
import { useForm } from 'react-hook-form';
import auth from '../../api/auth';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
}

const FindIdContainer: React.FC = () => {
  const [foundId, setFoundId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setFoundId('');
    setErrorMessage('');
    try {
      const res = await auth.findId(data.email);
      setFoundId(res);
    } catch (err) {
      setErrorMessage('❌ 해당 이메일로 가입된 계정을 찾을 수 없습니다.');
    }
  };

  return (
      <S.LoginPageWrapper>
        <S.LoginBox>
          {!foundId ? (
              <>
                <h2 style={{ textAlign: 'center' }}>아이디 찾기</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <S.Input
                      type="email"
                      placeholder="이메일"
                      {...register("email", {
                        required: '이메일을 입력해주세요.',
                        pattern: {
                          value: emailRegex,
                          message: '올바른 이메일 형식을 입력해주세요.',
                        },
                      })}
                  />
                  {isSubmitted && errors.email && (
                      <p style={{ color: 'red' }}>{errors.email.message}</p>
                  )}
                  {isSubmitted && errorMessage && (
                      <p style={{ color: 'red' }}>{errorMessage}</p>
                  )}
                  <S.LoginButton type="submit">아이디 찾기</S.LoginButton>
                </form>
              </>
          ) : (
              <>
                <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>
                  당신의 ID는 <strong>{foundId}</strong> 입니다.
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <S.LoginButton onClick={() => navigate('/login')}>
                    로그인 바로가기
                  </S.LoginButton>
                  <S.LoginButton onClick={() => navigate('/post/main')}>
                    메인페이지 바로가기
                  </S.LoginButton>
                </div>
              </>
          )}
        </S.LoginBox>
      </S.LoginPageWrapper>
  );
};

export default FindIdContainer;