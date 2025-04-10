import styled from 'styled-components';

const S = {};

S.Background = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: white;
`;

S.HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1050px;
  min-width: 900px;
  margin: auto;
  height: 65px;
  position: relative;
`;

S.Topbar = styled.div`
  width: 100%;
  height: 40px;
  background: #5784e1;
  position: relative; 
  z-index: 1000;
`;

S.LogoWrap = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
  }

  p {
    font-size: 50px;
    font-weight: bold;
    color: black;
    margin-left: 12px;
  }
`;

S.SearchBox = styled.div`
  display: flex;
  width: 367px;
  height: 48px;
  margin: auto;
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
  z-index: 10;
  margin: 0 auto;
  padding-bottom: 50px;
  height: 100%;
  min-height: 1080px;
  overflow: hidden;
  min-width: 1050px;
  background-color: white;

  & .slider {
  }
`;

export default S;
