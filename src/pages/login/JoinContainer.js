import React, { useState } from 'react';
import S from './joinstyle';
import Checkbox from '../login/component/Checkbox';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../api/auth';

const JoinContainer = () => {
  const [buttonColor, setButtonColor] = useState(false);
  const [matchMessage, setMatchMessage] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitted },
  } = useForm();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const onSubmit = async (data) => {
    if (!buttonColor) {
      alert("약관에 동의해야 회원가입이 가능합니다.");
      return;
    }

    if (data.pw !== data.pwConfirm) {
      alert("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }

    const { id, username, email, pw } = data;

    try {
      await auth.signup(id, username, email, pw);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      alert(error.message || '회원가입 도중 오류가 발생했습니다.');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setValue("pwConfirm", value);
    const pw = getValues("pw");
    if (pw && value) {
      setMatchMessage(pw === value ? '✅ 비밀번호가 일치합니다.' : '❌ 비밀번호가 일치하지 않습니다.');
    } else {
      setMatchMessage('');
    }
  };

  const checkIdDuplicate = async () => {
    const id = getValues("id");
    if (!id) return alert("아이디를 입력해주세요.");
    try {
      const message = await auth.checkId(id);
      setIdMessage(message);
    } catch (err) {
      setIdMessage(err.message);
    }
  };

  const checkNameDuplicate = async () => {
    const username = getValues("username");
    if (!username) return alert("닉네임을 입력해주세요.");
    try {
      const message = await auth.checkName(username);
      setNameMessage(message);
    } catch (err) {
      setNameMessage(err.message);
    }
  };

  return (
    <S.JoinPageWrapper>
      <S.JoinContent>
        <S.LogoWrapper>
          <img src='../logo/logo3.png' alt='로고' />
        </S.LogoWrapper>
        <S.JoinBox>
          <h2 style={{ textAlign: 'center' }}>회원가입</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 아이디 */}
            <div className='idWrapper'>
              <S.Input type="text" placeholder="아이디" {...register("id", { required: true })} />
              <button type="button" onClick={checkIdDuplicate}>중복확인</button>
              {isSubmitted && errors.id && <p style={{ color: 'red' }}>아이디를 입력해주세요.</p>}
              {idMessage && <p style={{ color: idMessage.includes("가능") ? "green" : "red" }}>{idMessage}</p>}
              <p style={{ fontSize: '12px', color: '#888' }}>영문 소문자 또는 영문+숫자 조합 6~12자리</p>
            </div>

            {/* 닉네임 */}
            <div className='usernameWrapper'>
              <S.Input type="text" placeholder="닉네임" {...register("username", { required: true })} />
              <button type="button" onClick={checkNameDuplicate}>중복확인</button>
              {isSubmitted && errors.username && <p style={{ color: 'red' }}>닉네임을 입력해주세요.</p>}
              {nameMessage && <p style={{ color: nameMessage.includes("가능") ? "green" : "red" }}>{nameMessage}</p>}
            </div>

            {/* 비밀번호 */}
            <div className='passwordWrapper'>
              <S.Input type="password" placeholder="비밀번호"
                {...register("pw", {
                  required: true,
                  pattern: { value: passwordRegex, message: '조건이 맞지 않습니다' }
                })} />
              {isSubmitted && errors.pw && <p style={{ color: 'red' }}>{errors.pw.message}</p>}
              <p style={{ fontSize: '12px', color: isSubmitted && errors.pw ? 'red' : '#888' }}>
                영문, 숫자, 특수문자(!@#) 조합 8자리 이상
              </p>
            </div>

            {/* 비밀번호 확인 */}
            <div className='passwordConfirmWrapper'>
              <S.Input type="password" placeholder="비밀번호 확인"
                {...register("pwConfirm", { required: true })}
                onChange={handleConfirmPasswordChange}
              />
              {isSubmitted && errors.pwConfirm && <p style={{ color: 'red' }}>비밀번호 확인을 입력해주세요.</p>}
              {matchMessage && (
                <p style={{ color: matchMessage.includes("✅") ? "green" : "red" }}>{matchMessage}</p>
              )}
            </div>

            {/* 이메일 */}
            <div className='emailWrapper'>
              <S.Input type="email" placeholder="이메일"
                {...register("email", {
                  required: true,
                  pattern: { value: emailRegex, message: '올바른 이메일 형식을 입력해주세요.' }
                })} />
              {isSubmitted && errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
              <S.Notice>필수 입력 항목을 모두 포함하여 등록해주세요.</S.Notice>
            </div>

            {/* 체크박스 */}
            <Checkbox setButtonColor={setButtonColor} />

            <S.Button type="submit">가입하기</S.Button>
          </form>
        </S.JoinBox>
      </S.JoinContent>
    </S.JoinPageWrapper>
  );
};

export default JoinContainer;
