import styled from "styled-components"

const S = {};

  S.Checkbox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    & input[type="checkbox"] {
      appearance: none; 
      -webkit-appearance: none; 
      width: 20px;
      height: 20px;
      border: 2px solid gray;
      border-radius: 50%;
      background-color: transparent;
      cursor: pointer;
      transition: background-color 0.3s, border-color 0.3s;
      position: relative;
    }

  
    & input[type="checkbox"]:checked {
      background-color: #5784E1;
      border-color: #5784E1;
    } 


    & input[type="checkbox"]:checked::before {
      content: ''; 
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 4px;
      border: solid white;
      border-width: 0 0 2px 2px;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  `

  S.AgreeWapper = styled.ul`
    /* margin: 0 40px; */
  `

  S.AgreeBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    & .AllAgree {
      font-size: 16px;
      font-weight: 700;
    }

    & span {
      font-size: 15px;
      font-weight: 400;
      margin-left: 5px;
      color: black;
    }
  `

  S.CheckImg = styled.img`
    margin-right: 10px;
  `

export default S;