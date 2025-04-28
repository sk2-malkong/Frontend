import React from 'react';
import S from './CheckboxStyle';

const Check = () => {
  return (
    <S.Checkbox>
      <input
        type="checkbox"
        id="check"
      />
      <label htmlFor="check"></label>
    </S.Checkbox>
  );
};

export default Check;