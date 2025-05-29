import React from 'react';
import styled from "styled-components";

// 스타일드 컴포넌트 정의
const PageWrapper = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: 100vh;
`;

const FrameWrapper = styled.div`
    background-color: #ffffff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

const ProfileCard = styled.div`
    background-color: #ffffff;
    border-radius: 1.25rem;
    box-shadow: 0.3125rem 0.3125rem 0.8125rem #e6e6e6e6, -0.3125rem -0.3125rem 0.625rem #ffffffe6,
    0.3125rem -0.3125rem 0.625rem #e6e6e633, -0.3125rem 0.3125rem 0.625rem #e6e6e633,
    inset -0.0625rem -0.0625rem 0.125rem #e6e6e680, inset 0.0625rem 0.0625rem 0.125rem #ffffff4c;
    height: 28.125rem;
    width: 27.5rem;
    max-width: 100%;
    position: relative;
    overflow: hidden;
    margin: 3.25rem auto;
`;

const HeaderArea = styled.div`
    align-items: center;
    display: flex;
    gap: 0.625rem;
    justify-content: center;
    left: 0;
    padding: 0.625rem;
    position: absolute;
    top: 1.25rem;
    width: 100%;
`;

const HeaderText = styled.div`
    color: #000000;
    font-family: "Pretendard-SemiBold", Helvetica;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 1.25rem;
    margin-top: -0.0625rem;
    position: relative;
    white-space: nowrap;
    width: fit-content;
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 4.375rem;
    left: 0;
    width: 100%;

    img {
        width: 5rem;
        height: 5rem;
    }
`;

const NicknameField = styled.div`
    align-items: center;
    background-color: #f8f8f8;
    border-radius: 3.125rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    height: auto;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.875rem 1.25rem;
    position: absolute;
    top: 13.125rem;
    width: calc(100% - 2.5rem);
    max-width: 25rem;
`;

const GuideText = styled.div`
    color: #aaaaaa;
    font-family: "Pretendard-Medium", Helvetica;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.25rem;
    margin-top: -0.0625rem;
    position: relative;
    white-space: nowrap;
    width: fit-content;
    align-self: flex-start;
`;

const InputBox = styled.input`
    width: 100%;
    border: none;
    background-color: transparent;
    font-family: "Pretendard-Medium", Helvetica;
    font-size: 1rem;
    color: #000000;
    outline: none;

    &::placeholder {
        color: #aaaaaa;
    }
`;

interface SubmitButtonProps {
    disabled?: boolean;
}

const SubmitButton = styled.div<SubmitButtonProps>`
    align-items: center;
    background-color: #5784e1;
    border-radius: 1.625rem;
    display: flex;
    gap: 5rem; // 0.875rem
    height: 3rem;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.625rem 0.875rem;
    position: absolute;
    top: 17.375rem;
    width: calc(100% - 2.5rem);
    max-width: 25rem;
    cursor: pointer;
    transition: opacity 0.3s ease;
    opacity: ${props => props.disabled ? 0.7 : 1};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;

const ButtonText = styled.div`
    color: #ffffff;
    font-family: "Pretendard-Bold", Helvetica;
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.03125rem;
    line-height: normal;
    position: relative;
    text-align: center;
    white-space: nowrap;
    width: fit-content;
`;

const ProfileImageArea = styled.div`
    height: 7.5rem;
    width: 7.5rem;
    position: absolute;
    top: 4.375rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.8;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const CameraIconWrapper = styled.div`
    background-color: #ffffff;
    border: 0.03125rem solid;
    border-color: #dddddd;
    border-radius: 0.8125rem;
    height: 1.625rem;
    right: -0.8125rem;
    position: absolute;
    bottom: -0.8125rem;
    width: 1.625rem;

    .camera-icon {
        height: 1.4375rem;
        left: 0.0625rem;
        position: absolute;
        top: 0.0625rem;
        width: 1.4375rem;
    }
`;

const WithdrawalArea = styled.div`
    align-items: center;
    display: inline-flex;
    gap: 0.875rem;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.625rem 0.875rem;
    position: absolute;
    top: 24.4375rem;
    cursor: pointer;
`;

const WithdrawalText = styled.div`
    color: #888888;
    font-family: "Pretendard-Bold", Helvetica;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: -0.03125rem;
    line-height: normal;
    margin-top: -0.0625rem;
    position: relative;
    text-align: center;
    text-decoration: underline;
    white-space: nowrap;
    width: fit-content;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

interface ImageUploadStatusProps {
    isError: boolean;
}

const ImageUploadStatus = styled.div<ImageUploadStatusProps>`
    font-size: 0.8rem;
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
    color: ${props => props.isError ? '#ff4444' : '#1A1A1A'};
`;

const ErrorMessage = styled.div`
    color: #ff4444;
    font-size: 0.8rem;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 16.2rem;
    left: 50%;
    transform: translateX(-50%);
    max-width: calc(100% - 3rem);
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background-color: white;
    border-radius: 1rem;
    padding: 2rem;
    max-width: 90%;
    width: 20rem;
    text-align: center;
    color: #1A1A1A;
`;

const ModalTitle = styled.h3`
    margin-top: 0;
    color: #1A1A1A;
`;

const ModalContent = styled.p`
    color: #1A1A1A;
`;

const ModalButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
`;

const ModalCancelButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #f2f2f2;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    color: #000000;
`;

const ModalConfirmButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
`;

const PasswordInput = styled.input`
    width: 100%;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    outline: none;
    box-sizing: border-box;
    font-family: "Pretendard-Regular", Helvetica;
    color: #000000;

    &::placeholder {
        color: #bbbbbb;
    }
`;

// 스타일드 컴포넌트들을 객체로 내보내기
const S = {
    PageWrapper,
    FrameWrapper,
    ProfileCard,
    HeaderArea,
    HeaderText,
    IconWrapper,
    NicknameField,
    GuideText,
    InputBox,
    SubmitButton,
    ButtonText,
    ProfileImageArea,
    CameraIconWrapper,
    WithdrawalArea,
    WithdrawalText,
    LoadingContainer,
    ImageUploadStatus,
    ErrorMessage,
    ModalOverlay,
    ModalContainer,
    ModalTitle,
    ModalContent,
    ModalButtonContainer,
    ModalCancelButton,
    ModalConfirmButton,
    PasswordInput,
};

export default S;