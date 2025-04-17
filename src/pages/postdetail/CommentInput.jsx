import React, { useState } from 'react';
import styled from 'styled-components';
import SubmitIcon from './Inputbutton.svg';

const CommentInput = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    const trimmed = comment.trim();
    if (!trimmed) return;

    const newComment = {
      username: 'username_3',
      date: getCurrentDate(),
      text: trimmed,
      profile: null, // 필요 시 이미지 추가
    };

    if (onSubmit) {
      onSubmit(newComment); // 🔹 부모(PostDetail)에게 댓글 전달
    }

    setComment('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 🔸 기본 form 제출 막기
      handleSubmit();
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hour}:${minute}`;
  };

  return (
    <Wrapper>
      <Input
        placeholder="댓글을 입력하세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton onClick={handleSubmit} />
    </Wrapper>
  );
};

export default CommentInput;

// 🔧 스타일은 그대로 유지
const Wrapper = styled.div`
  width: calc(100% + 3.375rem);
  margin-left: -1.875rem;
  margin-right: -1.5rem;
  background-color: #F0F0F0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    width: calc(100% + 2rem);
    margin: 0 -1rem;
    padding: 0.75rem 1rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  background-color: #F0F0F0;
  border: none;
  color: #000;
  outline: none;

  &::placeholder {
    color: #797979;
  }
`;

const IconButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #ffffff;
  background-image: url(${SubmitIcon});
  background-repeat: no-repeat;
  background-position: center;
  border-bottom-right-radius: 0.625rem;
  background-size: 1.2rem 1.2rem;
  border: none;
  cursor: pointer;

  

  @media (max-width: 768px) {
    width: 2.25rem;
    height: 2.25rem;
  }
`;

