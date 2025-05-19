import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as S from "../DocsStyle";
import MarkdownRenderer from "../components/MarkdownRenderer";

const RequestPage: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/docs/request.md")
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


export default RequestPage;
