import styled from 'styled-components';

// 타입 정의를 위한 인터페이스
interface BackgroundProps {
    // 필요한 props가 있다면 여기에 정의
}

interface TopbarProps {
    // 필요한 props가 있다면 여기에 정의
}

interface HeaderWrapProps {
    // 필요한 props가 있다면 여기에 정의
}

interface LogoWrapProps {
    // 필요한 props가 있다면 여기에 정의
}

interface SearchBoxProps {
    // 필요한 props가 있다면 여기에 정의
}

interface SearchInputProps {
    // 필요한 props가 있다면 여기에 정의
}

interface UserProps {
    // 필요한 props가 있다면 여기에 정의
}

interface MainProps {
    // 필요한 props가 있다면 여기에 정의
}

interface LoginButtonProps {
    // 필요한 props가 있다면 여기에 정의
}

// 각 스타일드 컴포넌트 선언
const Background = styled.div<BackgroundProps>`
    width: 100%;
    min-height: 100%;
    position: relative;
    background-color: white;
    overflow-x: hidden;
`;

const Topbar = styled.div<TopbarProps>`
    width: 100%;
    height: 40px;
    background: #5784e1;
    position: relative;
    z-index: 1000;
`;

const HeaderWrap = styled.header<HeaderWrapProps>`
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

const LogoWrap = styled.div<LogoWrapProps>`
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

const SearchBox = styled.div<SearchBoxProps>`
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

const SearchInput = styled.input<SearchInputProps>`
    flex: 1;
    color: black;
    border: none;
    padding: 0 12px;
    font-size: 14px;
    outline: none;
`;

const User = styled.div<UserProps>`
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

const Main = styled.main<MainProps>`
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: hidden;

    @media (max-width: 1050px) {
        padding: 0 1rem 3.125rem;
    }
`;

const LoginButton = styled.button<LoginButtonProps>`
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

// 모든 스타일드 컴포넌트를 객체로 내보내기
const S = {
    Background,
    Topbar,
    HeaderWrap,
    LogoWrap,
    SearchBox,
    SearchInput,
    User,
    Main,
    LoginButton
};

export default S;