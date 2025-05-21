// src/pages/layout/index/detailpage/DetailPage.tsx
import React, { useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import DetailFirstSection from './DetailFirstSection';
import DetailSecondSection from './DetailSecondSection';
import DetailThreadSection from './DetailThreadSection';

const anchors: string[] = ['first', 'second', 'thread'];

const DetailPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(0);

  return (
    <ReactFullpage
      licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
      credits={{ enabled: false }}
      anchors={anchors}
      navigation
      navigationPosition="right"
      scrollingSpeed={700}
      afterLoad={(_origin, destination) => {
        setActiveSection(destination.index);
      }}
      render={({ state, fullpageApi }) => (
        <ReactFullpage.Wrapper>
          {/* 1st section */}
          <div className="section">
            <DetailFirstSection />
          </div>

          {/* 2nd section */}
          <div className="section">
            <DetailSecondSection active={activeSection === 1} />
          </div>

          {/* 3rd section */}
          <div className="section">
            <DetailThreadSection active={activeSection === 2} />
          </div>
        </ReactFullpage.Wrapper>
      )}
    />
  );
};

export default DetailPage;
