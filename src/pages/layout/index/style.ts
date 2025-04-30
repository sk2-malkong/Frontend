import styled from "styled-components";

// 타입 정의를 위한 인터페이스
interface StyledComponents {
    Wrapper: ReturnType<typeof styled.div>;
    BackgroundAnimation: ReturnType<typeof styled.div>;
    Title: ReturnType<typeof styled.h1>;
    Description: ReturnType<typeof styled.p>;
    Count: ReturnType<typeof styled.div>;
    Button: ReturnType<typeof styled.button>;
}

// 스타일드 컴포넌트에 필요한 props 인터페이스
interface WrapperProps {
    // 필요한 props 타입을 여기에 정의할 수 있습니다
}

interface BackgroundAnimationProps {
    // 필요한 props 타입을 여기에 정의할 수 있습니다
}

interface TitleProps {
    // 필요한 props 타입을 여기에 정의할 수 있습니다
}

interface DescriptionProps {
    // 필요한 props 타입을 여기에 정의할 수 있습니다
}

interface CountProps {
    // 필요한 props 타입을 여기에 정의할 수 있습니다
}

interface ButtonProps {
    // 필요한 props 타입을 여기에 정의할 수 있습니다
}

// 각 스타일드 컴포넌트 선언
const Wrapper = styled.div<WrapperProps>`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom right, #5784e1, #5784e1, #5784e1);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundAnimation = styled.div<BackgroundAnimationProps>`
  position: absolute;
  inset: 0;
  animation: pulse 2s infinite;
  background-image: radial-gradient(#5784e1 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.1;
  z-index: 0;
  pointer-events: none; 

  @keyframes pulse {
    0%, 100% {
      opacity: 0.08;
    }
    50% {
      opacity: 0.15;
    }
  }
`;

const Title = styled.h1<TitleProps>`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  z-index: 10;
`;

const Description = styled.p<DescriptionProps>`
  margin-top: 1.5rem;
  font-size: 1.125rem;
  color: #ccc;
  z-index: 10;
`;

const Count = styled.div<CountProps>`
  margin-top: 2.5rem;
  font-size: 3rem;
  font-weight: 800;
  color: #ef4444;
  z-index: 10;
  display: flex;
  align-items: center;
`;

const Button = styled.button<ButtonProps>`
  margin-top: 3rem;
  background-color: white;
  color: black;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  z-index: 10;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #e5e5e5;
  }
`;

// 모든 스타일드 컴포넌트를 객체로 내보내기
const S = {
    Wrapper,
    BackgroundAnimation,
    Title,
    Description,
    Count,
    Button
};

export default S;