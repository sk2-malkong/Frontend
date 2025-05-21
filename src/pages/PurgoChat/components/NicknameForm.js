import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNickname } from "../context/NicknameContext";
import styled from 'styled-components';

const NicknameForm = () => {
    const [input, setInput] = useState("");
    const { setNickname } = useNickname();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmed = input.trim();
        if (!trimmed) {
            alert("닉네임을 입력하세요.");
            return;
        }

        localStorage.setItem("nickname", trimmed); // ✅ 로컬 스토리지 저장
        setNickname(trimmed);
        navigate("/chat");
    };

    return (
        <StyledWrapper>
            <div className="form-container">
                <p className="title" style={{color : "black"}}>닉네임 입력</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="nickname"
                            id="nickname"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="닉네임을 입력하세요"
                        />
                    </div>
                    <button className="sign" type="submit">입장</button>
                </form>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .form-container {
        width: 320px;
        border-radius: 0.75rem;
        background-color: rgb(255, 255, 255);
        padding: 2rem;
        color: #111111;
        margin: auto;
    }

    .title {
        text-align: center;
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
    }

    .form {
        margin-top: 1.5rem;
    }

    .input-group {
        margin-top: 0.25rem;
        font-size: 1rem;
        line-height: 1.25rem;
    }

    .input-group label {
        display: block;
        color: #999999;
        margin-bottom: 4px;
    }

    .input-group input {
        width: 100%;
        border-radius: 1rem;
        border: 1px solid rgba(55, 65, 81, 1);
        outline: 0;
        background-color: rgb(255, 255, 255); // rgba(17, 24, 39, 1);
        padding: 0.75rem 1rem;
        color: #111111;
    }

    .input-group input:focus {
        border-color: rgba(167, 139, 250);
    }

    .sign {
        display: block;
        width: 100%;
        background-color: #8DD8FF;
        padding: 0.75rem;
        text-align: center;
        color: rgb(234, 234, 234); //rgba(17, 24, 39, 1);
        border: none;
        border-radius: 0.375rem;
        font-weight: 600;
        margin-top: 1.5rem;
        cursor: pointer;
    }

    .sign:hover {
        background-color: #4E71FF;
    }
`;

export default NicknameForm;
// asdfasdf;