import React from 'react';
import Input from './style';


// variant, shape, size, border, color, font,
const BasicInput = ({ref, ...rest}) => {
  return (
    <Input ref={ref} {...rest} />
  );
};

export default BasicInput;