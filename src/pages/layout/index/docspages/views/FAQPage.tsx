import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as S from "../DocsStyle";

const FAQPage: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/docs/faq.md")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() =>
        setContent("❌ FAQ 문서를 불러오는 데 실패했습니다.")
      );
  }, []);

  return (
    <S.MainContent>
      <S.FAQWrapper>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            blockquote({ children }) {
              return <div className="faq-box">{children}</div>;
            },
            // @ts-expect-error: paragraph는 ReactMarkdown에 타입 정의되어 있지 않지만 동작함
            paragraph({ children }: { children: React.ReactNode }) {
              const firstChild = Array.isArray(children) ? children[0] : children;

              // 텍스트를 정확히 추출
              const text =
                typeof firstChild === "string"
                  ? firstChild
                  : typeof firstChild === "object" &&
                    firstChild !== null &&
                    "props" in firstChild
                  ? String((firstChild as any).props.children)
                  : "";

              if (text.startsWith("Q.")) {
                return <p className="faq-question">{children}</p>;
              }

              if (text.startsWith("A.")) {
                return <p className="faq-answer">{children}</p>;
              }

              return <p>{children}</p>;
            },
            strong({ children }) {
              const content = String(children);
              if (content === "Q.") {
                return <strong className="faq-q-label">Q.</strong>;
              } else if (content === "A.") {
                return <strong className="faq-a-label">A.</strong>;
              }
              return <strong>{children}</strong>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </S.FAQWrapper>
    </S.MainContent>
  );
};

export default FAQPage;
