import React, { useState } from 'react';
import S from './joinstyle';
import Checkbox from '../login/component/Checkbox';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../api/auth';

const JoinContainer = () => {
  const navigate = useNavigate();

  const [buttonColor, setButtonColor] = useState(false);
  const [matchMessage, setMatchMessage] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [idChecked, setIdChecked] = useState(false);
  const [nameChecked, setNameChecked] = useState(false);

  const { register, handleSubmit, setValue, getValues, trigger, formState: { errors } } = useForm({ mode: 'onChange' });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const onSubmit = async (data) => {
    if (!buttonColor) {
      alert('약관에 동의해야 회원가입이 가능합니다.');
      return;
    }
    if (!idChecked) {
      alert('아이디 중복확인을 해주세요.');
      return;
    }
    if (!nameChecked) {
      alert('닉네임 중복확인을 해주세요.');
      return;
    }
    if (data.pw !== data.pwConfirm) {
      alert('❌ 비밀번호가 일치하지 않습니다.');
      return;
    }

    const { id, username, email, pw } = data;
    try {
      await auth.signup(id, username, email, pw);
      localStorage.setItem('username', username);
      localStorage.setItem('id', id);
      alert('✅ 회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setValue('pwConfirm', value);
    const pw = getValues('pw');
    if (pw && value) {
      setMatchMessage(pw === value ? '✅ 비밀번호가 일치합니다.' : '❌ 비밀번호가 일치하지 않습니다.');
    } else {
      setMatchMessage('');
    }
  };

  const checkIdDuplicate = async () => {
    const id = getValues('id');
    if (!id) return alert('아이디를 입력해주세요.');
    try {
      const message = await auth.checkId(id);
      setIdMessage(message);
      setIdChecked(true);
    } catch (err) {
      setIdMessage(err.message);
      setIdChecked(false);
    }
  };

  const checkNameDuplicate = async () => {
    const username = getValues('username');
    if (!username) return alert('닉네임을 입력해주세요.');
    try {
      const message = await auth.checkName(username);
      setNameMessage(message);
      setNameChecked(true);
    } catch (err) {
      setNameMessage(err.message);
      setNameChecked(false);
    }
  };

  return (
    <S.JoinPageWrapper>
      <S.JoinContent>
        <S.LogoWrapper onClick={() => { navigate('/main'); window.location.reload(); }}>
          <img src="../logo/logo3.png" alt="로고" />
        </S.LogoWrapper>

        <S.JoinBox>
          <h2 style={{ textAlign: 'center' }}>회원가입</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 아이디 */}
            <S.InputWrapper>
              <S.InputWithButton>
                <S.Input
                  type="text"
                  placeholder="아이디"
                  {...register('id', { required: '아이디를 입력해주세요.' })}
                />
                <S.CheckButton type="button" onClick={checkIdDuplicate}>중복확인</S.CheckButton>
              </S.InputWithButton>
              {errors.id && <S.ErrorMessage>{errors.id.message}</S.ErrorMessage>}
              {idMessage && <S.StatusMessage $success={idMessage.includes('가능')}>{idMessage}</S.StatusMessage>}
            </S.InputWrapper>

            {/* 닉네임 */}
            <S.InputWrapper>
              <S.InputWithButton>
                <S.Input
                  type="text"
                  placeholder="닉네임"
                  {...register('username', { required: '닉네임을 입력해주세요.' })}
                />
                <S.CheckButton type="button" onClick={checkNameDuplicate}>중복확인</S.CheckButton>
              </S.InputWithButton>
              {errors.username && <S.ErrorMessage>{errors.username.message}</S.ErrorMessage>}
              {nameMessage && <S.StatusMessage $success={nameMessage.includes('가능')}>{nameMessage}</S.StatusMessage>}
            </S.InputWrapper>

            {/* 비밀번호 */}
            <S.InputWrapper>
              <S.Input
                type="password"
                placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
                {...register('pw', {
                  required: '비밀번호를 입력해주세요.',
                  pattern: { value: passwordRegex, message: '비밀번호 형식이 올바르지 않습니다.' }
                })}
                $isValid={!errors.pw}
                onChange={(e) => {
                  setValue('pw', e.target.value);
                  trigger('pw');
                }}
              />
              <S.PasswordConditionText $isValid={!errors.pw}>
                영문, 숫자, 특수문자 조합 8자 이상 입력
              </S.PasswordConditionText>
              {errors.pw && <S.ErrorMessage>{errors.pw.message}</S.ErrorMessage>}
            </S.InputWrapper>

            {/* 비밀번호 확인 */}
            <S.InputWrapper>
              <S.Input
                type="password"
                placeholder="비밀번호 확인"
                {...register('pwConfirm', { required: '비밀번호 확인을 입력해주세요.' })}
                onChange={handleConfirmPasswordChange}
                $isValid={!errors.pwConfirm}
              />
              {errors.pwConfirm && <S.ErrorMessage>{errors.pwConfirm.message}</S.ErrorMessage>}
              {matchMessage && (
                <S.StatusMessage $success={matchMessage.includes('✅')}>
                  {matchMessage}
                </S.StatusMessage>
              )}
            </S.InputWrapper>

            {/* 이메일 */}
            <S.InputWrapper>
              <S.Input
                type="email"
                placeholder="이메일"
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: { value: emailRegex, message: '올바른 이메일 형식을 입력해주세요.' }
                })}
              />
              {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}
            </S.InputWrapper>

            {/* 약관 동의 */}
            <Checkbox setButtonColor={setButtonColor} />
            <S.Button type="submit">가입하기</S.Button>
          </form>

        </S.JoinBox>
      </S.JoinContent>
    </S.JoinPageWrapper>
  );
};

export default JoinContainer;
