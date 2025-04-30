import styled from "styled-components";

interface StyledComponents {
    LoginPageWrapper?: any;
    LoginBox?: any;
    Input?: any;
    LoginButton?: any;
    [key: string]: any;
}

const S: StyledComponents = {}

S.LoginPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`;

S.LoginBox = styled.div`
    width: 560px;
    min-height: 100px;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    padding: 48px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    h2{
        font-size: 30px;
        font-weight: bold;
        color: black;
    }

    h3{
        color: black;

        strong{
            color: red;
        }
    }
`;

S.Input = styled.input`
    min-width: 480px;
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 16px;
    color: black;
`;

S.LoginButton = styled.button`
    width: 160px;
    padding: 14px;
    background-color: #797979;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 25px;
    margin: 12px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #5784E1;
    }
`;

export default S;