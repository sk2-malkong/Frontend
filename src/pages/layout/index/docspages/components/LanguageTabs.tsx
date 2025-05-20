import React, { useState } from "react";
import * as S from "./LanguageTabsStyle";
import CopyButton from "./CopyButton";

interface LanguageTabsProps {
  codeMap: Record<string, string>;
}

const LanguageTabs: React.FC<LanguageTabsProps> = ({ codeMap }) => {
  const languages = Object.keys(codeMap);
  const [activeLang, setActiveLang] = useState(languages[0]);

  return (
    <S.Container>
      <S.TabList>
        {languages.map((lang) => (
          <S.Tab
            key={lang}
            $active={activeLang === lang}
            onClick={() => setActiveLang(lang)}
          >
            {lang}
          </S.Tab>
        ))}
      </S.TabList>

      <S.CodeBlock>
        <CopyButton text={codeMap[activeLang]} />
        <pre>
          <code>{codeMap[activeLang]}</code>
        </pre>
      </S.CodeBlock>
    </S.Container>
  );
};

export default LanguageTabs;
