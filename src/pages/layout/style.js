import styled from 'styled-components'

const S = {}



S.Background = styled.div`

width: 100%;
min-height: 100%;
position: absolute;
background-color: white;
`
S.header = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  min-width: 1050px;
  height: 65px;
  left: 435px;
  right: 435px;
  top: 10px;

`


S.topbar=styled.div`
position: absolute;
width: 100%;
height: 40px;
left: 0px;
top: 75px;
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
  }
`;

S.SearchBox = styled.div`
  display: flex;
  width: 367px;
  height: 48px;
  border: 2px solid #5784E1;
  background-color: #5784E1;
  overflow: hidden;
  margin-left: 77px;
  p{
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center; 
  align-items: center;   
  font-size: 14px;        
  background-color: #5784E1;  
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
export default S




