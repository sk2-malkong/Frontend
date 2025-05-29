import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const DocsContainer = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  background-color: white;
  color: black;
  margin-top: 70px;
`;

export const Sidebar = styled.div`
  width: 250px;
  padding: 2rem;
  background-color: #f2f2f2;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: sticky;   
  top: 70px;          

  height: calc(100vh - 70px);
  flex-shrink: 0;
`;

export const MenuTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  font-size: 1rem;

  &.active {
    font-weight: bold;
    color: #007bff;
  }

  &:hover {
    color: #007bff;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: white;
  color: black;
  
  max-width: 860px;
  margin: 0 auto;

  h1, h2, h3, h4, h5, h6,
  p, li, strong, em, a,
  th, td, code, pre, blockquote {
    color: black;
  }

  p {
    line-height: 1.8;
    margin-bottom: 1rem;
    color: #444444;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }


  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: disc;
    list-style-position: inside;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  ol {
  list-style-type: decimal;
  list-style-position: inside;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 2rem 0;
  }

  th {
    border: 1px solid #ccc;
    font-size: 1.15rem;
    font-weight: 600;
    padding: 0.5rem;
    text-align: left;
    background-color: #F5F6F9;
  }

  td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
  }

  th:first-child,
  td:first-child {
    border-left: none;
  }

  th:last-child,
  td:last-child {
    border-right: none;
  }

  a {
    text-decoration: underline;
    color: #007bff;
  }

  a:hover {
    color: #0056b3;
  }

  pre, pre code, code, pre > code {
  font-family: 'Source Code Pro', 'Consolas', 'Courier New', monospace !important;
  }

  pre {
  margin: 0;
  padding: 0;
  background: none;
  border: none;
}

  pre > code {
  all: unset; /* 완전 초기화 */
  }


  code {
  background-color: #f6f8fa;
  color: #e83e8c;
  padding: 0.2em 0.4em;
  font-size: 0.95rem;
  border-radius: 4px;
  }

  img {
    max-width: 80%;
    height: auto;
    display: block;
    margin: 1rem auto; // 필요시 중앙 정렬
  }

  img[src*="purgo-api-endpoint.png"] {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1rem auto;
  }

`;

export const FAQWrapper = styled.div`
  .faq-box {
    border-left: 5px solid #eee;
    background-color: #f9f9f9;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 8px;
    line-height: 1.8;

    .faq-q-label {
      color: #007bff;
      font-weight: 700;
      margin-right: 0.4rem;
    }

    .faq-a-label {
      color: #d9534f;
      font-weight: 600;
      margin-right: 0.4rem;
    }

    .faq-question {
      font-size: 18px;
      font-weight: 600;
      color: #000;
      margin-bottom: 0.5rem;
    }

    .faq-answer {
      font-size: 16px;
      font-weight: 400;
      color: #444;
      margin-bottom: 1rem;
    }

    ol {
      list-style-type: decimal;
      padding-left: 1.5rem;
      margin: 0.5rem 0;
    }

    li {
      margin-bottom: 0.3rem;
    }
  }

`;
