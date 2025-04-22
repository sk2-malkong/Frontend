import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import S from './style';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';

// 욕설 필터링 사전
const badWords = {
  '바보': '친구',
  '멍청이': '똑똑이',
  '씨발': '세상아',
  '병신': '천재',
  '미친놈': '재밌는 사람',
};

// 욕설 필터링 함수 (빨간색 표시)
const filterBadWords = (text) => {
  let newText = text;
  Object.keys(badWords).forEach((badWord) => {
    const regex = new RegExp(badWord, 'gi');
    newText = newText.replace(regex, () => `<span style="color: red;">${badWords[badWord]}</span>`);
  });
  return newText;
};

const MainChat = () => {
  const navigate = useNavigate();
  const chatEndRef1 = useRef(null);
  const chatEndRef2 = useRef(null);

  const [messages1, setMessages1] = useState([
    { send: 'user', text: '팀 모집은 누구나 가능한가요?' },
    { send: 'bot', text: '등급이 export인 사용자만 가능합니다.' },
    { send: 'bot', text: '초보자부터 고급자까지, 팀원과 함께 성장할 기회를 얻어가세요!' },
  ]);

  const [messages2, setMessages2] = useState([
    { send: 'user', text: '이번 주말 홍대에서 공연하는데 같이 할 아티스트 구해요! 🎸🎤' },
    { send: 'bot', text: '저 관심 있어요! 어떤 장르 하시나요? 🎶' },
    { send: 'user', text: '보컬 참여 가능할까요? 커버곡도 하시나요? 🎤' },
    { send: 'bot', text: '네! 보컬 환영이에요!' },
  ]);

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out', once: true });
  }, []);

  const handleSendMessage1 = () => {
    if (inputValue1.trim()) {
      const filtered = filterBadWords(inputValue1);
      setMessages1([...messages1, { send: 'user', text: filtered }]);
      setInputValue1('');
    }
  };

  const handleSendMessage2 = () => {
    if (inputValue2.trim()) {
      const filtered = filterBadWords(inputValue2);
      setMessages2([...messages2, { send: 'user', text: filtered }]);
      setInputValue2('');
    }
  };

  const handleClick = () => {
    navigate('/main');
  };

  return (
    <S.Wrapper>
      <S.MainWrapper>
        <S.BackgroundAnimation />

        {/* 인트로 */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <S.Title>AI가 실시간으로 욕설과 비속어를 감지해 안전하게 교정해줍니다!</S.Title>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          <S.Description>
            입력한 채팅을 AI가 즉시 분석하여, 부적절한 표현은 자동으로 순화된 단어로 교체합니다.<br />
            건강하고 따뜻한 소통 문화를 함께 만들어가요!
          </S.Description>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <S.ButtonWrap>
            <S.Button onClick={handleClick}>메인 페이지로</S.Button>
          </S.ButtonWrap>
        </motion.div>

        {/* 채팅 안내 문구 */}
        <S.ChatNotice>
          ✨ 아래 채팅창에 입력하면 AI가 부적절한 표현을 실시간으로 순화해줍니다!
        </S.ChatNotice>

        {/* 💬 Main Chat 영역 */}
        <S.TopWrapper>
          <S.SectionWrapper1 data-aos="fade-up">
            <S.ChatArea>
              {messages1.map((msg, index) => (
                <S.ChatBubble1
                  key={index}
                  user={msg.send === 'user'}
                  align={msg.send === 'user' ? 'right' : 'left'}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              ))}
              <div ref={chatEndRef1} />
            </S.ChatArea>

            <S.InputWrapper>
              <S.Input
                type="text"
                value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
                placeholder="메시지를 입력하세요..."
              />
              <S.SendButton onClick={handleSendMessage1}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </S.SendButton>
            </S.InputWrapper>
          </S.SectionWrapper1>

          <S.InfoBlock1 data-aos="fade-left">
            <S.InfoTitle>나만의 팀 결성!</S.InfoTitle>
            <S.InfoText>팀을 만들어 앞으로 나아갈 꿈을 보여주세요!</S.InfoText>
          </S.InfoBlock1>
        </S.TopWrapper>

        <S.BottomWrapper>
          <S.InfoBlock2 data-aos="fade-right">
            <S.InfoTitle>새로운 동료와 도전</S.InfoTitle>
            <S.InfoText>같은 꿈을 가진 팀원을 만나 함께 성장해보세요!</S.InfoText>
          </S.InfoBlock2>

          <S.SectionWrapper2 data-aos="fade-up">
            <S.ChatArea>
              {messages2.map((msg, index) => (
                <S.ChatBubble2
                  key={index}
                  user={msg.send === 'user'}
                  align={msg.send === 'user' ? 'right' : 'left'}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              ))}
              <div ref={chatEndRef2} />
            </S.ChatArea>

            <S.InputWrapper>
              <S.Input
                type="text"
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
                placeholder="메시지를 입력하세요..."
              />
              <S.SendButton onClick={handleSendMessage2}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </S.SendButton>
            </S.InputWrapper>
          </S.SectionWrapper2>
        </S.BottomWrapper>

      </S.MainWrapper>
    </S.Wrapper>
  );
};

export default MainChat;
