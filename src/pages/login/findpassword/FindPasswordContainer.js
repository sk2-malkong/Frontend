import React, { useState } from 'react';
import S from '../findpassword/style';
import { useForm } from 'react-hook-form';

const FindPasswordContainer = () => {
  const [matchMessage, setMatchMessage] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm();

  const password = watch("pw");
  const confirmPassword = watch("pwConfirm");

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setValue("pwConfirm", value);
    if (password && value) {
      setMatchMessage(password === value ? '✅ 비밀번호가 일치합니다.' : '❌ 비밀번호가 일치하지 않습니다.');
    } else {
      setMatchMessage('');
    }
  };

  const onSubmit = async (data) => {
    if (data.pw !== data.pwConfirm) {
      alert("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }

    alert("비밀번호 재설정 요청 전송 완료");
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
            <p style={{ marginTop: '4px' }}>{isSubmitted && errors.id && <span style={{ color: 'red' }}>{errors.id.message}</span>}</p>
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
            <p style={{ marginTop: '4px' }}>{isSubmitted && errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}</p>
          </div>

          <div>
            <S.Input
              type="password"
              placeholder="비밀번호"
              {...register("pw", {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: passwordRegex,
                  message: '조건이 맞지 않습니다.'
                }
              })}
            />
            <p style={{ marginTop: '4px' }}>{isSubmitted && errors.pw && <span style={{ color: 'red' }}>{errors.pw.message}</span>}</p>
            <p style={{ fontSize: '12px', marginTop: '4px', }}>
              영문, 숫자, 특수문자(!@#$%^&*) 조합 8~15자리
            </p>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <S.Input
              type="password"
              placeholder="비밀번호 재확인"
              {...register("pwConfirm", { required: '비밀번호를 한 번 더 입력해주세요.' })}
              onChange={handleConfirmPasswordChange}
            />
            <p style={{ marginTop: '4px' }}>{isSubmitted && errors.pwConfirm && <span style={{ color: 'red' }}>{errors.pwConfirm.message}</span>}</p>
            <p style={{ marginTop: '4px' }}>{matchMessage && (
              <span style={{ color: matchMessage.includes("✅") ? "green" : "red" }}>{matchMessage}</span>
            )}</p>
          </div>

          <S.Button type="submit">비밀번호 재설정</S.Button>
        </form>
      </S.JoinBox>
    </S.JoinPageWrapper>
  );
};

export default FindPasswordContainer;
