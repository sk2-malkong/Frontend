import React, { useState } from 'react';
import styled from 'styled-components';

// 인터페이스 정의
interface FormData {
    name: string;
    email: string;
    reason: string;
}

interface ApiResponse {
    api_key: string;
    jwt_secret: string;
}

interface ApiKeyPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

// API 키 생성 함수
const generateApiKey = async (userData: FormData): Promise<ApiResponse> => {
    try {
        // 백엔드에 POST 요청 보내기
        const response = await fetch('http://3.37.74.62:8001/issue-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: userData.name
            }),
        });

        if (!response.ok) {
            throw new Error('API 키 생성 요청에 실패했습니다.');
        }

        // 응답 데이터 반환
        return await response.json();
    } catch (error) {
        console.error('API 키 생성 오류:', error);
        throw error;
    }
};

// 스타일 컴포넌트 정의
const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const StyledWrapper = styled.div`
    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 400px;
        max-width: 90vw;
        background-color: #fff;
        padding: 25px;
        border-radius: 20px;
        position: relative;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .title {
        font-size: 28px;
        color: royalblue;
        font-weight: 600;
        letter-spacing: -1px;
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 30px;
        margin-top: 0;
        margin-bottom: 5px;
    }

    .title::before,
    .title::after {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        border-radius: 50%;
        left: 0px;
        background-color: royalblue;
    }

    .title::before {
        width: 18px;
        height: 18px;
        background-color: royalblue;
    }

    .title::after {
        width: 18px;
        height: 18px;
        animation: pulse 1s linear infinite;
    }

    .message {
        color: rgba(88, 87, 87, 0.822);
        font-size: 14px;
        margin-bottom: 10px;
    }

    .form label {
        position: relative;
        margin-bottom: 10px;
    }

    .form label .input {
        width: 100%;
        padding: 10px 10px 20px 10px;
        outline: 0;
        border: 1px solid rgba(105, 105, 105, 0.397);
        border-radius: 10px;
        font-size: 14px;
        color: #000000 !important; /* 더 높은 우선순위로 입력 텍스트 색상 적용 */
    }

    /* 제품 사용 사유 텍스트 스타일 */
    .reason-title {
        display: block;
        margin-bottom: 5px;
        font-size: 0.9em;
        color: #111111; /* 요청대로 색상 변경 */
        font-weight: 500;
    }

    /* 제품 사용 사유 텍스트 영역 스타일 */
    .reason {
        min-height: 100px;
        resize: vertical;
        width: 100%;
        border: 1px solid rgba(105, 105, 105, 0.397);
        border-radius: 10px;
        padding: 10px;
        outline: 0;
        font-size: 14px;
        color: #000000 !important;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    .form label .input + span {
        position: absolute;
        left: 10px;
        top: 15px;
        color: grey;
        font-size: 0.9em;
        cursor: text;
        transition: 0.3s ease;
    }

    .form label .input:placeholder-shown + span {
        top: 15px;
        font-size: 0.9em;
    }

    .form label .input:focus + span,
    .form label .input:not(:placeholder-shown) + span {
        top: 30px;
        font-size: 0.7em;
        font-weight: 600;
    }

    .form label .input:valid + span {
        color: green;
    }

    /* 이메일 필드가 blur 됐을 때는 초록색이 아닌 회색 유지 */
    .form label .input.email-blurred:not(:valid) + span {
        color: grey;
    }

    .submit {
        border: none;
        outline: none;
        background-color: royalblue;
        padding: 12px;
        border-radius: 10px;
        color: #fff;
        font-size: 16px;
        transition: 0.3s ease;
        cursor: pointer;
        margin-top: 5px;
    }

    .submit:hover {
        background-color: rgb(56, 90, 194);
    }

    .submit:disabled {
        background-color: #a0b4f0;
        cursor: not-allowed;
    }

    .close-button {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }

    .close-button:hover {
        color: #333;
    }

    .api-key-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
    }

    .api-key-label {
        font-weight: 600;
        margin: 0;
        color: #111111;
    }

    .api-key-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
    }

    .api-key-label {
        font-weight: 600;
        margin: 0;
        color: #111111 !important; /* 중요도 증가 */
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

    .api-key-label span {
        color: #111111 !important; /* 명시적으로 span 요소에 색상 지정 */
    }

    .copy-button {
        border: none;
        background-color: royalblue;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        height: 30px;
        flex-shrink: 0; /* 크기 고정 */
    }

    .copy-button:hover {
        background-color: rgb(56, 90, 194);
    }

    .api-key-box {
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 15px;
        font-family: monospace;
        overflow-x: auto; /* 가로 스크롤 추가 */
        white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
        margin-bottom: 15px;
    }

    .api-key-box code {
        color: #0066cc; /* API 키 글자 색상 - 파란색으로 변경 */
        font-weight: 500;
        overflow-x: visible; /* 코드 내용이 넘쳐도 숨기지 않음 */
    }

    .copy-button:hover {
        background-color: rgb(56, 90, 194);
    }

    .api-key-notice {
        color: #e74c3c;
        font-size: 14px;
        margin: 5px 0;
    }

    .new-key {
        background-color: #27ae60;
    }

    .new-key:hover {
        background-color: #219653;
    }

    @keyframes pulse {
        from {
            transform: scale(0.9);
            opacity: 1;
        }
        to {
            transform: scale(1.8);
            opacity: 0;
        }
    }
`;

