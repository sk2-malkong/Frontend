import styled, { createGlobalStyle, keyframes, css } from "styled-components"
import "aos/dist/aos.css"

export const GlobalStyle = createGlobalStyle`
  :root {
    --foreground-rgb: 15,26,43;
    --background-rgb: 255,255,255;
    --radius: 0.5rem;
  }
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 2rem;
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    color: rgb(var(--foreground-rgb));
    background: rgb(var(--background-rgb));
    font-family: 'Pretendard', sans-serif;
    min-height: 100%;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  

  .fixed-logo {
    position: fixed !important;
    top: 20px !important;
    left: 50% !important;
    transform: translateX(-50%) scale(0.5) !important;
    z-index: 1000 !important;
    transition: all 0.3s ease-out !important;
  }
`
const upAnim = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`
const chevAnim = keyframes`
  0%   { opacity: 0; transform: translateY(-8px); }
  50%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(8px); }

`
const S = {}

// 1) Header
S.Header = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 60px;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

// 2) Wrapper
S.Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url('/images/sky-bg.png') center/cover no-repeat fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

S.svglocation=styled.div`
  padding: 1.5rem var(--size--40px);
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60px;
  margin: auto;
  display: flex;
  position: fixed;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
    a{
    width: 60px;
    height: 60px;
    padding-bottom: 0;
    position: absolute;

    img {
    width: 100%;
    height: 100%;
    
  }
    }

`

// 3) HeroSection
S.HeroSection = styled.section`
  width: 100%;
  height: 1500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  
  image {
    
  }

  strong{
    font-size: 36px;
  }
`
S.CloudBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('https://www.transparenttextures.com/patterns/clouds.png') repeat-x;
  opacity: 0.15;
  pointer-events: none;
`

// 4) HeroTextBlock: 텍스트 → 로고 → 브랜드
S.HeroTextBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  gap: 1rem;
  text-align: center;
  z-index: 1;
  img{
    
  }
`

// 5) Scroll Indicator
S.ScrollIndicator = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  pointer-events: none;
  opacity: ${props => props.scrollY > 50 ? 0 : 1};
  transition: opacity 0.3s ease;
  
  .chevron {
    width: 28px;
    height: 8px;
    transform: scale(0.3) rotate(45deg);
    border-bottom: 4px solid #0f1a2b;
    border-right: 4px solid #0f1a2b;
    animation: ${chevAnim} 2s infinite;
    &:nth-child(1) { animation-delay: 0 }
    &:nth-child(2) { animation-delay: 0.5s }
    &:nth-child(3) { animation-delay: 1s }
  }
  span {
    margin-top: 16px;
    font-size: 12px;
    letter-spacing: 0.1em;
    color: #0f1a2b;
    text-transform: uppercase;
  }
`
S.IntroText = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: #ffffff;
  line-height: 1.5;
  padding: 0 20px;
  z-index: 2;
`;

// 로고 이미지를 위한 스타일 추가
S.LogoImage = styled.img`
  width: 100px;
  transition: all 0.3s ease-in-out;
  
  &.scrolled {
    width: 60px;
  }
  
  &.fixed-logo {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) scale(0.5);
    z-index: 1001;
  }

  // a 태그로 이동했을 때 크기 줄어들도록 설정
  a {
    display: inline-block; /* a 태그를 inline-block으로 변경하여 크기를 조절할 수 있도록 */
    width: 60px;  /* a 태그 안에서 로고의 크기를 줄이기 */
    height: 60px;
    overflow: hidden;  /* a 태그 안에서 로고가 잘리게 되지 않도록 처리 */
    
    img {
      width: 100%;
      height: 100%;  /* a 태그에 맞게 로고 크기 조정 */
      object-fit: contain;  /* 이미지 비율을 유지하며 크기 조정 */
    }
  }
`;

// 6) Main Content
S.MainWrapper = styled.main`
  width: 100%;
  max-width: 1200px;
  padding: 40px 20px;
  margin-top: 80px;
  position: relative;
  z-index: 2;
`

// Chat
S.SectionWrapper1 = styled.section`
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  margin-bottom: 80px;
`
S.ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
`
S.ChatBubble1 = styled.div`
  align-self: ${({ align }) => align === 'right' ? 'flex-end' : 'flex-start'};
  background: ${({ user }) => user ? '#d0e8ff' : '#f0f0f0'};
  padding: 12px 18px;
  border-radius: 20px;
  max-width: 70%;
  font-size: 15px;
  color: #333;
  animation: ${upAnim} 0.4s ease-out;
`
S.InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  background: #f9f9f9;
  border-radius: 20px;
  padding: 10px;
`
S.Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  padding: 10px;
  outline: none;
  color: #333;
`
S.SendButton = styled.button`
  background: #5784e1;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover { background: #3f6dc6 }
`

