import React, { useState } from "react";
import styled from "styled-components";

interface CopyButtonProps {
  text: string;
}

function copyWithExecCommand(text: string): boolean {
  try {
    // 1. 임시 요소 생성
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // 2. 스타일 설정 (숨김)
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';

    // 3. DOM에 추가
    document.body.appendChild(textArea);

    // 4. 포커스 및 선택
    textArea.focus();
    textArea.select();

    // 5. 복사 실행
    const successful = document.execCommand('copy');

    // 6. 정리
    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error('execCommand 복사 실패:', error);
    return false;
  }
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const success = copyWithExecCommand(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <StyledButton onClick={handleCopy}>
      {copied ? "복사됨!" : "복사"}
    </StyledButton>
  );
};

export default CopyButton;

const StyledButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background-color: transparent;
  border: 1px solid #1A73E8;
  color: #1A73E8;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: #e8f0fe;
  }
`;
