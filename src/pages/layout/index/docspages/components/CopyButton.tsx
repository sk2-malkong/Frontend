import React, { useState } from "react";
import styled from "styled-components";

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
