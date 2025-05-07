
import React from "react";
import S from "./style";

const ReviewSection = () => (
  <S.ReviewSection data-aos="fade-up">
    <h2>💬 사용자 후기</h2>
    <S.ReviewGrid>
      <S.ReviewCard>
        <p>&quot;욕이 사라지니까 채팅방 분위기가 확 바뀌었어요!&quot;</p>
        <span>- 준호, 고등학생</span>
      </S.ReviewCard>
      <S.ReviewCard>
        <p>&quot;게시판 글도 더 읽기 편하고 부드러워졌습니다.&quot;</p>
        <span>- 수진, 대학생</span>
      </S.ReviewCard>
      <S.ReviewCard>
        <p>&quot;아이들이 사용할 수 있어 안심돼요.&quot;</p>
        <span>- 영은, 학부모</span>
      </S.ReviewCard>
    </S.ReviewGrid>
  </S.ReviewSection>
);

export default ReviewSection;
