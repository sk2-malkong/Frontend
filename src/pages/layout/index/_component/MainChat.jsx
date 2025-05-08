import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import S, { GlobalStyle } from "./style";
import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import ChatSection from "./ChatSection";
import StatsSection from "./StatsSection";
import ReviewSection from "./ReviewSection";
import FeatureSection from "./FeatureSection";
import BoardPreview from "./BoardPreview";
import AdminDashboard from "./AdminDashboard";
import FaqSection from "./FaqSection";

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
      html = html.replace(regex, `<span id="${id}" style="color:red;opacity:1;">${bad}</span>`);
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

const MainChat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", html: "Purgo에 오신 걸 환영합니다! 메시지를 입력해 보세요." }
  ]);
  const [input, setInput] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const anchorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const addMessage = (msg) => setMessages(cur => [...cur, msg]);
  const sendMessage = () => {
    if (!input.trim()) return;
    filterWithAnimation(input, addMessage);
    setInput("");
  };
  const handleKeyPress = (e) => { if (e.key === "Enter") sendMessage(); };

  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.svglocation
          ref={anchorRef}
          style={{
            zIndex: 1000,
            opacity: scrollY > 1000 ? 1 : 0     
          }}
        >
          <Link to="/" onClick={() => window.location.href = "/"}>
            <img src="/images/purgo-logo.png" alt="purgo-logo" />
          </Link>
        </S.svglocation>

        <HeroSection scrollY={scrollY} anchorRef={anchorRef} />
        <ServiceSection />

        <S.MainWrapper>
          <S.ChatNotice data-aos="fade-up">
            ✨ 아래 채팅창에 아무 말이나 입력해보세요. <br/>
            AI가 순화된 단어로 교체해줍니다!
          </S.ChatNotice>

          <ChatSection
            messages={messages}
            input={input}
            setInput={setInput}
            handleKeyPress={handleKeyPress}
            handleSendMessage={sendMessage}
          />

          <StatsSection />
          <ReviewSection />
          <FeatureSection />
          <BoardPreview />
          <AdminDashboard />
          <FaqSection />
        </S.MainWrapper>
      </S.Wrapper>
    </>
  );
};

export default MainChat;
