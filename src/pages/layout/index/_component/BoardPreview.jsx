
import React from "react";
import S from "./style";

const BoardPreview = () => (
  <S.BoardPreview data-aos="fade-up">
    <h2>🧪 게시판 댓글 순화 전/후 예시</h2>
    <div className="original">
      <strong>원본:</strong> &quot;이딴 거 왜 올림? 개노잼이네 진짜ㅋㅋ&quot;
    </div>
    <div className="filtered">
      <strong>AI 순화:</strong> &quot;이런 건 좀 아쉬워요! 다른 재미도 기대할게요 :)&quot;
    </div>
  </S.BoardPreview>
);

export default BoardPreview;
