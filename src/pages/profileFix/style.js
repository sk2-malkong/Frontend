import styled from "styled-components";

const S = {};

/**
 * 전체 페이지 랩퍼
 * 프로필 수정 페이지의 최상위 컨테이너로, 전체 화면을 차지하며 내부 요소들을 중앙 정렬합니다.
 */
S.PageWrapper = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: 100vh;
`;

/**
 * 프레임 랩퍼 (전체 컨테이너)
 * 실제 콘텐츠를 담는 중간 레벨 컨테이너로, 패딩 공간을 제공합니다.
 */
S.FrameWrapper = styled.div`
    background-color: #ffffff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

/**
 * 프로필 수정 카드 메인 컨테이너
 * 실제 프로필 수정 UI 요소들을 포함하는 카드 형태의 컴포넌트입니다.
 * 네오모피즘 디자인 스타일을 적용한 그림자 효과가 특징입니다.
 */
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

/**
 * 헤더 영역
 * '프로필 수정' 텍스트가 포함된 상단 제목 영역입니다.
 */
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

/**
 * 헤더 텍스트
 * '프로필 수정' 제목 텍스트의 스타일을 정의합니다.
 */
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

/**
 * 아이콘 래퍼
 * 프로필 수정 아이콘을 위한 컨테이너입니다.
 * 참고: 현재 컴포넌트에서 사용되지 않고 있습니다.
 */
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

/**
 * 닉네임 입력 필드
 * 사용자 닉네임을 입력받는 둥근 입력 필드 컨테이너입니다.
 */
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

/**
 * 입력 가이드 텍스트
 * 닉네임 입력 필드 위에 표시되는 '2-10자 이내' 안내 텍스트입니다.
 * 참고: 현재 컴포넌트에서 사용되지 않고 있습니다.
 */
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

/**
 * 닉네임 입력 박스
 * 실제 텍스트를 입력받는 input 요소입니다.
 */
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

/**
 * 수정 완료 버튼
 * 프로필 수정 내용을 저장하는 파란색 버튼입니다.
 */
S.SubmitButton = styled.div`
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

    &:disabled, &[disabled] {
        opacity: 0.7;
        pointer-events: none;
    }
`;

/**
 * 버튼 텍스트
 * '수정 완료' 버튼 내부 텍스트의 스타일을 정의합니다.
 */
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

/**
 * 프로필 이미지 영역
 * 사용자 프로필 이미지를 표시하고 클릭 시 이미지 업로드가 가능한 원형 영역입니다.
 * 호버 시 시각적 피드백을 제공합니다.
 */
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

/**
 * 카메라 아이콘 래퍼
 * 프로필 이미지 우측 하단에 표시되는 카메라 아이콘을 위한 컨테이너입니다.
 * 참고: 현재 컴포넌트에서 사용되지 않고 있으나, 이미지 수정 기능을 시각적으로
 * 명확히 하기 위해 구현하는 것이 권장됩니다.
 */
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

/**
 * 회원 탈퇴 영역
 * 화면 하단에 위치한 회원 탈퇴 링크를 위한 컨테이너입니다.
 */
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
    cursor: pointer;
`;

/**
 * 회원 탈퇴 텍스트
 * '회원 탈퇴' 링크 텍스트의 스타일을 정의합니다.
 * 회색 색상과 밑줄로 표시되어 있습니다.
 */
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

/**
 * 로딩 영역
 * 이미지 또는 데이터를 로딩 중일 때 표시되는 컨테이너입니다.
 */
S.LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

/**
 * 이미지 업로드 상태 메시지
 * 이미지 업로드 진행 상태를 표시하는 텍스트 컴포넌트입니다.
 */
S.ImageUploadStatus = styled.div`
    font-size: 0.8rem;
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
    color: ${props => props.isError ? '#ff4444' : '#1A1A1A'};
`;

/**
 * 오류 메시지
 * 닉네임 입력 필드 아래에 표시되는 오류 메시지입니다.
 */
S.ErrorMessage = styled.div`
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

/**
 * 모달 오버레이
 * 회원 탈퇴 확인과 같은 모달 대화상자의 배경 오버레이입니다.
 */
S.ModalOverlay = styled.div`
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

/**
 * 모달 컨테이너
 * 모달 대화상자의 내용을 포함하는 컨테이너입니다.
 */
S.ModalContainer = styled.div`
    background-color: white;
    border-radius: 1rem;
    padding: 2rem;
    max-width: 90%;
    width: 20rem;
    text-align: center;
    color: #1A1A1A;
`;

/**
 * 모달 제목
 * 모달 대화상자의 제목 텍스트입니다.
 */
S.ModalTitle = styled.h3`
    margin-top: 0;
    color: #1A1A1A;
`;

/**
 * 모달 내용
 * 모달 대화상자의 본문 텍스트입니다.
 */
S.ModalContent = styled.p`
    color: #1A1A1A;
`;

/**
 * 모달 버튼 컨테이너
 * 모달 하단의 버튼들을 담는 컨테이너입니다.
 */
S.ModalButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
`;

/**
 * 모달 취소 버튼
 * 모달 대화상자의 취소 버튼입니다.
 */
S.ModalCancelButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #f2f2f2;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
`;

/**
 * 모달 확인 버튼
 * 모달 대화상자의 확인 버튼입니다.
 * 회원 탈퇴와 같은 중요한 동작에 사용되는 경우 경고 색상으로 표시됩니다.
 */
S.ModalConfirmButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
`;

export { S };