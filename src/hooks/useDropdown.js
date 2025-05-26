import { useEffect, useState } from 'react';

const useDropdown = (ref, intialState) => {
  const [ isOpen, setIsOpen ] = useState(intialState);

  useEffect(() => {
  const onClickPageEvent = (e) => {
    //ref.current : 참조된 DOM 객체 true
    //e.target : 클릭한 요소 (내부:true, 외부:false)
    //contains 메서드 : e.target이 dropdown 내부에 포함되어 있는 지 확인
    if(ref.current && !ref.current.contains(e.target)){
      setIsOpen(false); //외부 클릭 시 닫음
    }
  }

    //dropdown이 열려있을때만 클릭이벤트 추가
    if (isOpen){
      window.addEventListener("click", onClickPageEvent);
    }

    //해당 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("click", onClickPageEvent);
    }

  }, [isOpen, ref])
  

  return [ isOpen, setIsOpen ]
};

export default useDropdown;