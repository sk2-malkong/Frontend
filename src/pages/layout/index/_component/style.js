import styled, { keyframes } from 'styled-components';

const upAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const S = {};

// 전체 배경
S.Wrapper = styled.div`
  width: 100%;
  min-width: 1050px;
  min-height: 100vh;
  background: linear-gradient(135deg, #5784e1, #7dafff);
  color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
  position: relative;
`;

// 메인 레이아웃
S.MainWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  position: relative;
  z-index: 10;
`;

S.BackgroundAnimation = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.08;
  animation: pulse 3s infinite alternate;
  z-index: 0;
  pointer-events: none;

  @keyframes pulse {
    0% { opacity: 0.05; }
    100% { opacity: 0.1; }
  }
`;

S.Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
`;

S.Description = styled.p`
  font-size: 1.3rem;
  text-align: center;
  color: #eef;
  margin-top: 1rem;
  line-height: 1.6;
`;

S.ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

S.Button = styled.button`
  background: white;
  color: #5784e1;
  padding: 12px 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #f1f1f1;
  }
`;

S.ChatNotice = styled.div`
  text-align: center;
  margin-top: 60px;
  font-size: 18px;
  font-weight: 500;
`;

S.TopWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
`;

S.BottomWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
`;

S.SectionWrapper1 = styled.div`
  flex: 1;
  min-width: 320px;
  display: flex;
  flex-direction: column;
`;

S.SectionWrapper2 = styled(S.SectionWrapper1)``;

S.InfoBlock1 = styled.div`
  flex: 1;
  min-width: 320px;
  min-height: 400px;
  position: relative;
  display: flex;           
  flex-direction: column;  
  align-items: center;      
  justify-content: center;   
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  color: #333;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
`;


S.InfoBlock2 = styled(S.InfoBlock1)``;

S.InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
`;

S.InfoText = styled.p`
  font-size: 16px;
  color: #666;
`;

S.ChatArea = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 20px;
  height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

S.ChatBubble1 = styled.div`
  background-color: ${({ user }) => (user ? '#5784e1' : 'transparent')};
  color: ${({ user }) => (user ? 'black' : '#000')};
  padding: 12px 16px;
  border-radius: 20px;
  max-width: 70%;
  align-self: ${({ align }) => (align === 'right' ? 'flex-end' : 'flex-start')};
  border: ${({ user }) => (user ? 'none' : '2px solid #5784e1')};
  font-size: 15px;
  animation: ${upAnimation} 0.5s ease-out;
  word-break: break-word;

  span {
    color: red;
    font-weight: bold;
  }
`;

S.ChatBubble2 = styled(S.ChatBubble1)``;

S.InputWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  background: #fff;
  padding: 10px 15px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

S.Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #333;

  &:focus {
    outline: none;
  }
`;

S.SendButton = styled.button`
  background-color: #5784e1;
  color: black;
  padding: 10px 14px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  transition: background 0.3s;

  &:hover {
    background-color: #466dc4;
  }
`;

export default S;
