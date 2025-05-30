import React, { useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import DetailFirstSection from './DetailFirstSection';
import DetailSecondSection from './DetailSecondSection';
import DetailThreadSection from './DetailThreadSection';
import Header from "../_component/Header/Header";
import ApiKeyPopup from "../_component/ApiKeyPopup";
import IntroContainer from '../_component/IntroContainer';

const anchors: string[] = ['first', 'second', 'thread'];

const DetailPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(0);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

  return (
      <>
          <Header openPopup={openPopup}/>
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
                          <IntroContainer active={activeSection === 3} />
                      </div>
                      

                      {/* 2nd section */}
                      <div className="section">
                          <DetailSecondSection active={activeSection === 1} />
                      </div>

                      {/* 3rd section */}
                      <div className="section">
                          <DetailThreadSection active={activeSection === 2} />
                      </div>
                      <div className="section">
                          <DetailFirstSection />
                      </div>
                  </ReactFullpage.Wrapper>
              )}
          />
          <ApiKeyPopup isOpen={isPopupOpen} onClose={closePopup} />
      </>

  );
};

export default DetailPage;
