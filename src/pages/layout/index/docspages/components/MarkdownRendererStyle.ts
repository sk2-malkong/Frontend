import styled from "styled-components";

export const CodeBlockWrapper = styled.div`
  position: relative;
  margin: 1.5rem 0;
`;

export const CopyButton = styled.button<{ copied: boolean }>`
  position: absolute;
  top: 8px;
  right: 12px;
  padding: 4px 8px;
  font-size: 12px;
  background-color: ${({ copied }) => (copied ? "#38a169" : "#1a73e8")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.2s ease-in-out;
`;
