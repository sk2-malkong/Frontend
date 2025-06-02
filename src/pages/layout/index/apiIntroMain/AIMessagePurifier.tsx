import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Shield, AlertTriangle, Sparkles } from 'lucide-react';

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  transform-origin: top right;
  height: 100%;
`;

const MainCard = styled.div`
  aspect-ratio: 4 / 1;
  max-height: 90vh;
  height: auto;
  max-width: 100rem;
  width: 100%;
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
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 300px;
  width: 100%;
  min-width: 400px;
`;

const MessageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
  font-size: 16px;
  color: ${props => props.$color === 'red' ? 'rgb(248, 113, 113)' : 'rgb(74, 222, 128)'};
`;

const CustomTitle = styled(Title)`
  font-size: 20px;
`;

const CustomTitle2 = styled(Title)`
  font-size: 20px;
`;

const StatusDot = styled.div<{ $color: 'red' | 'green' }>`
  width: 0.375rem;
  height: 0.375rem;
  background-color: ${props => props.$color === 'red' ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'};
  border-radius: 50%;
  margin-right: 0.375rem;
`;

const CodeBlock = styled.div<{ $borderColor: 'red' | 'green' }>`
  background: rgba(15, 23, 42, 0.7);
  border-radius: 0.4rem;
  padding: 0.5rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  border: 1px solid ${props =>
      props.$borderColor === 'red'
          ? 'rgba(239, 68, 68, 0.2)'
          : 'rgba(34, 197, 94, 0.2)'};
  width: 18rem;
  max-width: 100%;
  margin: 0 auto;
  text-align: left;
`;

const CodeLine = styled.div`
  color: rgb(148, 163, 184);
  margin-bottom: 0.1rem;

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
  font-size: 12px;
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
  padding: 0.5rem 0;
  min-height: 3rem;
`;

const StatusBadge = styled.div<{ $variant: 'analyzing' | 'detected' }>`
  display: flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid;
  font-weight: 500;
  font-size: 12px;

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

const SpinningIcon = styled(Sparkles)`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
  animation: ${spin} 1s linear infinite;
`;

const PurifiedContainer = styled.div<MessageContainerProps>`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all 0.5s ease;
  opacity: ${props => props.$isVisible ? 1 : 0.3};
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
                    <StatusBadge $variant="detected">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      <span>
                    부적절한 표현 감지
                  </span>
                    </StatusBadge>
                ) : (
                    <Placeholder />
                )}
              </StatusContainer>

              {/* 순화된 메시지 */}
              <PurifiedContainer $isVisible={!!purifiedMessage}>
                <MessageLabel $color="green">
                  <StatusDot $color="green" />
                  <CustomTitle2 $color="green">순화된 메시지</CustomTitle2>
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


            </Content>
          </CardWrapper>
        </MainCard>
      </Container>
  );
};

export default AIMessagePurifier;