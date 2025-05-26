import styled, { keyframes } from "styled-components";

const S = {};

S.ripple = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
`;

S.swim = keyframes`
  0%, 100% { transform: rotate(0deg); }
  33.3% { transform: rotate(15deg); }
  75% { transform: rotate(-15deg); }
`;

S.voyage = keyframes`
  100% { transform: translate(40vw, -130vh); }
`;

S.flow = keyframes`
  100% { background-position: 100% 0%; }
`;

S.sheen = keyframes`
  100% { background-position: 100% 0%; }
`;

S.Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at bottom right, #007cb7, #83b4b6 69%, #e6ecebaf 70%, #00abc5);
  perspective: 1440px;
   overflow: hidden;
`;

S.Pond = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ffff000f;
`;

S.Film = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  background-size: cover;
  filter: url(#displacementFilter) url(#goo);
`;

S.Ripple = styled.div`
  position: absolute;
  width: 40vw;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 4px solid #ffffffaa;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  animation: ${S.ripple} 4s ease-in-out infinite;
  animation-fill-mode: both;
`;

S.Fish = styled.div`
  position: absolute;
  width: 38px;
  aspect-ratio: 0.3 / 1;
  display: flex;
  flex-direction: column;
  transform: rotate(38deg);
  animation: ${S.voyage} 20s linear infinite;
  filter: blur(0.5px);
`;

S.Part = styled.div`
  width: 100%;
  flex-grow: 2;
  background: #006793;
`;

S.Head = styled(S.Part)`
  transform-origin: bottom center;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  animation: ${S.swim} 1.3s linear infinite;
`;

S.Tail = styled(S.Part)`
  transform-origin: top center;
  flex-grow: 4;
  clip-path: polygon(50% 100%, 100% 0%, 0% 0%);
  animation: ${S.swim} 1.3s linear infinite reverse;
`;

S.Quote = styled.div`
  position: relative;
  width: 90%;
  max-width: 90vh;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px 20px 50% 50%;
  overflow: hidden;
  text-align: center;
  filter: drop-shadow(-20px 20px 5px #006793);

  figure {
    margin: auto;
    font-size: clamp(12vh, 12vh, 6rem);
    filter: drop-shadow(0 0 5px #006793);
  }

  figcaption {
    font-size: clamp(8vh, 8vh, 4rem);
    text-align: right;
  }

  @media (max-width: 700px) {
    figure,
    figcaption {
      font-size: clamp(30px, 10vw, 4rem);
    }
  }
`;

S.Frame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ffffff;
  opacity: 0.5;
`;

S.Wave = styled.span`
  background: linear-gradient(90deg, #ffffff0f, #006793, #ffffff0f);
  background-position: -50% 0;
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${S.flow} 5s linear infinite, ${S.sheen} 10s linear infinite;
  font-size: 100px;

  &.oppo {
    animation-direction: reverse;
    font-size: 50px;
  }
`;

S.SvgFilters = styled.svg`
  position: absolute;
  width: 0;
  height: 0;
  visibility: hidden;
`;

export default S;