// API 키 팝업 컴포넌트
const ApiKeyPopup: React.FC<ApiKeyPopupProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        reason: ''
    });
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.reason) {
            return;
        }

        setIsLoading(true);

        try {
            // API 키 생성 함수 호출
            const response = await generateApiKey(formData);
            setApiResponse(response);

            // 응답을 받으면 폼 필드를 숨기고 API 키 결과만 표시
            setFormData({
                name: '',
                email: '',
                reason: ''
            });
        } catch (error) {
            console.error('API 키 생성 오류:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('클립보드에 복사되었습니다.');
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            reason: ''
        });
        setApiResponse(null);
    };

    // 팝업창 닫기 함수 - 상태 초기화 추가
    const handleClose = () => {
        // 폼 데이터와 API 키 상태 초기화
        setFormData({
            name: '',
            email: '',
            reason: ''
        });
        setApiResponse(null);
        // 부모 컴포넌트의 onClose 함수 호출
        onClose();
    };

    if (!isOpen) return null;

    return (
        <PopupOverlay>
            <StyledWrapper>
                <form className="form" onSubmit={handleSubmit}>
                    <p className="title">API 키 발급</p>
                    <p className="message">서비스 이용을 위한 API 키를 발급받으세요.</p>

                    {!apiResponse ? (
                        <>
                            <label>
                                <input
                                    required
                                    placeholder=""
                                    type="text"
                                    name="name"
                                    className="input"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <span>이름</span>
                            </label>

                            <label>
                                <input
                                    required
                                    placeholder=""
                                    type="email"
                                    name="email"
                                    className="input"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <span>이메일</span>
                            </label>

                            <label>
                                <span style={{color: 'grey'}}>제품 사용 사유</span>
                                <textarea
                                    required
                                    placeholder=""
                                    name="reason"
                                    className="input reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                />
                            </label>

                            <button
                                className="submit"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? '처리 중...' : 'API 키 발급받기'}
                            </button>
                        </>
                    ) : (
                        <div className="api-key-container">
                            <div className="api-key-label">
                                <span style={{color: '#111111'}}>발급된 API 키</span>
                                <button
                                    type="button"
                                    className="copy-button"
                                    onClick={() => handleCopy(apiResponse.api_key)}
                                >
                                    복사
                                </button>
                            </div>
                            <div className="api-key-box">
                                <code>{apiResponse.api_key}</code>
                            </div>

                            <div className="api-key-label">
                                <span style={{color: '#111111'}}>JWT Secret</span>
                                <button
                                    type="button"
                                    className="copy-button"
                                    onClick={() => handleCopy(apiResponse.jwt_secret)}
                                >
                                    복사
                                </button>
                            </div>
                            <div className="api-key-box">
                                <code>{apiResponse.jwt_secret}</code>
                            </div>

                            <p className="api-key-notice">
                                * 이 키는 다시 표시되지 않습니다. 안전한 곳에 보관하세요.
                            </p>
                        </div>
                    )}

                    <button type="button" className="close-button" onClick={handleClose}>
                        &times;
                    </button>
                </form>
            </StyledWrapper>
        </PopupOverlay>
    );
};

export default ApiKeyPopup;