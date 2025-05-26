import React, { useState } from 'react';
import S from './style';
import { useForm } from 'react-hook-form';
import auth from '../../api/auth';
import { useNavigate } from 'react-router-dom';

interface FormData {
  id: string;
  email: string;
  pw: string;
  pwConfirm: string;
}

const FindPasswordContainer: React.FC = () => {
  const [matchMessage, setMatchMessage] = useState<string>('');
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<FormData>();

  const password = watch("pw");

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("pwConfirm", value);
    if (password && value) {
      setMatchMessage(password === value ? '✅ 비밀번호가 일치합니다.' : '❌ 비밀번호가 일치하지 않습니다.');
    } else {
      setMatchMessage('');
    }
  };

  const onSubmit = async (data: FormData) => {
    if (data.pw !== data.pwConfirm) {
      alert("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await auth.resetPassword(data.id, data.email, data.pw);
      alert("비밀번호가 성공적으로 재설정되었습니다.");
      navigate('/login');
    } catch (err: any) {
      alert(err.message || "비밀번호 재설정에 실패했습니다.");
    }
  };

  return (
      <S.JoinPageWrapper>
        <S.JoinBox>
          <h2 style={{ textAlign: 'center' }}>비밀번호 재설정</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: '25px' }}>
              <S.Input
                  type="text"
                  placeholder="아이디"
                  {...register("id", { required: '아이디를 입력해주세요.' })}
              />
              {isSubmitted && errors.id && <p style={{ color: 'red' }}>{errors.id.message}</p>}
            </div>

            <div style={{ marginBottom: '25px' }}>
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
              {isSubmitted && errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
              <S.Input
                  type="password"
                  placeholder="새 비밀번호"
                  {...register("pw", {
                    required: '비밀번호를 입력해주세요.',
                    pattern: {
                      value: passwordRegex,
                      message: '조건이 맞지 않습니다.'
                    }
                  })}
              />
              {isSubmitted && errors.pw && <p style={{ color: 'red' }}>{errors.pw.message}</p>}
              <p style={{ fontSize: '12px', marginTop: '4px' }}>
                영문, 숫자, 특수문자(!@#) 조합 8자리 이상
              </p>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <S.Input
                  type="password"
                  placeholder="비밀번호 재확인"
                  {...register("pwConfirm", { required: '비밀번호를 한 번 더 입력해주세요.' })}
                  onChange={handleConfirmPasswordChange}
              />
              {isSubmitted && errors.pwConfirm && <p style={{ color: 'red' }}>{errors.pwConfirm.message}</p>}
              {matchMessage && (
                  <p style={{ color: matchMessage.includes("✅") ? "green" : "red" }}>{matchMessage}</p>
              )}
            </div>

            <S.Button type="submit">비밀번호 재설정</S.Button>
          </form>
        </S.JoinBox>
      </S.JoinPageWrapper>
  );
};

export default FindPasswordContainer;