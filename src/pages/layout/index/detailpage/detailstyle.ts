import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
export type DropKey = 'none' | 'top' | 'left' | 'right';
import * as React from 'react'

/* 좌표 타입 정의 */
export interface ExpandPosition {
  x: number;
  y: number;
}
export const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  
  body {
    min-height: 100vh;
    background-color: #c2dfff;
    font-family: "Source Sans Pro", sans-serif;
    color: #404040;
  }
  
  .fp-watermark {
    display: none !important;
  }
`;

const dropAnimation = keyframes`
  from { border-radius: 38% 62% 46% 54% / 46% 51% 49% 54%; }
  to   { border-radius: 50%; }
`;
const float = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;
const appearUp = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const appearDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100px);
    opacity: 0;
  }
`;
const fadeOpacity = keyframes`
  from { opacity: 0.3; }
  to { opacity: 1; }
`;


const appearClear = keyframes`
  from {
    filter: blur(8px);
    opacity: 0;
  }
  to {
    filter: blur(0);
    opacity: 1;
  }
`;
export const Background = styled.section<{
  activeDrop?: DropKey;
  expandPosition?: ExpandPosition;
  initialPosition?: ExpandPosition;
}>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c2dfff;

  /* radial expansion layer */
  &::before {
    content: '';
    position: absolute;
    width: 100000px;
    height: 100000px;
    background: #ffd700;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: all 1s ease-out;
    top: ${({ expandPosition, initialPosition }) =>
      expandPosition
        ? `${expandPosition.y}px`
        : initialPosition
          ? `${initialPosition.y}px`
          : '50%'};
    left: ${({ expandPosition, initialPosition }) =>
      expandPosition
        ? `${expandPosition.x}px`
        : initialPosition
          ? `${initialPosition.x}px`
          : '50%'};
    z-index: 0;
  }
  ${({ expandPosition }) =>
    expandPosition &&
    css`
      &::before {
        transform: translate(-50%, -50%) scale(1);
      }
    `}
`;

/* Props 인터페이스 정의 */
export interface DropProps {
  /** 작게 렌더링할지 여부 */
  small?: boolean;
}

/* 4) Drop(물방울) 스타일 */
export const Drop = styled.div<DropProps>`
  width: ${({ small }) => (small ? '330px' : '514px')};
  height: ${({ small }) => (small ? '330px' : '514px')};
  position: relative;
  opacity: 0.3;
  box-shadow:
    inset 20px 20px 20px rgba(0, 0, 0, 0.1),
    25px 35px 20px rgba(0, 0, 0, 0.1),
    25px 30px 30px rgba(0, 0, 0, 0.1),
    inset -20px -20px 25px rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  text-align: center;
  overflow: hidden;
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  filter: blur(8px);
  animation:${appearClear} 0.6s ease-out both,${dropAnimation} 2s infinite alternate ease-in-out;
  border-radius: 38% 62% 46% 54% / 46% 51% 49% 54%;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  h2 {
    font-size: 74px;
    margin: 0;
  }

  p{
    font-weight: bold;
    color: rgb(148 147 147);
  }

  &:active img,
  &:active svg {
    transform: scale(1.2);
  }

  /* 흰 점들 (pseudo-elements) */
  &::before,
  &::after {
    transition: opacity 0.3s ease-in-out 0.1s;
  }
  &::before {
    content: "";
    position: absolute;
    top: 50px;
    left: 75px;
    width: 35px;
    height: 35px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.7;
  }
  &::after {
    content: "";
    position: absolute;
    top: 90px;
    left: 100px;
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.7;
  }
`;

/* 5) Read More 버튼 스타일 */
export const OriginalReadBtn = styled.a`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  color: #333;
  box-shadow:
    inset 1px 1px 3px rgba(255, 255, 255, 0.6),
    inset -1px -1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const SectionSplit = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const Left = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  line-height: 1.4;
  position: relative;
  z-index: 1;

  .count{
    margin-bottom: 20px;
  }
  .count-placeholder{
    height: 33.6px;
    width: 100%;
 
  }
`;

export const DropContainer = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
`;

export const TopCenterDrop = styled(Drop)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -20%);
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  filter: blur(8px);
  animation:
    ${appearClear} 0.6s ease-out both,
    ${dropAnimation} 2s infinite alternate ease-in-out;
  animation-delay: 0s;
  img {
    display: block;
    transition: transform 0.8s ease-in-out;
    transform-origin: center;
    cursor: pointer;
  }
  &:hover {
    &::before,
    &::after {
      opacity: 0;
    }
    box-shadow: none;
    transform: translate(calc(-50% + 25px), calc(-20% + 35px));
    img {
      transform: scale(2.5);
    }
  }
