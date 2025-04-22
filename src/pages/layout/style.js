import styled from 'styled-components';

const S = {};

S.Background = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: white;
  overflow-x: hidden; 
`;

S.Topbar = styled.div`
  width: 100%;
  height: 40px;
  background: #5784e1;
  position: relative;
  z-index: 1000;
`;

S.HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1050px;
  margin: auto;
  height: 65px;
  padding: 0 1rem;

  /* @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    gap: 0.5rem;
  } */
`;

S.LogoWrap = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;

  img {
    width: 80px;
    height: 80px;
  }

  p {
    font-size: 50px;
    font-weight: bold;
    color: black;
    margin-left: 12px;

    @media (max-width: 480px) {
      /* font-size: 32px; */
    }
  }
`;

S.SearchBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 367px;
  height: 48px;
  border: 2px solid #5784e1;
  background-color: #5784e1;
  overflow: hidden;
  justify-content: center;

  p {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    background-color: #5784e1;
    color: white;
  }
`;

S.SearchInput = styled.input`
  flex: 1;
  color: black;
  border: none;
  padding: 0 12px;
  font-size: 14px;
  outline: none;
`;

S.User = styled.div`
  width: 48px;
  height: 48px;
  background-color: #d9d9d9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 32px;
    height: 32px;
    color: red;
  }
`;

S.Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;

  @media (max-width: 1050px) {
    padding: 0 1rem 3.125rem;
  }
`;

S.LoginButton = styled.button`
  background-color: #5784E1;
  width: 138px;
  height: 40px;
  color: white;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: bold;
  border: 2px solid white;
  cursor: pointer;

  &:hover {
    background-color: #447acc;
  }
`;

export default S;