// 오늘 순화된 단어 수
S.StatsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  margin-bottom: 80px;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }

  /* 숫자를 감싸는 물방울 스타일 */
  .count-bubble {
  width: 300px;
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 58% 43% 33% 64% / 50% 38% 53% 50%;
  background: transparent;
  box-shadow:
    inset 6px 33px 20px 0 rgba(255, 255, 255, 0.7),
    inset 20px 80px 15px 0 rgba(0, 0, 0, 0.1),
    10px 20px 20px 0px  rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px) scale(1.2);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  &::before,
  &::after {
    content: '';
    background: white;
    position: absolute;
  }

  &::before {
    width: 50px;
    height: 15px;
    border-radius: 37% 54% 46% 46%;
    top: 40px;
    left: 50px;
    transform: rotate(-30deg);
  }

  &::after {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 80px;
    left: 20px;
  }

  .countup{
    color:#5784e1 ;
    font-size: 80px;
  }
  }
  p {
    margin-top: 1rem;
    color: #666;
  }
`;

// 사용자 후기
S.ReviewSection = styled.section`
  padding: 80px 20px;
  text-align: center;
  h2 { font-size: 2rem; margin-bottom: 40px; color: #333; }
`
S.ReviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`
S.ReviewCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
  max-width: 300px;
  p { font-size: 16px; color: #444; }
  span { display: block; margin-top: 10px; color: #999; }
`

// AI 필터링 시스템 설명
S.FeatureSection = styled.section`
  background: rgba(255,255,255,.8);
  padding: 60px 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  margin-bottom: 80px;
  h2 { font-size: 2rem; margin-bottom: 30px; color: #333; }
`
S.FeatureBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 16px rgba(0,0,0,.1);
  ol {
    padding-left: 20px;
    font-size: 16px;
    line-height: 2;
    li::marker { color: #5784e1; font-weight: bold; }
    li{
      color: black;
    }
  }
`

// 게시판 예시
S.BoardPreview = styled.section`
  padding: 80px 20px;
  background: rgba(255,255,255,.8);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  text-align: center;
  margin-bottom: 80px;
  h2, strong { color: #333; }
  .original, .filtered {
    margin: 12px auto;
    padding: 12px;
    border-radius: 10px;
    max-width: 600px;
    font-size: 16px;
    line-height: 1.5;
  }
  .original { background: #ffecec; color: #b10000; }
  .filtered { background: #e8f8ff; color: #0070af; }
`

// 관리자 대시보드
S.AdminDashboard = styled.section`
  padding: 80px 20px;
  text-align: center;
  margin-bottom: 80px;
  h2 { font-size: 2rem; margin-bottom: 20px; color: #333; }
`
S.AdminCardSingle = styled.div`
  background: white;
  padding: 30px 20px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,.1);
  max-width: 500px;
  margin: 0 auto;
  h3 { font-size: 1.4rem; margin-bottom: 10px; color: #5784e1; }
  p { font-size: 18px; color: #222; margin-top: 10px; }
  .count-highlight { color: #5784e1; font-weight: bold; }
  span{
    color: red;
  }
`

// FAQ
S.FaqSection = styled.section`
  padding: 80px 20px;
  text-align: center;
  background: #f5faff;
  border-radius: 20px;
  margin-bottom: 80px;
  h2 { font-size: 2rem; margin-bottom: 30px; color: #333; }
`
S.FaqList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
`
S.FaqItem = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,.05);
  margin-bottom: 30px;
  strong { display: block; font-size: 16px; margin-bottom: 10px; color: #333; }
  p { font-size: 15px; color: #666; line-height: 1.6; }
`
S.ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

S.Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 30px;
  font-size: 18px;
  font-weight: bold;
  color: #5784e1;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(8px);
  border: none;
  cursor: pointer;
  position: relative;
  border-radius: 48% 52% 55% 45% / 45% 50% 50% 55%;
  box-shadow:
    inset 4px 4px 10px rgba(255, 255, 255, 0.7),
    inset -4px -4px 10px rgba(0, 0, 0, 0.1),
    0 6px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s ease;

  &:hover {
    transform: translateY(-10px) scale(1.2);
    background-color: #f9f9f9;
  }
  
`;
S.ChatNotice = styled.div`
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 40px;
`;

// 서비스 섹션 스타일
S.ServiceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  padding: 50px;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

// 서비스 제목
S.ServiceTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 60px;
  text-align: center;
`;

// 서비스 아이콘과 텍스트를 감싸는 래퍼
S.ServiceWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
`;

// 각 서비스 항목
S.ServiceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  opacity: 0;
  margin: auto;
`;

// 서비스 아이콘: 물방울 모양으로 변경
S.ServiceIcon = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  /* 아이콘 중앙 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
  /* 물방울 형태 */
  border-radius: 58% 43% 33% 64% / 50% 38% 53% 50%;
  background: transparent;
  box-shadow:
    inset 6px 33px 20px 0 rgba(255, 255, 255, 0.7),
    inset 20px 80px 15px 0 rgba(0, 0, 0, 0.1),
    10px 20px 20px 0px  rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px) scale(1.2);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  &::before,
  &::after {
    content: '';
    background: white;
    position: absolute;
  }

  &::before {
    width: 50px;
    height: 15px;
    border-radius: 37% 54% 46% 46%;
    top: 20px;
    left: 20px;
    transform: rotate(-30deg);
  }

  &::after {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 60px;
    left: 20px;
  }
`;


// 서비스 텍스트
S.ServiceText = styled.p`
font-weight: bold;
  font-size: 16px;
  color: #333;
`;
S.PageContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
`;

S.FullPageSection = styled.div`
  scroll-snap-align: start;
  height: 100vh;
  position: relative;
`;

/* style.js 안에 추가하세요 */

export default S