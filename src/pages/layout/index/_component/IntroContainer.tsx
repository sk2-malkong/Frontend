import React from 'react';
import Intro from './Intro';




interface IntroContainerProps {
  active: boolean;
}

const IntroContainer: React.FC<IntroContainerProps> = ({ active }) => {
  return (
    <div>
      <Intro active={active} />
    </div>
  );
};

export default IntroContainer;