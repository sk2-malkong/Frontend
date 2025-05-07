import React, { useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import S from "./style";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ scrollY, anchorRef }) => {
  const introTimeline = useRef(null);
  const heroRef = useRef(null);
  const curvedRef = useRef(null);
  const brandRef = useRef(null);
  const logoHero = useRef(null);
  const introTextRef = useRef(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      introTimeline.current?.restart(true);
    });
  }, []);

  useEffect(() => {
  
    gsap.set(
      [curvedRef.current, brandRef.current, logoHero.current, introTextRef.current, anchorRef.current],
      { opacity: 0 }
    );
    introTimeline.current = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });
    introTimeline.current = gsap.timeline({ delay: 0.5 })
      .to(curvedRef.current, { opacity: 1, y: 0, duration: 1 })
      .to(brandRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.8");
    gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top+=150",
        end: "+=700",
        scrub: true,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      },
    })
    .to(brandRef.current, { opacity: 0, y: 50, duration: 1 }, 0)          
    .to(curvedRef.current, { opacity: 1, y: -50, duration: 4.0, ease: "power2.out" }, 0)
    .to(logoHero.current, { opacity: 1, scale: 1, duration: 3.0, ease: "back.out(1.7)" }, 2.5)
    .to(introTextRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, 2.8)
    .to(curvedRef.current, { opacity: 0, x: -100, duration: 4.0 }, 6.0)      
    .to(introTextRef.current, { opacity: 0, x: 100, duration: 5.0 }, 6.0)
    .to(logoHero.current, { opacity: 0, scale: 0.5, y: "-50vh", duration: 4, ease: "power2.out" },7 )
    .to(anchorRef.current, { opacity: 1, duration: 2 }, 40);
  }, [anchorRef]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <S.HeroSection ref={heroRef}>
      <S.CloudBackground />

      <S.HeroTextBlock style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
        <div className="svg-clip-wrapper" ref={curvedRef}>
          <svg viewBox="0 0 600 50" width="500" height="100">
            <path id="curve" d="M50,70 C150,10 450,10 550,70" fill="transparent" />
            <text textAnchor="middle">
              <textPath xlinkHref="#curve" startOffset="50%" fontSize="40" fill="#fff">
                비속어 감지 및 순환 AI 서비스
              </textPath>
            </text>
          </svg>
        </div>

        <div ref={brandRef} style={{ willChange: "transform, opacity" }}>
          <strong>AI가 비속어를 감지하여 순화 대체하는 서비스</strong>
        </div>
        <svg
          ref={logoHero}
          width="250"
          height="250"
          style={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0,           
            willChange: "transform, opacity",
          }}
        >
          <image href="/images/purgo-logo.png" width="250" height="250" />
        </svg>
      </S.HeroTextBlock>
      <S.IntroText
        ref={introTextRef}
        style={{
          top: "70%",
          opacity: 0,               
          willChange: "transform, opacity",
        }}
      >
        <strong>
          채팅과 게시판에서 비속어를 감지하고 순화된 언어로 자동 교체합니다.
          <br />
          누구나 편안한 대화를 나눌 수 있는 공간을 만들어보세요.
        </strong>
      </S.IntroText>

      <S.ScrollIndicator scrollY={scrollY}>
        <span>Scroll down</span>
        <div className="chevron" />
        <div className="chevron" />
        <div className="chevron" />
      </S.ScrollIndicator>
    </S.HeroSection>
  );
};

HeroSection.propTypes = {
  scrollY: PropTypes.number.isRequired,
  anchorRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};

export default HeroSection;
