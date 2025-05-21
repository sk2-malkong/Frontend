import React, { useEffect, useState } from "react";
import S from "./BeWater";

const ripplePositions = [
  { top: "20%", left: "30%" },
  { top: "40%", left: "70%" },
  { top: "80%", left: "50%" },
  { top: "15%", left: "80%" },
  { top: "60%", left: "20%" },
  { top: "75%", left: "75%" },
  { top: "30%", left: "10%" },
  { top: "50%", left: "90%" },
];

const fishPositions = [
  { top: "110vh", left: "30vw" },
  { top: "50vh", left: "-5vw" },
  { top: "110vh", left: "70vw" },
];

interface IntroProps {
  active: boolean;
}

const Intro: React.FC<IntroProps> = ({ active }) => {
  const [ripples, setRipples] = useState<{ id: string; top: string; left: string }[]>([]);

  useEffect(() => {
    if (!active) return; // 비활성화되면 애니메이션 멈춤

    const spawnRipples = () => {
      ripplePositions.forEach((pos, index) => {
        setTimeout(() => {
          const id = `${Date.now()}-${index}`;
          setRipples((prev) => [...prev, { ...pos, id }]);
          setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
          }, 4000);
        }, index * 1000);
      });
    };

    spawnRipples();
    const interval = setInterval(spawnRipples, 9000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <S.Container>
      <S.Pond>
        <div className="fish-group">
          {fishPositions.map((pos, i) => (
            <S.Fish key={i} style={{ top: pos.top, left: pos.left }}>
              <S.Head />
              <S.Part />
              <S.Tail />
            </S.Fish>
          ))}
        </div>
        <div className="ripple-group">
          {ripples.map((r) => (
            <S.Ripple key={r.id} style={{ top: r.top, left: r.left }} />
          ))}
        </div>
        <S.Film />
      </S.Pond>

      <S.Quote>
        <figure>
          <blockquote>
            <S.Wave>Purgo</S.Wave>
            <br />
            <S.Wave className="oppo">비속어 탐지 순화 AI</S.Wave>
          </blockquote>
        </figure>
      </S.Quote>

      {/* SVG Filters */}
      <S.SvgFilters xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </S.SvgFilters>

      <S.SvgFilters xmlns="http://www.w3.org/2000/svg">
        <filter id="displacementFilter" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            id="sea-filter"
            type="turbulence"
            baseFrequency="0.02 0.05"
            numOctaves="3"
            seed="2"
            result="turbulence"
          />
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <animate
            xlinkHref="#sea-filter"
            attributeName="baseFrequency"
            dur="60s"
            keyTimes="0;0.5;1"
            values="0.02 0.06;0.04 0.08;0.02 0.06"
            repeatCount="indefinite"
          />
        </filter>
      </S.SvgFilters>
    </S.Container>
  );
};

export default Intro;
