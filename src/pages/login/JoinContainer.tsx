import React, { useState } from 'react';
import S from './joinstyle';
import Checkbox from './component/Checkbox';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../api/auth';

interface FormData {
  id: string;
  username: string;
  email: string;
  pw: string;
  pwConfirm: string;
}

const JoinContainer: React.FC = () => {
  const navigate = useNavigate();

  const [buttonColor, setButtonColor] = useState<boolean>(false);
  const [matchMessage, setMatchMessage] = useState<string>('');
  const [idMessage, setIdMessage] = useState<string>('');
  const [nameMessage, setNameMessage] = useState<string>('');
  const [idChecked, setIdChecked] = useState<boolean>(false);
  const [nameChecked, setNameChecked] = useState<boolean>(false);

  const { register, handleSubmit, setValue, getValues, trigger, formState: { errors } } = useForm<FormData>({ mode: 'onChange' });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const onSubmit = async (data: FormData) => {
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
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const { id, username, email, pw } = data;
    try {
      // 수정: auth.signup 함수에 객체 형태로 데이터 전달
      await auth.signup({ id, username, email, pw });
      localStorage.setItem('username', username);
      localStorage.setItem('id', id);
      alert('✅ 회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue('pwConfirm', value);
    const pw = getValues('pw');
    if (pw && value) {
      setMatchMessage(pw === value ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.');
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
    } catch (err: any) {
      console.log(err);
      // 서버 응답에서 메시지 추출
      let errorMessage = '아이디 중복확인 중 오류가 발생했습니다.';

      if (err.response && err.response.data) {
        // axios 에러 응답의 경우
        errorMessage = err.response.data.message || err.response.data.error || err.response.data;
      } else if (err.message) {
        // 일반 에러 메시지
        errorMessage = err.message;
      }

      setIdMessage(errorMessage);
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
    } catch (err: any) {
      console.log(err);
      // 서버 응답에서 메시지 추출
      let errorMessage = '닉네임 중복확인 중 오류가 발생했습니다.';

      if (err.response && err.response.data) {
        // axios 에러 응답의 경우
        errorMessage = err.response.data.message || err.response.data.error || err.response.data;
      } else if (err.message) {
        // 일반 에러 메시지
        errorMessage = err.message;
      }

      setNameMessage(errorMessage);
      setNameChecked(false);
    }
  };

  return (
      <S.JoinPageWrapper>
        <S.JoinContent>
          <S.LogoWrapper onClick={() => { navigate('/post/main'); window.location.reload(); }}>
            <h2>Purgo</h2>
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
                {idMessage && (
                    // styled-component 대신 일반 p 태그 사용
                    <p style={{ color: idMessage.includes('가능') ? 'green' : 'red', fontSize: '14px', marginTop: '5px' }}>
                      {idMessage}
                    </p>
                )}
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
                {nameMessage && (
                    // styled-component 대신 일반 p 태그 사용
                    <p style={{ color: nameMessage.includes('가능') ? 'green' : 'red', fontSize: '14px', marginTop: '5px' }}>
                      {nameMessage}
                    </p>
                )}
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
                    // styled-component 속성 대신 일반 style 사용
                    style={{ borderColor: errors.pw ? 'red' : '#ddd' }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue('pw', e.target.value);
                      trigger('pw');
                    }}
                />
                {/* styled-component 대신 일반 p 태그 사용 */}
                <p style={{ fontSize: '14px', color: errors.pw ? '#666' : '#666', marginTop: '5px' }}>
                  영문, 숫자, 특수문자 조합 8자 이상 입력
                </p>
                {errors.pw && <S.ErrorMessage>{errors.pw.message}</S.ErrorMessage>}
              </S.InputWrapper>

              {/* 비밀번호 확인 */}
              <S.InputWrapper>
                <S.Input
                    type="password"
                    placeholder="비밀번호 확인"
                    {...register('pwConfirm', { required: '비밀번호 확인을 입력해주세요.' })}
                    onChange={handleConfirmPasswordChange}
                    style={{ borderColor: errors.pwConfirm ? 'red' : '#ddd' }}
                />
                {errors.pwConfirm && <S.ErrorMessage>{errors.pwConfirm.message}</S.ErrorMessage>}
                {matchMessage && (
                    // styled-component 대신 일반 p 태그 사용
                    <p style={{ color: matchMessage.includes('일치합니다') ? 'green' : 'red', fontSize: '14px', marginTop: '5px' }}>
                      {matchMessage}
                    </p>
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