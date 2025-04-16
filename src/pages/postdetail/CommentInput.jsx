import React, { useState } from 'react';
import styled from 'styled-components';
import SubmitIcon from './Inputbutton.svg';

const CommentInput = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!comment.trim()) return;
    console.log('댓글 등록:', comment); // 나중에 API 연결
    setComment('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
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

// 댓글과 붙이고 카드 안 양옆 여백도 무시
const Wrapper = styled.div`
  width: calc(100% + 3.375rem); /* 1.875rem + 1.5rem */
  margin-left: -1.875rem;
  margin-right: -1.5rem;
  padding: 0.25rem 0 0.25rem 0;
  background-color: #dedede;
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
  background-color: #dedede;
  border: none;
  color: #000;
  outline: none;

  &::placeholder {
    color: #797979;
  }
`;

const IconButton = styled.button`
  width: 1.75rem;   
  height: 1.75rem;  
  background: url(${SubmitIcon}) no-repeat center center / contain;
  border: none;
  cursor: pointer;
  padding: 0;
`;