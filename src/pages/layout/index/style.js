import styled from "styled-components";

const S = {};

S.Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom right, #000000, #1f1f1f, #000000);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

S.BackgroundAnimation = styled.div`
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

S.Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  z-index: 10;
`;

S.Description = styled.p`
  margin-top: 1.5rem;
  font-size: 1.125rem;
  color: #ccc;
  z-index: 10;
`;

S.Count = styled.div`
  margin-top: 2.5rem;
  font-size: 3rem;
  font-weight: 800;
  color: #ef4444;
  z-index: 10;
  display: flex;
  align-items: center;
`;

S.Button = styled.button`
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

export default S;