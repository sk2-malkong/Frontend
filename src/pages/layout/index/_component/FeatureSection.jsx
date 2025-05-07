
import React from "react";
import S from "./style";

const FeatureSection = () => (
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
);

export default FeatureSection;
