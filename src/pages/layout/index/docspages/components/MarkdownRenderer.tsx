import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ComponentProps, useState } from "react";
import { Element } from "hast";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";

// 언어 등록
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("ts", ts);
SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("bash", bash);

interface MarkdownRendererProps {
  content: string;
}

interface CodeProps extends ComponentProps<"code"> {
  inline?: boolean;
  children?: React.ReactNode;
  node?: Element & {
    position?: {
      start: { line: number };
      end: { line: number };
    };
    properties?: {
      className?: string;
    };
  };
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, children, className, node, ...props }: CodeProps) {
          const codeText = String(children).trim();
          const isMultiline =
            !!node?.position && node.position.end.line > node.position.start.line;

          const langMatch = className?.match(/language-(\w+)/);
          const language = langMatch ? langMatch[1].toLowerCase() : "text";

          if (!isMultiline) {
            return (
              <code
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#e83e8c",
                  fontFamily:
                    "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
                  padding: "0.2em 0.4em",
                  fontSize: "1rem",
                  borderRadius: "4px",
                  letterSpacing: "0.05em",
                }}
                {...props}
              >
                {children}
              </code>
            );
          }

          return <CodeBlock codeText={codeText} language={language} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;

// ✅ 복사 상태를 CodeBlock 내부에서 관리
const CodeBlock = ({
  codeText,
  language,
}: {
  codeText: string;
  language: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ position: "relative", marginBottom: "1.5rem" }}>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          borderRadius: "8px",
          padding: "1.5rem",
          fontSize: "0.95rem",
          lineHeight: "1.8",
          letterSpacing: "0.05em",
          backgroundColor: "#1e2a38",
          fontFamily:
            "'Fira Code', 'Consolas', 'Liberation Mono', Menlo, monospace",
        }}
        codeTagProps={{
          style: {
            fontSize: "0.95rem",
            letterSpacing: "0.05em",
          },
        }}
      >
        {codeText}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "8px",
          right: "12px",
          padding: "4px 8px",
          fontSize: "12px",
          backgroundColor: copied ? "#38a169" : "#2b6cb0",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {copied ? "복사됨!" : "복사"}
      </button>
    </div>
  );
};
