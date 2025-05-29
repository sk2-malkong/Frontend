import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import CountUp from 'react-countup';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid, 
  Legend as RechartsLegend, 
  Cell,   
} from 'recharts';
import userApi from 'src/pages/api/userApi';
import auth from 'src/pages/api/auth';


const GlobalAnimationStyle = createGlobalStyle`
  @keyframes barGrowUp {
    0%{
      transform: scaleY(0.1);
      opacity: 0.4;
    }
    50% {
      transform: scaleY(1);
      opacity: 1;
    }
    100%{
      transform:scaleY((1));
      opacity: 1;
    }
  }

  .bar-animate {
    transform-origin: bottom;
    animation-name: barGrowUp;
    animation-duration: 5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
  }
`;
interface DetailThreadSectionProps {
  active: boolean;
  count?: number;
}
interface BadWord {
  word: string;
  count: number;
}
const fadeText = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
`;
const show75 = keyframes`
  from { stroke-dashoffset: 502; }
  to   { stroke-dashoffset: 50.2; }
`;
const show15 = keyframes`
  from { stroke-dashoffset: 502; }
  to   { stroke-dashoffset: 426.7; }
`;
const blink = keyframes`
  0%, 20% { opacity: 1; }
  21%, 100% { opacity: 0; }
`;
const sdb05 = keyframes`
  0% {
    transform: rotate(-45deg) translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(-45deg) translate(-20px, 20px);
    opacity: 0;
  }
`;

const Section05 = styled.section.attrs({ id: 'section05' })`
  a {
    padding-top: 70px;
    position: relative;
    display: inline-block;
    left: 50%;

    span {
      position: absolute;
      top: 0;
      width: 24px;
      height: 24px;
      margin-left: -12px;
      border-left: 5px solid #fff;
      border-bottom: 5px solid #fff;
      transform: rotate(-45deg);
      animation: ${sdb05} 1.5s infinite;
      box-sizing: border-box;
    }
  }
