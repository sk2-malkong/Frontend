import React from 'react';
import styled from 'styled-components';

const CommentInput = () => {
  return (
    <Wrapper>
      <Input placeholder="댓글을 입력하세요." />
      <Button>등록</Button>
    </Wrapper>
  );
};

export default CommentInput;

// 전체 입력창을 감싸는 박스
const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f0f0f0;  
  border-radius: 8px;
  margin-top: 20px;
`;

// 입력 필드
const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  outline: none;
  font-size: 1rem;
  color: #000;
  background-color: #f0f0f0;  
  
  &::placeholder {
    color: #aaa;
  }
`;

// 등록 버튼
const Button = styled.button`
  padding: 10px 16px;
  border: none;
  background: #2f80ed;
  color: #fff;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 8px;

  &:hover {
    background: #1f6fe0;
  }
`;
