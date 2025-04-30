import React from 'react';
import S from './CheckboxStyle';

interface CheckProps {
    // You can add any props you need here
}

const Check: React.FC<CheckProps> = () => {
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