`;
export const BottomLeftDrop = styled(Drop)`
  position: absolute;
  bottom: 10%;
  left: 20%;
  transform: translate(-50%, 20%);
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
    filter: blur(8px);
  animation:
    ${appearClear} 0.6s ease-out both,
    ${dropAnimation} 2s infinite alternate ease-in-out;
  animation-delay: 0.2s;
      img {
    display: block;
    transition: transform 0.5s ease-in-out;
    transform-origin: center;
    cursor: pointer;
  }
    &:hover {
        &::before,
    &::after {
      opacity: 0;
    }
    box-shadow: none;
    transform: translate(calc(-50% + 25px), calc(20% + 35px));
        img {
      transform: scale(2.5);
    }
  }
  
`;
export const BottomRightDrop = styled(Drop)`
  position: absolute;
  bottom: 10%;
  right: 20%;
  transform: translate(50%, 20%);
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  filter: blur(8px);
  animation:
    ${appearClear} 0.6s ease-out both,
    ${dropAnimation} 2s infinite alternate ease-in-out;
  animation-delay: 0.4s;
      svg {
    display: block;
    transition: transform 0.5s ease-in-out;
    transform-origin: center;
    cursor: pointer;
  }

  &:hover {
   &::before,
    &::after {
      opacity: 0;
    }
    box-shadow: none;
    transform: translate(calc(50% + 25px), calc(20% + 35px));
        svg {
      transform: scale(2.5);
    }
  }
`;

export const FloatingIcon = styled.svg`
  position: absolute;
  width: 450px;
  height: 450px;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 16px;
  z-index: 1;
  animation: 
    ${appearUp} 0.5s ease-out forwards,
    ${float}   4s ease-in-out infinite 0.5s;
`;

export const Title = styled.h2<{ visible?: boolean }>`
  position: relative;
  font-size: 40px;
  z-index: 3;
  color: black;
    ${({ visible }) =>
    visible
      ? css`animation: ${appearUp} 0.5s ease-out forwards;`
      : css`animation: ${appearDown} 0.5s ease-in forwards;`}
  opacity: ${({ visible = true }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease, transform 0.3s ease;
`;
export const Text = styled.p<{ visible?: boolean }>`
  position: relative;
  z-index: 3;
  font-size: 20px;
  color: #999;
  transform: ${({ visible = true }) => (visible ? 'translateY(0)' : 'translateY(20px)')};
  opacity: ${({ visible = true }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: ${({ visible = true }) => (visible ? '0.1s' : '0s')};
`;

export const NumberLabel = styled.span<{ visible: boolean }>`
  display: block;
  font-size: 24px;
  color: #999;
  z-index: 3;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'translateY(0)' : 'translateY(10px)')};
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: 0.1s;
`;

export const Divider = styled.div<{ visible: boolean }>`
  width: 24px;
  height: 1px;
  z-index: 3;
  background-color: #999;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'scaleX(1)' : 'scaleX(0)')};
  transform-origin: center;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: 0.15s;
`;

export const DropWrapper = styled.div<{ active: boolean }>`
  opacity: ${({ active }) => (active ? 1 : 0)};
  pointer-events: ${({ active }) => (active ? 'all' : 'none')};
  transition: opacity 0.6s ease-out;
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 750px;
  height: 500px;
`;

// SVG wrapper to size and show the graphic
export const SVGWrapper = styled.svg`
  width: 100%;
  height: 100%;
  visibility: visible;
`;

// Styles for the profile/portfolio link
export const MeContainer = styled.div`
  position: fixed;
  z-index: 1000;
  top: 24px;
  left: 24px;
  display: flex;
  flex-direction: column;
`;
export const MeLink = styled.a`
  position: relative;
  margin-bottom: 16px;
  color: #fff;
  font-family: Helvetica, sans-serif;
  text-decoration: none;
  font-size: 16px;

  span {
    display: block;
    position: absolute;
    bottom: -3px;
    left: 0;
    height: 1px;
    width: 5%;
    background-color: #fff;
    content: "";
    transition: width 0.3s;
  }
  &:hover span {
    width: 100%;
  }
`;

// Styles for the Twitter icon link
export const TwitterLink = styled.a`
  position: fixed;
  top: 16px;
  right: 24px;
  display: block;
  width: 40px;
  height: 40px;
  svg {
    width: 100%;
    height: 100%;
    fill: #fff;
  }
`;

