import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const bubbleRise = keyframes`
  0%   { transform: translateY(100%) scale(0.6); opacity: 0.3; }
  50%  { opacity: 0.5; }
  100% { transform: translateY(-100%) scale(1.2); opacity: 0.1; }
`;

export interface BubbleProps {
  size: number;
  left: number;
  duration: number;
  delay: number;
}

const S = {
  MainWrapper: styled.div`
    position: relative;
    padding: 40px;
    background: #f5faff;
    min-height: 100vh;
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,

  Title: styled.h2`
    font-size: 2rem;
    color: #333;
    margin: 0;
  `,

  Body: styled.div`
    display: flex;
    gap: 24px;
  `,

  TableWrapper: styled.div`
    flex: 1;
  `,

  Table: styled.table`
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    animation: ${fadeIn} 0.5s ease-in;
  `,

  Th: styled.th`
    text-align: left;
    padding: 12px 16px;
    background: #e6f0ff;
    color: #333;
    border-bottom: 1px solid #ddd;
  `,

  Td: styled.td`
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    color: #555;
    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  Pagination: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 24px;
    gap: 8px;

    button {
      background: transparent;
      border: 1px solid #5784e1;
      color: #5784e1;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #5784e1;
        color: #fff;
      }

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }

    button[data-active="true"] {
      color: red;
    }
  `,

  SidebarCard: styled.div`
    width: 260px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.08);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 250px;
  `,

  Avatar: styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #ccc;
    margin-bottom: 16px;
  `,

  Username: styled.h3`
    margin: 0 0 16px;
    font-size: 1.25rem;
    color: #333;
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: 12px;
  `,

  Button: styled.button`
    background: #5784e1;
    color: #fff;
    border: none;
    padding: 10px 16px;
    width: 120px;
    border-radius: 50px;
    cursor: pointer;

    &:hover {
      background: #447acc;
    }
  `,

  Bubble: styled.div<BubbleProps>`
    position: absolute;
    bottom: -150px;
    width: ${p => p.size}px;
    height: ${p => p.size}px;
    background: rgba(255,255,255,0.4);
    border-radius: 50%;
    left: ${p => p.left}%;
    animation: ${bubbleRise} ${p => p.duration}s ease-in infinite;
    animation-delay: ${p => p.delay}s;
  `,
};

export default S;
