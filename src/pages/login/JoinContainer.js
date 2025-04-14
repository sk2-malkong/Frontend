import React, { useState } from 'react';
import S from './joinstyle';
import Checkbox from '../login/component/Checkbox'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const JoinContainer = () => {
  const [buttonColor, setButtonColor] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!buttonColor) {
      alert("약관에 동의해야 회원가입이 가능합니다.");
      return;
    }

    const { id, username, email, pw } = data;

    try {
      const res = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, username, email, pw })
      });

      const result = await res.json();
      if (res.ok) {
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      } else {
        alert(result.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const password = watch("pw");
  return (
    <S.JoinPageWrapper className='JoinPageWrapper'>
       <S.JoinBox>
        <h2 style={{ textAlign: 'center' }}>회원가입</h2>
        <div className='idWrapper'>
        <S.Input type="text" placeholder="아이디"
              {...register("id", { required: true })} />
            {errors.id && <p>아이디를 입력해주세요.</p>}
            <p>영문 소문자 또는 영문 소문자+숫자 조합 6~12자리</p>
        </div>
        <div className='usernameWrapper'>
            <S.Input type="text" placeholder="닉네임"
              {...register("username", { required: true })} />
            {errors.username && <p>닉네임을 입력해주세요.</p>}
          </div>
        <div className='passwordWrapper'>
        <S.Input type="password" placeholder="비밀번호"
              {...register("pw", { required: true })} />
            {errors.pw && <p>비밀번호를 입력해주세요.</p>}
            <p>영문, 숫자, 특수문자(!@#$%^&*) 조합 8~15자리</p>
        </div>
        <div className='passwordConfirmWrapper'>
            <S.Input type="password" placeholder="비밀번호 확인"
              {...register("pwConfirm", {
                required: true,
                validate: value => value === password || "비밀번호가 일치하지 않습니다."
              })} />
            {errors.pwConfirm && <p>{errors.pwConfirm.message}</p>}
          </div>
          <div className='emailWrapper'>
            <S.Input type="email" placeholder="이메일"
              {...register("email", { required: true })} />
            {errors.email && <p>이메일을 입력해주세요.</p>}
          </div>


        <S.Notice>필수 입력 항목을 모두 포함하여 등록해주세요.</S.Notice>
        <Checkbox setButtonColor={setButtonColor}/>
        <S.Button>가입하기</S.Button>
      </S.JoinBox>
      
    </S.JoinPageWrapper>
  );
};

export default JoinContainer;