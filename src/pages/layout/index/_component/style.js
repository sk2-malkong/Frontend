import styled, { keyframes } from 'styled-components';
import 'aos/dist/aos.css';

const upAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const S = {};

// 전체 레이아웃
S.Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url('/images/sky-bg.png') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding-top: 100px;
`;

S.CloudBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('https://www.transparenttextures.com/patterns/clouds.png');
  background-repeat: repeat-x;
  background-position: 0 0;
  opacity: 0.15;
  pointer-events: none;
`;

S.MainWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 100px 20px;
  z-index: 1;
  position: relative;
`;

// 타이틀, 설명, 버튼
S.Title = styled.h1`
  font-size: 3.5rem;
  text-align: center;
  color: white;
  font-weight: 800;
`;

S.Description = styled.p`
  font-size: 1.3rem;
  text-align: center;
  color: #eef;
  margin-top: 1rem;
  line-height: 1.8;
`;

S.ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
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
    background: #dfefff;
  }
`;

S.ChatNotice = styled.div`
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 40px;
`;

// 채팅
S.SectionWrapper1 = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 80px;
`;

S.ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

S.ChatBubble1 = styled.div`
  align-self: ${({ align }) => (align === 'right' ? 'flex-end' : 'flex-start')};
  background: ${({ user }) => (user ? '#d0e8ff' : '#f0f0f0')};
  padding: 12px 18px;
  border-radius: 20px;
  max-width: 70%;
  font-size: 15px;
  color: #333;
  animation: ${upAnimation} 0.4s ease-out;
`;

S.InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  background: #f9f9f9;
  border-radius: 20px;
  padding: 10px;
`;

S.Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  padding: 10px;
  outline: none;
`;

S.SendButton = styled.button`
  background-color: #5784e1;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #3f6dc6;
  }
`;

// 📊 통계
S.StatsSection = styled.section`
  background: #ffffffcc;
  padding: 60px 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  margin-bottom: 80px;

  h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
  }

  .countup {
    font-size: 3rem;
    font-weight: bold;
    color: #5784e1;
  }

  p {
    font-size: 16px;
    color: #666;
    margin-top: 10px;
  }
`;

// 💬 사용자 후기
S.ReviewSection = styled.section`
  padding: 80px 20px;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 40px;
    color: #333;
  }
`;

S.ReviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

S.ReviewCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 300px;

  p {
    font-size: 16px;
    color: #444;
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    color: #999;
  }
`;

// 🧠 필터링 설명
S.FeatureSection = styled.section`
  background: #ffffffcc;
  padding: 60px 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  margin-bottom: 80px;
  h2{
    color: black;
    margin-bottom: 30px;
  }
  li{
    color: black;
  }
`;

S.FeatureBox = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  text-align: left;

  ol {
    padding-left: 20px;
    font-size: 16px;
    line-height: 2;

    li::marker {
      color: #5784e1;
      font-weight: bold;
    }
  }
`;

// 🧪 게시판 예시
S.BoardPreview = styled.section`
  padding: 80px 20px;
  background: #ffffffcc;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  text-align: center;
  h2{
    color: black;
  }
  strong{
    color: black;
  }

  .original, .filtered {
    font-size: 16px;
    margin: 12px auto;
    padding: 12px;
    border-radius: 10px;
    max-width: 600px;
  }

  .original {
    background: #ffecec;
    color: #b10000;
  }

  .filtered {
    background: #e8f8ff;
    color: #0070af;
  }
`;

// 📱 모바일 모형
S.MobileMockup = styled.section`
  padding: 80px 20px;
  text-align: center;

  img {
    width: 240px;
    margin: 20px 0;
    border-radius: 20px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
  }

  p {
    font-size: 15px;
    color: #666;
  }
`;
// 1️⃣ 체험용 가상 게시판
S.ExperienceBoard = styled.section`
  background: #ffffffee;
  padding: 60px 30px;
  border-radius: 20px;
  text-align: center;
  margin-top: 80px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);

  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 15px;
    margin-bottom: 30px;
    color: #666;
  }
`;

S.ExampleInputWrap = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

S.ExampleResult = styled.div`
  font-size: 16px;
  color: #333;
  background: #e8f8ff;
  padding: 20px;
  border-radius: 16px;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  span {
    font-weight: bold;
    color: #0070af;
  }
`;

// 2️⃣ 관리자 대시보드 (단일 카드)
S.AdminDashboard = styled.section`
  padding: 80px 20px;
  text-align: center;


  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #222;
  }

  p {
    font-size: 15px;
    color: #666;
    margin-bottom: 30px;
  }
`;

S.AdminCardSingle = styled.div`
  background: white;
  padding: 30px 20px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  max-width: 500px;
  margin: 0 auto;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: #5784e1;
  }
  span{
    color: red;
  }

  p {
    font-size: 18px;
    color: #222;
    margin-top: 10px;
  }
`;

// 3️⃣ 자주 묻는 질문 (FAQ)
S.FaqSection = styled.section`
  padding: 80px 20px;
  text-align: center;
  background: #f5faff;
  border-radius: 20px;
  margin-top: 80px;

  h2 {
    font-size: 2rem;
    color: #222;
    margin-bottom: 30px;
  }
`;

S.FaqList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
`;

S.FaqItem = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);

  strong {
    display: block;
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 15px;
    color: #666;
    line-height: 1.6;
  }
`;


S.HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
  z-index: 0;
`;

S.HeroTextBlock = styled.div`
  position: absolute;
  top: 25%;
  text-align: center;
  color: white;
  z-index: 2;

  .hero-sub {
    font-size: 1rem;
    letter-spacing: 0.15em;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  h1 {
    font-size: 3rem;
    font-weight: 600;
    line-height: 1.4;
    font-family: 'Playfair Display', serif;

    strong {
      color: #f9f871;
    }
  }

  .hero-brand {
    margin-top: 1rem;
    font-size: 0.95rem;
    opacity: 0.7;
    display: block;
  }
`;


export default S;
