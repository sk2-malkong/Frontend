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

// 개선된 클립보드 복사 함수
const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        // 최신 Clipboard API 시도
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        // 폴백 방법: document.execCommand 사용
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
            return true;
        }

        // 마지막 폴백: 선택 영역 생성
        const range = document.createRange();
        const selection = window.getSelection();
        const mark = document.createElement('span');
        mark.textContent = text;
        const markStyle = mark.style as any;
        markStyle.all = 'unset';
        markStyle.position = 'fixed';
        markStyle.top = '0';
        markStyle.clip = 'rect(0, 0, 0, 0)';
        markStyle.whiteSpace = 'pre';
        markStyle.webkitUserSelect = 'text';
        markStyle.MozUserSelect = 'text';
        markStyle.msUserSelect = 'text';
        markStyle.userSelect = 'text';

        document.body.appendChild(mark);
        range.selectNodeContents(mark);
        selection?.removeAllRanges();
        selection?.addRange(range);

        const success = document.execCommand('copy');
        document.body.removeChild(mark);

        return success;
    } catch (error) {
        console.error('클립보드 복사 실패:', error);
        return false;
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
        color: #000000 !important;
    }

    .reason-title {
        display: block;
        margin-bottom: 5px;
        font-size: 0.9em;
        color: #111111;
        font-weight: 500;
    }

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
        color: #111111 !important;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

    .api-key-label span {
        color: #111111 !important;
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
        flex-shrink: 0;
        transition: all 0.2s ease;
    }

    .copy-button:hover {
        background-color: rgb(56, 90, 194);
    }

    .copy-button.copied {
        background-color: #27ae60;
    }

    .copy-button.copied:hover {
        background-color: #219653;
    }

    .api-key-box {
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 15px;
        font-family: monospace;
        overflow-x: auto;
        white-space: nowrap;
        margin-bottom: 15px;
        position: relative;
    }

    .api-key-box code {
        color: #0066cc;
        font-weight: 500;
        overflow-x: visible;
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

    .copy-message {
        color: #27ae60;
        font-size: 12px;
        margin-top: 5px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .copy-message.show {
        opacity: 1;
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
    const [copyStates, setCopyStates] = useState<{[key: string]: boolean}>({});

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
            const response = await generateApiKey(formData);
            setApiResponse(response);

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

    const handleCopy = async (text: string, key: string) => {
        try {
            const success = await copyToClipboard(text);

            if (success) {
                // 복사 성공 피드백
                setCopyStates(prev => ({ ...prev, [key]: true }));

                // 2초 후 원래 상태로 복원
                setTimeout(() => {
                    setCopyStates(prev => ({ ...prev, [key]: false }));
                }, 2000);
            } else {
                alert('복사에 실패했습니다. 수동으로 선택하여 복사해주세요.');
            }
        } catch (error) {
            console.error('복사 오류:', error);
            alert('복사에 실패했습니다. 수동으로 선택하여 복사해주세요.');
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            reason: ''
        });
        setApiResponse(null);
        setCopyStates({});
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            reason: ''
        });
        setApiResponse(null);
        setCopyStates({});
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
                                    className={`copy-button ${copyStates.apiKey ? 'copied' : ''}`}
                                    onClick={() => handleCopy(apiResponse.api_key, 'apiKey')}
                                >
                                    {copyStates.apiKey ? '복사됨!' : '복사'}
                                </button>
                            </div>
                            <div className="api-key-box">
                                <code>{apiResponse.api_key}</code>
                            </div>

                            <div className="api-key-label">
                                <span style={{color: '#111111'}}>JWT Secret</span>
                                <button
                                    type="button"
                                    className={`copy-button ${copyStates.jwtSecret ? 'copied' : ''}`}
                                    onClick={() => handleCopy(apiResponse.jwt_secret, 'jwtSecret')}
                                >
                                    {copyStates.jwtSecret ? '복사됨!' : '복사'}
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