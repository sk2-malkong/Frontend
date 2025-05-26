/* eslint-disable react/prop-types */
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CopyButton from "../components/CopyButton";
import styled from "styled-components";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: (props) => {
          const { children, className } = props;
          const codeText = String(children).trim();
          const language = className?.replace("language-", "") ?? "";
          const isBlock = !!className || codeText.includes("\n");

          if (!isBlock) {
            return <code>{codeText}</code>;
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

const CodeBlock = ({ codeText, language }: { codeText: string; language: string }) => {
  return (
    <Wrapper>
      <CopyButton text={codeText} />
      <code className={`language-${language}`}>{codeText}</code>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin: 1.5rem 0;
  background-color: #f5f7fa;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: 'Source Code Pro', 'Consolas', 'Courier New', monospace;
  overflow-x: auto;

  code {
    display: block;
    white-space: pre;
    background: none;
    color: #2d2d2d;
    padding: 0;
    margin: 0;
  }
`;
