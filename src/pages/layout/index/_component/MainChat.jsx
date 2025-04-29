import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import CountUp from "react-countup";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import S, { GlobalStyle } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const badWords = {
  바보: "친구",
  멍청이: "똑똑이",
  씨발: "세상아",
  병신: "천재",
  미친놈: "재밌는 사람",
};

const filterWithAnimation = (text, addMessage) => {
  let html = text;
  Object.entries(badWords).forEach(([bad, good]) => {
    const regex = new RegExp(bad, "gi");
    if (regex.test(html)) {
      const id = `w-${Date.now()}`;
      html = html.replace(
        regex,
        `<span id="${id}" style="color:red;opacity:1;">${bad}</span>`
      );
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          gsap.to(el, {
            opacity: 0,
            duration: 0.6,
            onComplete: () => {
              el.innerHTML = `<span style="color:#5784e1;font-weight:bold">${good}</span>`;
              gsap.to(el, { opacity: 1, duration: 0.6 });
            },
          });
        }
      }, 100);
    }
  });
  addMessage({ sender: "user", html });
};

export default function MainChat() {
  const handleClickImage = () => {
    window.location.href = "/";
  };
  const [messages, setMessages] = useState([
    { sender: "bot", html: "Purgo에 오신 걸 환영합니다! 메시지를 입력해 보세요." },
  ]);
  const [input, setInput] = useState("");
  const [scrollY, setScrollY] = useState(0);

  const navigate = useNavigate();
  const introTimeline =useRef(null);

  const endRef = useRef(null);
  const heroRef = useRef(null);
  const curvedRef = useRef(null);
  const brandRef = useRef(null);
  const logoHero = useRef(null);
  const introTextRef = useRef(null);
  const anchorRef = useRef(null);
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2) 브라우저 복원 후 다음 프레임에 최상단 고정 + 애니메이션 리스타트
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
      introTimeline.current?.restart(true);
    });
  }, []);

  // 3) 기존 페이지 로드시에도 동일하게 적용 (optional)
  useEffect(() => {
    const onLoad = () => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
        introTimeline.current?.restart(true);
      });
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    introTimeline.current = gsap.timeline({ delay: 0.5 })
    gsap.set(curvedRef.current, { opacity: 0, y: -30 });
    gsap.set(brandRef.current, { opacity: 0, y: 30 });
    gsap.set(logoHero.current, { scale: 0.8, opacity: 0 });
    gsap.set(introTextRef.current, { opacity: 0, y: -30 });
    gsap.set(anchorRef.current, { opacity: 0 });

    gsap.timeline({ delay: 0.5 })
      .to(curvedRef.current, { opacity: 1, y: 0, duration: 1 })
      .to(brandRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.8");

    gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top+=100",
        end: "+=300",
        scrub: true,
        markers: false,
        pin: true,
      },
    })
      .to(brandRef.current, { opacity: 0, y: 50, duration: 0.3 }, 0)
      .to(logoHero.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" }, 0.5)
      .to(curvedRef.current, {
        opacity: 0,
        scale: 0.5,
        y: -50,
        duration: 1.5,
        ease: "power2.out",
      }, 0)
      .to(introTextRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.5)
      .to(logoHero.current, {
        opacity: 0,
        scale: 0.5,
        y: "-50vh",
        duration: 2,
        ease: "power2.out",
      }, 1.0)
      .to(introTextRef.current, {
        opacity: 0,
        scale: 0.5,
        y: -50,
        duration: 1.5,
        ease: "power2.out",
      }, 1.0)
      .to(anchorRef.current, { opacity: 1, duration: 0.5 }, 1.5);
  }, []);
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prevCount = useRef(messages.length);
  useEffect(() => {
    if (endRef.current && messages.length > prevCount.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
    prevCount.current = messages.length;
  }, [messages]);

  const addMessage = (msg) => setMessages((cur) => [...cur, msg]);
  const sendMessage = () => {
    if (!input.trim()) return;
    filterWithAnimation(input, addMessage);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleSendMessage = () => {
    sendMessage();
  };
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out',
      once: true,
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.svglocation className="svglocation" style={{ zIndex: 1000 }}>
          <Link to="/" ref={anchorRef}>
            <img
              src="/images/purgo-logo.png"
              alt="purgo-logo"
              onClick={handleClickImage}
            />
          </Link>
        </S.svglocation>
        <S.HeroSection ref={heroRef}>
          <S.CloudBackground />
          <S.HeroTextBlock>
            <div className="svg-clip-wrapper" ref={curvedRef}>
              <svg viewBox="0 0 600 50" width="500" height="100">
                <path id="curve" d="M50,70 C150,10 450,10 550,70" fill="transparent" stroke="none" />
                <text textAnchor="middle">
                  <textPath xlinkHref="#curve" startOffset="50%" fontSize="40" fill="#fff">
                    AI가 언어를 순화해줍니다
                  </textPath>
                </text>
              </svg>
            </div>
            <div ref={brandRef}>
              <strong>AI가 비속어를 감지하여 순화 대체하는 서비스</strong>
            </div>
            <svg ref={logoHero} width="250" height="250" style={{ position: "absolute", top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <image href="/images/purgo-logo.png" width="250" height="250" />
            </svg>
          </S.HeroTextBlock>
          <S.IntroText ref={introTextRef} style={{ top: '70%' }}>
            <strong>채팅과 게시판에서 비속어를 감지하고 순화된 언어로 자동 교체합니다.<br />누구나 편안한 대화를 나눌 수 있는 공간을 만들어보세요.</strong>
          </S.IntroText>
          <S.ScrollIndicator scrollY={scrollY}>
            <span>Scroll down</span>
          </S.ScrollIndicator>
        </S.HeroSection>
        <S.ServiceSection>
          <S.ServiceTitle  data-aos="fade-right">우리 서비스 소개</S.ServiceTitle>
          <S.ServiceWrapper>
            <S.ServiceItem onClick={() => navigate("/")} data-aos="fade-down" data-aos-delay="100"> 
              <S.ServiceIcon><img src="/images/rocketchat-brands.svg" alt="chat" /></S.ServiceIcon>
              <S.ServiceText>채팅</S.ServiceText>
            </S.ServiceItem>
            <S.ServiceItem  onClick={() => {window.location.href = "/main";}} data-aos="fade-down" data-aos-delay="200"> 
              <S.ServiceIcon><img src="/images/address-card-solid.svg" alt="board" /></S.ServiceIcon>
              <S.ServiceText>게시판</S.ServiceText>
            </S.ServiceItem>
            <S.ServiceItem onClick={() => navigate("/")} data-aos="fade-down" data-aos-delay="300"> 
              <S.ServiceIcon><img src="/images/microphone-solid.svg" alt="voice" /></S.ServiceIcon>
              <S.ServiceText>음성</S.ServiceText>
            </S.ServiceItem>
          </S.ServiceWrapper>
        </S.ServiceSection>
        <S.MainWrapper>
          <S.ChatNotice data-aos="fade-up">
            ✨ 아래 채팅창에 아무 말이나 입력해보세요. <br />
            AI가 순화된 단어로 교체해줍니다!
          </S.ChatNotice>

          {/* 채팅 박스 */}
          <S.SectionWrapper1 data-aos="fade-up">
            <S.ChatArea>
              {messages.map((msg, idx) => (
                <S.ChatBubble1
                  key={idx}
                  align={msg.sender === 'user' ? 'right' : 'left'}
                  dangerouslySetInnerHTML={{ __html: msg.html }}
                />
              ))}
            </S.ChatArea>

            <S.InputWrapper>
              <S.Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
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
                오늘 총 <span className="count-highlight">
                  <CountUp end={1583} duration={2} separator="," />
                </span> 회 순화됨
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
    </>
  );
}