`;


const StyledWrapper = styled.div`
  .count{
    font-size: 20px;
  }
  .box {
    top: 60%;
    left: 50%;
    width: 500px;
    height: 500px;
    border: none;
    border-radius: 50% 50% 50% 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px 50px;
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    cursor: pointer;
    font:
      16px/24px Arial,
      sans-serif;
    transition:
      box-shadow 0.4s ease,
      background-color 0.4s ease,
      color 0.4s ease;
    box-shadow:
      inset 20px 20px 20px rgba(0, 0, 0, 0.1),
      25px 35px 20px rgba(0, 0, 0, 0.1),
      25px 30px 30px rgba(0, 0, 0, 0.1),
      inset -20px -20px 25px rgba(255, 255, 255, 0.8);
    background-color: #a6bbfd;
  }
  .curve-text {
    position: absolute;
    top: 40%;
    left: 40%;
    transform: translateX(50%,-50%);
    pointer-events: none;
    width: 1000px;
    height: 300px;
    overflow: visible;
    transition: opacity 2s ease;
  }

  .box.active::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    top: 90%;
    left: 50%;
    transform: translate(-50%, 0);
    animation: splash 1s forwards;
    animation-iteration-count: infinite;
  }

  .box span {
    color: #fff;
    letter-spacing: 8px;
  }

  .box i {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 500px;
    background-color: #a6bbfd;
    transition:
      5s transform 0.4s linear,
      top 1s linear;
    overflow: hidden;
  }

  .box i:after {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    top: 35%;
    left: 50%;
    transition: 2s;
    transform: translate(-50%, -75%);
  }
  .box span .title,
  .box span .count {
    opacity: 0;
    transform: translateY(20px);
  }

  /* 활성 상태: 탐지중 곡선 텍스트 중앙 정렬 */
  .box.active .curve-text text {
    font-size: 2.5em;
  }
  .box.active .curve-text {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* 활성 상태: 타이틀 나타날 때만 애니메이션 */
  .box.active span .title {
    font-size: 35px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: 1;
    color: #e2e2e2;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  /* 활성 상태: 카운트 숫자 나타날 때만 애니메이션 */
  .box.active span .count {
    font-size: 3em;
    display: block;
    margin-top: 0.5em;
    opacity: 1;
    transform: translateY(0);
    font-weight: bold;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }


  .box i:after {
    border-radius: 40%;
    background-color: rgb(255, 255, 255);
    animation: animate 5s linear infinite;
  }

  .box.active i:after {
    top: -45%;
    animation: animate 5s linear infinite;
  }
  
  .box.active .curve-text {
    opacity: 0;
    transition: opacity 1s ease;
  }

  .drop-wrapper {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  a.scroll-down {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: inline-block;
    color: #fff;
    font: normal 400 20px/1 'Josefin Sans', sans-serif;
    letter-spacing: .1em;
    text-decoration: none;
    transition: opacity .3s;
  }
  a.scroll-down:hover { opacity: .5; }
  a.scroll-down span {
    position: absolute;
    top: 0; left: 50%;
    width: 24px; height: 24px;
    margin-left: -12px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(-45deg);
    box-sizing: border-box;
    animation: ${blink} 1.5s infinite;
  }
  .ai {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    color: #333;
    font-size: 32px;
    font-weight: bold;
  }

  .small-drop {
    position: absolute;
    width: 300px; height: 300px;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;

    svg {
      width: 100%; height: 100%;
      transform: rotate(-90deg);
      overflow: visible;
    }
    circle.inner {
      stroke: #256F8D;
      fill: none;
      stroke-width: 10;
    }
    &.left circle.outer {
      stroke: #F08418;
      fill: none;
      stroke-width: 10;
      stroke-dasharray: 502;
      stroke-dashoffset: 502;
      animation: ${show75} 1s ease forwards;
      animation-delay: 1s;
    }
    &.right circle.outer {
      stroke: #E34747;
      fill: none;
      stroke-width: 10;
      stroke-dasharray: 502;
      stroke-dashoffset: 502;
      animation: ${show15} 1s ease forwards;
      animation-delay: 1s;
    }
text {
  fill: #333;
  font-size: 1.5em;
  text-anchor: middle;
  transform-origin: 100px 100px;
  transform: rotate(90deg);
  opacity: 0;
  animation: ${fadeText} 2s ease-out forwards;
  animation-delay: 1.5s;
}
    &.left text
    &.right text { transform: rotate(90deg) translate(0, 30px); }
    &.in { animation: ${fadeIn} 1s ease-out forwards; }
    &.out { animation: ${fadeOut} 1s ease-out forwards; }
    &.left { top: 20%; left: 10%; transform: translate(-50%, -50%); }
    &.right { top: 20%; right: 10%; transform: translate(50%, -50%); }
  }
  @keyframes animate {
    0% {
      transform: translate(-50%, -75%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -75%) rotate(360deg);
    }
  }

  /* Bubble */

  @keyframes splash {
    0% {
      transform: translate(-10%, 0) scale(1);
    }
    100% {
      transform: translate(-50%, -30px) scale(1);
      opacity: 0;
    }
  }`;

interface DataSegment {label: string;value: number; color: string }
interface Segment { path: string; color: string; zIndex: number }

const Parent = styled.div`
  width: 100%;
  height: 100%;
  perspective: 1000px;
  margin-top: 50%;

`;

const Card = styled.div`
  max-width: 400px;
  max-height: 400px;
  border-radius: 20px;
  background: white;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.1),         /* soft lower shadow */
    0 8px 24px rgba(0, 0, 0, 0.15),        /* deeper shadow */
    0 16px 48px rgba(0, 0, 0, 0.1);        /* distant, diffused */

  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.1),
      0 12px 32px rgba(0, 0, 0, 0.2),
      0 20px 60px rgba(0, 0, 0, 0.12);
  }
`;

const Content = styled.div`
  padding: 10px 0;
`;

const Title = styled.span`
  display: block;
  color: #2f7756;
  font-weight: 900;
  font-size: 20px;
`;

const Text = styled.span`
  display: block;
  color: rgba(0, 137, 78, 0.76);
  font-size: 14px;
  margin-top: 8px;
