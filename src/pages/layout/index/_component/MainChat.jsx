import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import gsap from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import S from './style';

// 욕설 사전
const badWords = {
  '바보': '친구',
  '멍청이': '똑똑이',
  '씨발': '세상아',
  '병신': '천재',
  '미친놈': '재밌는 사람',
};

// 필터링 애니메이션 처리
const filterWithAnimation = (text, setMessages) => {
  let finalText = text;
  Object.keys(badWords).forEach((badWord) => {
    const regex = new RegExp(badWord, 'gi');
    if (regex.test(text)) {
      const replacement = badWords[badWord];
      const id = `word-${Date.now()}-${Math.random()}`;
      finalText = finalText.replace(regex, `<span id="${id}" style="color:red;opacity:1;">${badWord}</span>`);

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          gsap.to(el, {
            opacity: 0,
            duration: 0.6,
            onComplete: () => {
              el.innerHTML = `<span style="color:#5784e1;font-weight:bold;">${replacement}</span>`;
              gsap.to(el, { opacity: 1, duration: 0.6 });
            },
          });
        }
      }, 50);
    }
  });
  setMessages((prev) => [...prev, { send: 'user', text: finalText }]);
};

const MainChat = () => {
  const navigate = useNavigate();
  const [messages1, setMessages1] = useState([
    { send: 'bot', text: 'AI 욕설 순화 테스트를 시작해보세요!' },
  ]);
  const [inputValue1, setInputValue1] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✨ 엔터로 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputValue1.trim()) {
      filterWithAnimation(inputValue1, setMessages1);
      setInputValue1('');
    }
  };

  return (
    <S.Wrapper>
      <S.HeroOverlay />
      <S.MainWrapper>
        <S.Title>AI 욕설 순화 플랫폼</S.Title>
        <S.Description>
          채팅과 게시판에서 욕설을 감지하고 <strong>순화된 언어</strong>로 자동 교체합니다.<br />
          누구나 편안한 대화를 나눌 수 있는 공간을 만들어보세요.
        </S.Description>

        {/* ✨ 메인 페이지 이동 + 스크롤 맨 위 */}
        <S.ButtonWrap>
          <S.Button
            onClick={() => {
              navigate('/main');
              window.scrollTo(0, 0);
            }}
          >
            서비스 체험하기
          </S.Button>
        </S.ButtonWrap>

        <S.ChatNotice>
          ✨ 아래 채팅창에 아무 말이나 입력해보세요. <br />
          AI가 순화된 단어로 교체해줍니다!
        </S.ChatNotice>

        {/* 채팅 박스 */}
        <S.SectionWrapper1 data-aos="fade-up">
          <S.ChatArea>
            {messages1.map((msg, idx) => (
              <S.ChatBubble1
                key={idx}
                align={msg.send === 'user' ? 'right' : 'left'}
                user={msg.send === 'user'}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
          </S.ChatArea>

          <S.InputWrapper>
            <S.Input
              type="text"
              value={inputValue1}
              onChange={(e) => setInputValue1(e.target.value)}
              onKeyDown={handleKeyPress} // ✨ 엔터 입력 추가
              placeholder="메시지를 입력하세요"
            />
            <S.SendButton onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </S.SendButton>
          </S.InputWrapper>
        </S.SectionWrapper1>

        {/* 📊 통계 */}
        <S.StatsSection data-aos="fade-up">
          <h2>✨ 오늘 순화된 단어 수</h2>
          <CountUp end={2587} duration={3} separator="," className="countup" />
          <p>지금도 AI는 여러분을 돕고 있어요.</p>
        </S.StatsSection>

        {/* 💬 후기 */}
        <S.ReviewSection data-aos="fade-up">
          <h2>💬 사용자 후기</h2>
          <S.ReviewGrid>
            <S.ReviewCard>
              <p>"욕이 사라지니까 채팅방 분위기가 확 바뀌었어요!"</p>
              <span>- 준호, 고등학생</span>
            </S.ReviewCard>
            <S.ReviewCard>
              <p>"게시판 글도 더 읽기 편하고 부드러워졌습니다."</p>
              <span>- 수진, 대학생</span>
            </S.ReviewCard>
            <S.ReviewCard>
              <p>"아이들이 사용할 수 있어 안심돼요."</p>
              <span>- 영은, 학부모</span>
            </S.ReviewCard>
          </S.ReviewGrid>
        </S.ReviewSection>

        {/* 🧠 시스템 설명 */}
        <S.FeatureSection data-aos="fade-up">
          <h2>🧠 AI 필터링 시스템은 이렇게 작동해요</h2>
          <S.FeatureBox>
            <ol>
              <li>욕설 탐지</li>
              <li>문맥 분석</li>
              <li>적절한 대체어 선택</li>
              <li>실시간 순화 표시</li>
            </ol>
          </S.FeatureBox>
        </S.FeatureSection>

        {/* 🧪 게시판 예시 */}
        <S.BoardPreview data-aos="fade-up">
          <h2>🧪 게시판 댓글 순화 전/후 예시</h2>
          <div className="original">
            <strong>원본:</strong> "이딴 거 왜 올림? 개노잼이네 진짜ㅋㅋ"
          </div>
          <div className="filtered">
            <strong>AI 순화:</strong> "이런 건 좀 아쉬워요! 다른 재미도 기대할게요 :)"
          </div>
        </S.BoardPreview>

        {/* 📊 감지된 욕설 통계 */}
        <S.AdminDashboard data-aos="fade-up">
          <h2>📊 가장 많이 감지된 욕설</h2>
          <S.AdminCardSingle>
            <h3>“씨X” → “세상아”</h3>
            <p>
              오늘 총 <span className="count-highlight"><CountUp end={1583} duration={2} separator="," /></span> 회 순화됨
            </p>
          </S.AdminCardSingle>
        </S.AdminDashboard>

        {/* ❓ FAQ */}
        <S.FaqSection data-aos="fade-up">
          <h2>❓ 자주 묻는 질문</h2>
          <S.FaqList>
            <S.FaqItem>
              <strong>Q. 욕설이 아닌 단어도 필터링되는 경우가 있어요.</strong>
              <p>AI는 문맥을 분석하여 욕설 가능성이 높은 단어를 판단합니다. 순화 결과가 어색하다면 피드백 기능을 통해 개선해나갑니다.</p>
            </S.FaqItem>
            <S.FaqItem>
              <strong>Q. 감정 표현도 바뀌는 건가요?</strong>
              <p>아니요! 감정의 뉘앙스는 최대한 유지하며, 공격적인 표현만 순화합니다.</p>
            </S.FaqItem>
            <S.FaqItem>
              <strong>Q. 필터링 기준은 어떻게 정하나요?</strong>
              <p>공공기관의 욕설 기준과 커뮤니티 사례를 기반으로, AI가 사용자 피드백을 바탕으로 학습합니다.</p>
            </S.FaqItem>
          </S.FaqList>
        </S.FaqSection>
      </S.MainWrapper>
    </S.Wrapper>
  );
};

export default MainChat;
