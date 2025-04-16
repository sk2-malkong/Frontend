import styled from "styled-components";

const S = {};

// 전체 페이지 랩퍼
S.PageWrapper = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: 100vh;
`;

// 프레임 랩퍼 (전체 컨테이너)
S.FrameWrapper = styled.div`
    background-color: #ffffff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

// 프로필 수정 카드 메인 컨테이너
S.ProfileCard = styled.div`
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

// 헤더 영역 ('프로필 수정' 텍스트가 있는 상단 영역)
S.HeaderArea = styled.div`
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

// 헤더 텍스트 ('프로필 수정')
S.HeaderText = styled.div`
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

// 아이콘 래퍼 (프로필 수정 아이콘을 위한 컨테이너)
S.IconWrapper = styled.div`
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

// 닉네임 입력 필드
S.NicknameField = styled.div`
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

// 입력 가이드 텍스트 ('2-10자 이내')
S.GuideText = styled.div`
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

// 닉네임 입력 박스
S.InputBox = styled.input`
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

// 수정 완료 버튼
S.SubmitButton = styled.div`
    align-items: center;
    background-color: #5784e1;
    border-radius: 1.625rem;
    display: flex;
    gap: 0.875rem;
    height: 3rem;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.625rem 0.875rem;
    position: absolute;
    top: 17.375rem;
    width: calc(100% - 2.5rem);
    max-width: 25rem;
`;

// 버튼 텍스트 ('수정 완료')
S.ButtonText = styled.div`
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

// 프로필 이미지 영역
S.ProfileImageArea = styled.div`
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

// 카메라 아이콘 래퍼 (프로필 사진 변경 아이콘)
S.CameraIconWrapper = styled.div`
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

// 회원 탈퇴 영역
S.WithdrawalArea = styled.div`
    align-items: center;
    display: inline-flex;
    gap: 0.875rem;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.625rem 0.875rem;
    position: absolute;
    top: 24.4375rem;
`;

// 회원 탈퇴 텍스트
S.WithdrawalText = styled.div`
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

export { S };