`;

const GraphContainer = styled.div`
  width: 300px;
  height: 300px;            /* ← 차트 높이를 300px로 고정 */
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 800px;
`;

const CircleGraph = styled.div<{ active: boolean }>`
  pointer-events: auto;

  position: relative;
  width: 180px;
  height: 180px;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out;

  /* active prop 에 따라 초기 상태를 지정 */
  transform: ${({ active }) =>
    active ? 'rotateX(30deg) rotateY(20deg)' : 'none'};

  /* 마우스 올리면 무조건 회전 */
  &:hover {
    transform: rotateX(30deg) rotateY(20deg);
  }
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  position: relative;
  z-index: 10;
`;

const SegmentPath = styled.path`
  transform-origin: center;
  transition: transform 0.5s ease-in-out;
`;

const CenterCircle = styled.circle`
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
`;

const GraphText = styled.text`
  font-size: 8px;
  font-weight: bold;
  fill: #00894d;
`;

 const OverlayCircle = styled.div<{
  size: number;
  offset: number;
  opacity: number;
}>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  top: ${({ offset }) => -offset}px;
  left: ${({ offset }) => -offset}px;
  border-radius: 50%;
  opacity: ${({ opacity }) => opacity};
  background: linear-gradient(
    135deg,
    rgb(0, 255, 214) 0%,
    rgb(8, 226, 96) 100%
  );
  transition: transform 0.5s ease-in-out;

  ${({ size }) => size === 190 && `z-index: 1;`}
  ${({ size }) => size === 210 && `z-index: 0;`}
  ${({ size }) => size === 230 && `z-index: -1;`}

  /* 부모 CircleGraph가 hover 상태일 때만 transform 적용 */
  ${CircleGraph}:hover & {
    transform: translateZ(-30px);
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 60%;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ColorDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const LegendText = styled.span`
  font-size: 12px;
  color: #333;
`;

const ViewMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Chevron = styled.svg`
  fill: none;
  stroke: #00c37b;
  stroke-width: 3px;
  max-height: 15px;
`;

const GraphRow = styled.div`
  display: flex;
  justify-content: space-between;   
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  width : 95% ;
  margin: 0 auto;  
`;
const FillWrapper = styled.div<{ show: boolean }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
`;

