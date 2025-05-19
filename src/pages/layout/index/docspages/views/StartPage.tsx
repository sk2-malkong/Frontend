import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as S from "../DocsStyle";

const StartPage: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/docs/start.md") // ✅ public/docs/start.md 파일에서 내용 불러오기
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() =>
        setContent("❌ 문서를 불러오는 데 실패했습니다. 파일을 확인해주세요.")
      );
  }, []);

  return (
    <S.MainContent>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </S.MainContent>
  );
};

export default StartPage;
