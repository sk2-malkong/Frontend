import styled from 'styled-components'

const S = {}



S.Background = styled.div`

width: 100%;
min-height: 100%;
position: absolute;
background-color: white;
`
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


S.topbar=styled.div`
position: absolute;
width: 100%;
height: 40px;
left: 0px;
top: 65px;
background: #5784E1;
`

S.LogoWrap = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 90px;
    height: 90px;
  }

  p {
    font-size: 50px;
    font-weight: bold;
    color: black;
    margin-left: 12px;
  }
`;

S.SearchBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
  width: 64px;
  height: 64px;
  background-color: #D9D9D9;
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
export default S




