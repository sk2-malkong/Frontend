import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Shield, CheckCircle, AlertTriangle, Sparkles, ArrowDown } from 'lucide-react';

interface DetectionResult {
  hasInappropriateContent: boolean;
  confidence: number;
}

interface MessageContainerProps {
  $isVisible?: boolean;
}

// Keyframes
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-10px); }
  70% { transform: translateY(-5px); }
  90% { transform: translateY(-2px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// Styled Components
const Container = styled.div`
  height: 100vh;             /* 화면 높이 */
  display: flex;
  transform: scaleX(0.8) scaleY(0.6);       
  align-items: flex-start;   /* 위쪽 정렬 */
  justify-content: flex-end;   /* 가로 중앙 정렬 */
  padding: 1.5rem 1.5rem 0;   /* 아래쪽 패딩만 없애거나, 위쪽 여백 조절 */
  width: 100%;
  transform-origin: top right;
  margin-top: 2rem;
`;

const MainCard = styled.div`
  /* 1) 원래 카드의 가로:세로 비율을 지정 (1272 / 317 ≒ 4 / 1) */
  aspect-ratio: 4 / 1;

  /* 2) 높이를 뷰포트 대비 %로 잡아서, 화면이 작아지면 높이도 줄어들게 */
  max-height: 90vh;     
  height: auto;         

  /* 3) 너무 커지지 않도록 가로 최대값 제한 (옵션) */
  max-width: 100rem;
  width: auto;          /* 높이에 맞춰 자동으로 가로 폭 계산 */

  /* 4) 정가운데 띄우기 */
  margin: 0 auto;
  
`;

const CardWrapper = styled.div`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(2rem);
  border-radius: 1.5rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;





const Content = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 500px;
  width: 100%;
`;

const MessageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MessageLabel = styled.div<{ $color: 'red' | 'green' }>`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  color: ${props => props.$color === 'red' ? 'rgb(248, 113, 113)' : 'rgb(74, 222, 128)'};
`;
const Title = styled.div<{ $color: 'red' | 'green' }>`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 25px;
  color: ${props => props.$color === 'red' ? 'rgb(248, 113, 113)' : 'rgb(74, 222, 128)'};
`;
const CustomTitle = styled(Title)`
  font-size: 25px; /* 원하는 크기로 변경 */
`;
const CustomTitle2 = styled(Title)`
  font-size: 25px; /* 원하는 크기로 변경 */
`;

const StatusDot = styled.div<{ $color: 'red' | 'green' }>`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${props => props.$color === 'red' ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'};
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const CodeBlock = styled.div<{ $borderColor: 'red' | 'green' }>`
  background: rgba(15, 23, 42, 0.7);
  border-radius: 1rem;
  padding: 1.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 20px;
  border: 1px solid ${props =>
    props.$borderColor === 'red'
      ? 'rgba(239, 68, 68, 0.2)'
      : 'rgba(34, 197, 94, 0.2)'};

  /* ▶ 여기를 고정폭으로 바꿔 보세요 */
  width: 30rem;        /* 예: 항상 30rem(480px) */
  max-width: 100%;     /* 너무 작아지는 건 방지 */
  margin: 0 auto;      /* 좌우 마진 자동으로 중앙 배치 */
  text-align: left;    /* 코드 내용은 왼쪽 정렬 */
`;

const CodeLine = styled.div`
  color: rgb(148, 163, 184);
  margin-bottom: 0.25rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CodeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
`;

const CodeKey = styled.span`
  color: rgb(248, 113, 113);
  font-size: 20px;
`;

const CodeColon = styled.span`
  color: white;
  margin-right: 0.5rem;
`;

const CodeValue = styled.span`
  color: rgb(74, 222, 128);
  flex: 1;
`;

const Cursor = styled.span`
  animation: ${pulse} 1s infinite;
  color: white;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  min-height: 4rem; 
`;

const StatusBadge = styled.div<{ $variant: 'analyzing' | 'detected' }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid;
  font-weight: 500;
  
  ${props => props.$variant === 'analyzing' ? css`
    color: rgb(251, 191, 36);
    background: rgba(251, 191, 36, 0.1);
    border-color: rgba(251, 191, 36, 0.2);
  ` : css`
    color: rgb(248, 113, 113);
    background: rgba(248, 113, 113, 0.1);
    border-color: rgba(248, 113, 113, 0.2);
  `}
`;

const DetectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
`;

const SpinningIcon = styled(Sparkles)`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  animation: ${spin} 1s linear infinite;
`;

const BouncingArrow = styled(ArrowDown)`
  width: 1.5rem;
  height: 1.5rem;
  bottom: -1rem;  
  color: rgb(196, 181, 253);
  animation: ${bounce} 2s infinite;
`;

const PurifiedContainer = styled.div<MessageContainerProps>`
  margin-top: auto;       /* 화살표 공간만큼 여백 확보 */
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.5s ease;
  opacity: ${props => props.$isVisible ? 1 : 0.3};
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(74, 222, 128);
  background: rgba(74, 222, 128, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(74, 222, 128, 0.2);
  font-weight: 500;
`;

const Placeholder = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

const AIMessagePurifier: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [purifiedMessage, setPurifiedMessage] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [messageIndex, setMessageIndex] = useState<number>(0);

  // 샘플 메시지들 (불건전한 내용 포함)
  const sampleMessages: string[] = [
    "저 새끼 진짜 짜증나네",
    "이런 개같은 상황이 언제까지 계속되냐",
    "그 병신같은 소리 그만해",
    "완전 미친놈이네 ㅋㅋㅋ",
    "아 진짜 열받아서 죽겠다"
  ];

  const purifiedVersions: string[] = [
    "그 사람 정말 답답하네요",
    "이런 어려운 상황이 언제까지 계속될까요",
    "그런 말씀은 그만해주세요",
    "정말 이해하기 어려운 분이네요",
    "아 정말 화가 나서 힘들어요"
  ];

  // 타이핑 애니메이션
  const typeMessage = (message: string, callback?: () => void): void => {
    setIsTyping(true);
    setCurrentMessage('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        setCurrentMessage(message.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        if (callback) callback();
      }
    }, 80);
  };

  // AI 분석 시뮬레이션
  const analyzeMessage = (): void => {
    setIsAnalyzing(true);
    setDetectionResult(null);
    
    setTimeout(() => {
      setDetectionResult({
        hasInappropriateContent: true,
        confidence: 96
      });
      setIsAnalyzing(false);
      
      // 정제된 메시지 표시
      setTimeout(() => {
        setPurifiedMessage(purifiedVersions[messageIndex]);
      }, 800);
    }, 1500);
  };

  // 자동 메시지 생성
  useEffect(() => {
    const generateMessage = (): void => {
      const message = sampleMessages[messageIndex];
      typeMessage(message, () => {
        setTimeout(analyzeMessage, 800);
      });
    };

    generateMessage();
    
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % sampleMessages.length);
      setCurrentMessage('');
      setPurifiedMessage('');
      setDetectionResult(null);
    }, 7000);

    return () => clearInterval(interval);
  }, [messageIndex]);

  return (
    <Container>
      <MainCard>
        <CardWrapper>
          <Content>
            {/* 원본 메시지 */}
            <MessageSection>
              <MessageLabel $color="red">
                <StatusDot $color="red" />
                <CustomTitle $color="red">원본 메시지</CustomTitle>
              </MessageLabel>
              <CodeBlock $borderColor="red">
                <CodeLine>{"{"}</CodeLine>
                <CodeContent>
                 <CodeKey>{'"text"'}</CodeKey>
                  <CodeColon>:</CodeColon>
                  <CodeValue>
                    {`"${currentMessage}"`}{isTyping && <Cursor>|</Cursor>}
                    {isTyping && <Cursor>|</Cursor>}
                  </CodeValue>
                </CodeContent>
                   <CodeLine>{"}"}</CodeLine>
              </CodeBlock>
            </MessageSection>

            {/* AI 처리 상태 */}
            <StatusContainer>
              {isAnalyzing ? (
                <StatusBadge $variant="analyzing">
                  <SpinningIcon />
                  <span>AI 분석 중...</span>
                </StatusBadge>
              ) : detectionResult ? (
                <DetectionContainer>
                  <StatusBadge $variant="detected">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span>
                      부적절한 표현 감지
                    </span>
                  </StatusBadge>
                  <BouncingArrow />
                </DetectionContainer>
              ) : (
                <Placeholder />
              )}
            </StatusContainer>

            {/* 순화된 메시지 */}
            <PurifiedContainer $isVisible={!!purifiedMessage}>
              <MessageLabel $color="green">
                <StatusDot $color="green" />
                <CustomTitle2 $color="green">정제된 메시지</CustomTitle2>
              </MessageLabel>
              <CodeBlock $borderColor="green">
                <CodeLine>{"{"}</CodeLine>
                <CodeContent>
                  <CodeKey>{'"text"'}</CodeKey>
                  <CodeColon>:</CodeColon>
                  <CodeValue>
                    {`"${purifiedMessage}"`}
                  </CodeValue>
                </CodeContent>
                <CodeLine>{"}"}</CodeLine>
              </CodeBlock>
            </PurifiedContainer>

            {/* 성공 메시지 */}
            {purifiedMessage && (
              <SuccessMessage>
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>메시지가 성공적으로 정제되었습니다</span>
              </SuccessMessage>
            )}
          </Content>
        </CardWrapper>
      </MainCard>
    </Container>
  );
};

export default AIMessagePurifier;