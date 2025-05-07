
import React from "react";
import S from "./style";

const FaqSection = () => (
  <S.FaqSection data-aos="fade-up">
    <h2>❓ 자주 묻는 질문</h2>
    <S.FaqList>
      <S.FaqItem>
        <strong>Q. 욕설이 아닌 단어도 필터링되는 경우가 있어요.</strong>
        <p>
          AI는 문맥을 분석하여 욕설 가능성이 높은 단어를 판단합니다.
          순화 결과가 어색하다면 피드백 기능을 통해 개선해나갑니다.
        </p>
      </S.FaqItem>
      <S.FaqItem>
        <strong>Q. 감정 표현도 바뀌는 건가요?</strong>
        <p>
          아니요! 감정의 뉘앙스는 최대한 유지하며, 공격적인 표현만 순화합니다.
        </p>
      </S.FaqItem>
      <S.FaqItem>
        <strong>Q. 필터링 기준은 어떻게 정하나요?</strong>
        <p>
          공공기관의 욕설 기준과 커뮤니티 사례를 기반으로, AI가 사용자 피드백을 바탕으로 학습합니다.
        </p>
      </S.FaqItem>
    </S.FaqList>
  </S.FaqSection>
);

export default FaqSection;
