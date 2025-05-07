
import React from "react";
import CountUp from "react-countup";
import S from "./style";

const StatsSection = () => (
  <S.StatsSection data-aos="fade-up">
    <h2>✨ 오늘 순화된 단어 수</h2>
    <CountUp end={2587} duration={3} separator="," className="countup" />
    <p>지금도 AI는 여러분을 돕고 있어요.</p>
  </S.StatsSection>
);

export default StatsSection;