const DetailThreadSection: React.FC<DetailThreadSectionProps> = ({ active }) => {
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [dropState, setDropState] = useState<'hidden' | 'fadingIn' | 'fadingOut'>('hidden');
  const [dots, setDots] = useState('');
  const [abuseTotal, setAbuseTotal] = useState(0);
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const [count, setCount] = useState(0); // 상태값 선언
  const [badwords, setBadwords] = useState<BadWord[]>([]);
  const [isGraphActive2, setIsGraphActive2] = useState(false);
  const [error, setError] = useState<string>('');
  const maskWord = (w: string): string => {
    if (w.length <= 1) return w;
    return w.charAt(0) + 'X'.repeat(w.length - 1);
  };


  useEffect(() => {
    (async () => {
      try {
        const res = await auth.getAbuseTotal();
        setCount(res.total_abuse_count);
      } catch (err) {
        console.error('AbuseTotal 조회 실패:', err);
        setError('데이터를 불러오는 데 실패했습니다.');
      }
    })();
  }, []);

  // 섹션 active 상태에 따른 자동 실행 로직
  useEffect(() => {
    let autoTriggerTimeout: NodeJS.Timeout;

    if (active) {
      // 섹션이 활성화되면 2초 후 애니메이션 시작
      autoTriggerTimeout = setTimeout(() => {
        setIsActive(true);
        setShow(true);
        setDropState('fadingIn');
        setTimeout(() => setChartVisible(true), 500);
      }, 1000);
    } else {
      // 섹션이 비활성화되면 모든 상태 초기화
      setIsActive(false);
      setShow(false);
      setDropState('hidden');
      setChartVisible(false);
      setLeftActive(false);
      setRightActive(false);
      setIsGraphActive(false);
    }

    return () => {
      if (autoTriggerTimeout) {
        clearTimeout(autoTriggerTimeout);
      }
    };
  }, [active]); // active prop이 변경될 때마다 실행

  // 점 애니메이션 사이클
  useEffect(() => {
    let idx = 0;
    const max = 3;
    const interval = setInterval(() => {
      idx = (idx + 1) % (max + 1);
      setDots('.'.repeat(idx));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 버튼 클릭 시 애니메이션 처리 (이제 토글 기능)
  const handleClick = () => {
    setIsActive(!isActive);
    
    if (!isActive) {
      setShow(true);
      setDropState('fadingIn');
      setTimeout(() => setChartVisible(true), 500);
    } else {
      setChartVisible(false);
      setDropState('fadingOut');
      const timeout = setTimeout(() => {
        setShow(false);
        setDropState('hidden');
      }, 500);
      return () => clearTimeout(timeout);
    }
  };
  
  const [isGraphActive, setIsGraphActive] = useState<boolean>(false);

const data: DataSegment[] = [
  { label: '정확도',  value: 96.4, color: '#00f9cb' },
  { label: '정밀도', value: 97.9, color: '#08e260' },
  { label: '재현율',    value: 94.9, color: '#00c37b' },
  { label: 'F1-score',  value: 92.8, color: '#00894d' }
];
const colors = ['#00f9cb', '#08e260', '#00c37b', '#00894d', '#ffb400', '#ff6b6b'];

useEffect(() => {
  const fetchBadwords = async () => {
    try {
      const res = await auth.countBadwords();
      setBadwords(res.badwords);
    } catch (err) {
      console.error(err);
    }
  };
  fetchBadwords();
}, []);

// 막대 그래프 데이터
const barData: DataSegment[] = badwords.map((bw, idx) => ({
  label: maskWord(bw.word),
  value: bw.count,
  color: colors[idx % colors.length],
}));
const barTotal = barData.reduce((sum, d) => sum + d.value, 0);

// 원형 그래프용 Top 4 + 그 외 구성
const sorted = [...badwords].sort((a, b) => b.count - a.count);
const top4 = sorted.slice(0, 4);
const etc = sorted.slice(4);

const top4Count = top4.reduce((sum, d) => sum + d.count, 0);
const etcCount = etc.reduce((sum, d) => sum + d.count, 0);
const totalTopEtc = top4Count + etcCount;

const circleData: DataSegment[] = [
  ...top4.map((bw, idx) => ({
    label: maskWord(bw.word),
    value: totalTopEtc > 0 ? (bw.count / totalTopEtc) * 100 : 0,
    color: colors[idx % colors.length],
  })),
  {
    label: '그 외 단어',
    value: totalTopEtc > 0 ? (etcCount / totalTopEtc) * 100 : 0,
    color: '#ffb400',
  },
];

// 원형 그래프 세그먼트 계산
const computeSegments = (segments: DataSegment[]): Segment[] => {
  const total = segments.reduce((sum, d) => sum + d.value, 0);
  let startAngle = 0;

  return segments.map((d, i) => {
    const pct = d.value / (total || 1);
    const end = startAngle + pct * 2 * Math.PI;
    const x1 = Math.cos(startAngle) * 50;
    const y1 = Math.sin(startAngle) * 50;
    const x2 = Math.cos(end) * 50;
    const y2 = Math.sin(end) * 50;
    const largeArc = pct > 0.5 ? 1 : 0;
    const path = `M 0 0 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;
    startAngle = end;
    return { path, color: d.color, zIndex: i };
  });
};

const circleSegments = computeSegments(circleData);


  return (
<div>
  <GlobalAnimationStyle />
  <StyledWrapper>
    {/* AI 타이틀 영역 */}
    <div className="ai">
      Purogo AI 성능
      <Section05>
        <a href="#next">
          <span />
        </a>
      </Section05>
    </div>

    {/* 탐지 버튼 */}
    <button
      className={`box ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      <svg className="curve-text" viewBox="0 0 500 100">
        <text>
          탐지중<tspan>{dots}</tspan>
        </text>
      </svg>
          <span>
            <h2 className="title">탐지된 비속어 수</h2>
            {isActive ? (
              <CountUp className="count" end={count} duration={1} />
            ) : (
              <CountUp className="count" start={abuseTotal} end={0} duration={1} />
            )}
          </span>
      <i />
      <div className="drop drop1" />
      <div className="drop drop2" />
      <div className="drop drop3" />
    </button>

    {/* 그래프 래퍼 */}
    <div className="drop-wrapper">
      <GraphRow>
        {/* 막대 그래프 섹션 */}
        <FillWrapper show={show}>
          <Parent
            className="left"
            onClick={() => setLeftActive(prev => !prev)}
          >
            <Card>
              <Content>
                <Title>성능지표 기반 분석</Title>
              </Content>
              <GraphContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
                    barSize={50}
                    barCategoryGap="20%"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="label"
                      interval={0}
                      padding={{ left: 20, right: 20 }}
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      angle={-30}
                      textAnchor="end"
                    />
                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 50, 80, 100]}
                      tickFormatter={v => `${v}%`}
                      tick={{ fontSize: 12 }}
                    />
                    <RechartsLegend verticalAlign="top" height={20} />
                    <Bar dataKey="value" fill="#00c37b" isAnimationActive={false}>
                      {data.map((entry, idx) => (
                        <Cell
                          key={`bar-${idx}`}
                          fill={entry.color}
                          className="bar-animate"
                          style={{ animationDelay: `${idx * 0.5}s` }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </GraphContainer>
              <Bottom>
                <Legend>
                  {data.map((d, i) => (
                    <LegendItem key={i}>
                      <ColorDot color={d.color} />
                      <LegendText>
                        {d.label}: {d.value}%
                      </LegendText>
                    </LegendItem>
                  ))}
                </Legend>
                <ViewMore>
                  <Chevron xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </Chevron>
                </ViewMore>
              </Bottom>
            </Card>
          </Parent>
        </FillWrapper>

        {/* 원형 그래프 섹션 */}
        <FillWrapper show={show}>
          <Parent>
            <Card>
              <Content>
                <Title>오늘 가장 많이 사용한 비속어</Title>
                <Text>Purgo 게시판에서 탐지된 비속어입니다.</Text>
              </Content>
              <GraphContainer>
                <CircleGraph active={isGraphActive2}>
                  <Svg viewBox="-60 -60 120 120">
                    {circleSegments.map((seg, idx) => (
                      <SegmentPath
                        key={idx}
                        d={seg.path}
                        fill={seg.color}
                        style={{
                          transform: isGraphActive2
                            ? `translateZ(${(circleSegments.length - seg.zIndex) * 10}px)`
                            : 'translateZ(0)',
                          transition: `transform 0.5s ease-in ${seg.zIndex * 0.1}s`
                        }}
                      />
                    ))}
                    <CenterCircle cx="0" cy="0" r="25" fill="white" />
{circleData.length === 0 ? (
  <GraphText x="0" y="5" textAnchor="middle" fontSize="6">
    데이터 없음
  </GraphText>
) : (
  <GraphText x="0" y="5" textAnchor="middle">
    Purgo
  </GraphText>
)}
                  </Svg>
                  {[{ size: 190, off: 5, op: 0.2 }, { size: 210, off: 15, op: 0.15 }, { size: 230, off: 25, op: 0.1 }].map((c, i) => (
                    <OverlayCircle
                      key={i}
                      size={c.size}
                      offset={c.off}
                      opacity={c.op}
                      style={isGraphActive2 ? { transform: 'translateZ(-30px)' } : undefined}
                    />
                  ))}
                </CircleGraph>
              </GraphContainer>
              <Bottom>
              <Legend>
             {circleData
               .filter(d => d.value > 0) // ← 0%는 제거
               .sort((a, b) => b.value - a.value)
               .map((d, i) => (
                 <LegendItem key={i}>
                   <ColorDot color={d.color} />
                   <LegendText>
                     {d.label}: {d.value.toFixed(1)}%
                   </LegendText>
                 </LegendItem>
               ))}
           </Legend>
              </Bottom>
            </Card>
          </Parent>
        </FillWrapper>
      </GraphRow>
    </div>
  </StyledWrapper>
</div>
  );
};

export default DetailThreadSection;