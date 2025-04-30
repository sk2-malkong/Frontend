import React, { useEffect, useState } from 'react';
import S from './CheckboxStyle';

interface CheckboxProps {
  setButtonColor: (isActive: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ setButtonColor }) => {
  const [checkList, setCheckList] = useState<string[]>([]);

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
        ? setCheckList(["term1", "term2", "term3", "term4"])
        : setCheckList([]);
  };

  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
        ? setCheckList([...checkList, e.target.name])
        : setCheckList(checkList.filter((choice) => choice !== e.target.name));
  };

  useEffect(() => {
    const allChecked = checkList.includes("term1") &&
        checkList.includes("term2") &&
        checkList.includes("term3")
    setButtonColor(allChecked);
  }, [checkList, setButtonColor]);

  return (
      <S.AgreeWapper>
        <S.AgreeBox>
          <S.Checkbox>
            <input
                type="checkbox"
                id="checkAll"
                name="all"
                onChange={checkAll}
                checked={checkList.length === 4}
            />
            <label htmlFor="checkAll"></label>
          </S.Checkbox>
          <span className="AllAgree">필수 및 선택 항목을 모두 포함하여 동의합니다.</span>
        </S.AgreeBox>

        <S.AgreeBox>
          <S.Checkbox>
            <input
                type="checkbox"
                id="check1"
                name="term1"
                onChange={check}
                checked={checkList.includes("term1")}
            />
            <label htmlFor="check1"></label>
          </S.Checkbox>
          <span>만 14세 이상입니다.</span>
        </S.AgreeBox>

        <S.AgreeBox>
          <S.Checkbox>
            <input
                type="checkbox"
                id="check2"
                name="term2"
                onChange={check}
                checked={checkList.includes("term2")}
            />
            <label htmlFor="check2"></label>
          </S.Checkbox>
          <span>[필수] 서비스 약관 동의</span>
        </S.AgreeBox>

        <S.AgreeBox>
          <S.Checkbox>
            <input
                type="checkbox"
                id="check3"
                name="term3"
                onChange={check}
                checked={checkList.includes("term3")}
            />
            <label htmlFor="check3"></label>
          </S.Checkbox>
          <span>[필수] 개인정보 수집 및 이용 동의</span>
        </S.AgreeBox>

        <S.AgreeBox>
          <S.Checkbox>
            <input
                type="checkbox"
                id="check4"
                name="term4"
                onChange={check}
                checked={checkList.includes("term4")}
            />
            <label htmlFor="check4"></label>
          </S.Checkbox>
          <span>[선택] 개인정보 수집 및 이용 동의</span>
        </S.AgreeBox>
      </S.AgreeWapper>
  );
};

export default Checkbox;