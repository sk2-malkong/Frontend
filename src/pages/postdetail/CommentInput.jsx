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

const Wrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px 0 0 8px;
  outline: none;
  font-size: 1rem;
  color: #000;
  background-color: #fff;

  &::placeholder {
    color: #aaa;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  background: #2f80ed;
  color: #fff;
  font-weight: bold;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #1f6fe0;
  }
`;
