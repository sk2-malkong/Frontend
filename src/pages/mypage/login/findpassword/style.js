import styled from "styled-components";

const S = {};

S.JoinPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 120px;
  background-color: white;
  

  p{
    font-size: 10px;
    color: black;
  }


  .mainLogo{
    width: 100%;
    justify-content: center;
    img{
      width: 145px;
      height: 100px;
    }
  }
`;

S.JoinBox = styled.div`
  width: 560px;
  min-height: 100px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: auto;

  h2{
    font-size: 30px;
    font-weight: bold;
    color: black;
  }

  .idWrapper{
    margin-bottom: 20px;
  }
  .usernameWrapper{
    margin-bottom: 15px;
  }
  .passwordConfirmWrapper{
    margin-bottom: 20px;
  }
  .emailWrapper{
    margin-bottom: 20px;
  }
`;

S.Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  color: black;
`;

S.Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #5784E1;
  }
`;

S.Notice = styled.p`
  font-size: 12px;
  color: #555;
`;

S.CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #5784E1;
  gap: 6px;
`;
S.JoinContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    width: 145px;
    height: 110px;
  }
`;


export default S;