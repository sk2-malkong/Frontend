import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #ffffff;
  margin-bottom: 1rem;
`;

export const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 0 0.5rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 0.75rem;
  margin-right: 0.5rem;
  font-size: 0.95rem;
  background-color: #ffffff;
  color: ${({ $active }) => ($active ? "#1A73E8" : "#5f6368")};
  border: none;
  border-bottom: ${({ $active }) =>
    $active ? "3px solid #1A73E8" : "3px solid transparent"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #1a73e8;
  }
`;

export const CodeBlock = styled.div`
  position: relative;
  padding: 1.5rem 1rem 1rem 1rem;
  background-color: #f5f7fa;
  font-family: 'Source Code Pro', 'Consolas', 'Courier New', monospace;
  font-size: 0.95rem;
  overflow-x: auto;

  pre, code {
    margin: 0;
    font-family: 'Source Code Pro', 'Consolas', 'Courier New', monospace !important;
    color: #2d2d2d;
  }
`;
