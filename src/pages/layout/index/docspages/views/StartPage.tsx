import React, { useEffect, useState } from "react";
import MarkdownRenderer from "../components/MarkdownRenderer"; // ✅ 커스텀 렌더러 import
import * as S from "../DocsStyle";

const StartPage: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/docs/start.md")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() =>
        setContent("❌ 문서를 불러오는 데 실패했습니다. 파일을 확인해주세요.")
      );
  }, []);

  return (
    <S.MainContent>
      <MarkdownRenderer content={content} />
    </S.MainContent>
  );
};

export default StartPage;
