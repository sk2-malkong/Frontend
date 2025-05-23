import styled from "styled-components";

// 스타일 컴포넌트 객체 타입 선언
const S = {
    // 전체 페이지 컨테이너
    DivWrapper: styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
  `,

    // 메인 컨테이너
    MainDiv: styled.div`
    background-color: #ffffff;
    position: relative;
    width: 100%;
    max-width: 1000px;
    min-height: 100vh;
    padding: 1.25rem 1rem;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      padding: 1rem 0.5rem;
    }
  `,

    // 링크 영역
    Link: styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 12px;
    width: 59px;
    
    @media (max-width: 768px) {
      right: 0.5rem;
    }
  `,

    // 상단 섹션 컨테이너 (프로필 + 뱃지)
    TopSection: styled.div`
    display: flex;
    flex-direction: row;
    justify-content:center;
     gap: 2rem;
    align-items: center;
    width: 100%;
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  `,

    // 프로필 프레임
    ProfileFrame: styled.div`
    align-items: flex-start;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow:
      5px 5px 13px #e6e6e6e6, -5px -5px 10px #ffffffe6, 5px -5px 10px #e6e6e633, -5px 5px 10px #e6e6e633, inset -1px -1px 2px #e6e6e680, inset 1px 1px 2px #ffffff4c;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    width: 58%;
    max-width: 500px;
    align-self: center;
    
    @media (max-width: 992px) {
      width: 55%;
    }
    
    @media (max-width: 768px) {
      width: 90%;
      padding: 0.75rem;
    }
  `,

    // 프로필 헤더
    ProfileHeader: styled.div`
    align-items: center;
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
    margin-bottom: 0.5rem;
    
    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  `,

    // 내 정보 래퍼
    MyInfoWrapper: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5rem;
    position: relative;
  `,

    // 내 정보 텍스트
    MyInfoText: styled.div`
    color: #000000;
    font-family: "Pretendard-SemiBold", Helvetica, sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.2;
    position: relative;
    white-space: nowrap;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  `,

    // 프로필 수정 버튼
    EditProfileButton: styled.div`
    align-items: center;
    background-color: #5784e1;
    border-radius: 16px;
    display: inline-flex;
    gap: 0.5rem;
    justify-content: center;
    padding: 0.375rem 0.625rem;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #4a75cf;
    }
  `,

    // 프로필 수정 텍스트
    EditProfileText: styled.div`
    color: #ffffff;
    font-family: "Pretendard-Bold", Helvetica, sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: -0.25px;
    line-height: normal;
    position: relative;
    text-align: center;
    white-space: nowrap;
  `,

    // 프레임 래퍼
    FrameWrapper: styled.div`
    align-items: center;
    display: flex;
    gap: 1rem;
    position: relative;
    width: 100%;
    
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }
  `,

    // 프로필 이미지 컨테이너
    ProfileImageContainer: styled.div`
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
    
    @media (max-width: 768px) {
      width: 70px;
      height: 70px;
    }
    
    @media (max-width: 576px) {
      width: 60px;
      height: 60px;
      margin-bottom: 0.5rem;
    }
  `,

    // 프레임9 - 사용자 정보 영역
    Frame9: styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    width: 100%;
    max-width: 250px;
    
    @media (max-width: 576px) {
      max-width: 100%;
      align-items: center;
      text-align: center;
    }
  `,

    // 사용자명 텍스트
    UsernameText: styled.div`
    align-self: stretch;
    color: #000000;
    font-family: "Pretendard-SemiBold", Helvetica, sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.2;
    position: relative;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  `,

    // 이메일 텍스트
    EmailText: styled.div`
    align-self: stretch;
    color: #a6a6a6;
    font-family: "Pretendard-SemiBold", Helvetica, sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.2;
    position: relative;
    word-break: break-word;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  `,

    // 뱃지 래퍼
    BadgeWrapper: styled.div`
    position: relative;
    width: 38%;
    max-width: 200px;
    aspect-ratio: 1/1;
    align-self: center;
    
    @media (max-width: 992px) {
      width: 40%;
      max-width: 180px;
    }
    
    @media (max-width: 768px) {
      width: 60%;
      max-width: 180px;
    }
    
    @media (max-width: 576px) {
      width: 70%;
      max-width: 160px;
    }
  `,

    // 뱃지 원형
    BadgeCircle: styled.div`
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow:
      5px 5px 13px #e6e6e6e6, -5px -5px 10px #ffffffe6, 5px -5px 10px #e6e6e633, -5px 5px 10px #e6e6e633, inset -1px -1px 2px #e6e6e680, inset 1px 1px 2px #ffffff4c;
    height: 100%;
    width: 100%;
    position: relative;
  `,

    // 뱃지 내용 영역
    BadgeContent: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
  `,

    // 뱃지 제목
    BadgeTitle: styled.div`
    color: #000000;
    font-family: "Pretendard-SemiBold", Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.375rem;
    
    @media (max-width: 992px) {
      font-size: 0.9rem;
    }
    
    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  `,

    // 뱃지 카운트
    BadgeCount: styled.div`
    color: #000000;
    font-family: "Pretendard-Bold", Helvetica, sans-serif;
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.25rem;
    
    @media (max-width: 992px) {
      font-size: 3rem;
    }
    
    @media (max-width: 576px) {
      font-size: 2.5rem;
    }
  `,

    // 뱃지 단위
    BadgeUnit: styled.div`
    color: #a6a6a6;
    font-family: "Pretendard-SemiBold", Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    display: inline-block;
    margin-left: 0.125rem;
    
    @media (max-width: 576px) {
      font-size: 0.875rem;
    }
  `,

    // 계정 프레임
    AccountFrame: styled.div`
    align-items: flex-start;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow:
      inset -1px -1px 2px #dddddd80, inset 1px 1px 2px #ffffff4c, 5px 5px 13px #dddddde6, -5px -5px 10px #ffffffe6, 5px -5px 10px #dddddd33, -5px 5px 10px #dddddd33;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 733px;
    padding: 1.25rem;
    margin: 0 auto;
    margin-bottom: 1.25rem;
    
    @media (max-width: 768px) {
      width: 90%;
      padding: 0.75rem;
    }
  `,

    // 계정 제목
    AccountTitle: styled.div`
    align-self: stretch;
    color: #000000;
    font-family: "Pretendard-SemiBold", Helvetica, sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.50px;
    line-height: normal;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
    }
  `,

    // 그룹 래퍼
    GroupWrapper: styled.div`
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    position: relative;
    width: 100%;
  `,

    // 그룹 컨테이너
    Group: styled.div`
    position: relative;
    width: 100%;
    max-width: 250px;
    padding-bottom: 2.5rem;
    
    @media (max-width: 768px) {
      max-width: 100%;
      padding-bottom: 2rem;
    }
  `,

    // 프레임2 - 게시글 메뉴
    Frame2: styled.div`
    align-items: center;
    display: flex;
    gap: 0.625rem;
    padding: 0.625rem;
    position: relative;
    width: max-content;
    cursor: pointer;
  `,

    // 텍스트 스타일 - 메뉴 항목
    TextWrapper2: styled.div`
    color: #000000;
    font-family: "Pretendard-Regular", Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: -0.25px;
    line-height: normal;
    position: relative;
    text-align: center;
    width: fit-content;
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  `,

    // 라인 구분선
    Line: styled.div`
    height: 2px;
    position: absolute;
    left: 0.75rem;
    top: 3rem;
    width: 18px;
    background-image: url('data:image/svg+xml;utf8,<svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H17" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>');
    background-repeat: no-repeat;
  `,

    // 프레임3 - 이용 제한 내역 메뉴
    Frame3: styled.div`
    align-items: center;
    display: inline-flex;
    gap: 0.625rem;
    justify-content: center;
    padding: 0.625rem;
    position: absolute;
    left: 0;
    top: 3.3rem;
    cursor: pointer;
  `,

    // 로그아웃 버튼 프레임
    LogoutFrame: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    padding: 0.625rem 0;
    
    @media (max-width: 768px) {
      margin-top: 0.5rem;
      max-width: 500px;
    }
  `,

    // 로그아웃 텍스트
    LogoutText: styled.div`
    color: #888888;
    font-family: "Pretendard-Bold", Helvetica, sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: -0.50px;
    line-height: normal;
    text-align: center;
    text-decoration: underline;
    white-space: nowrap;
    cursor: pointer;
    padding: 0.5rem 1rem;
    
    &:hover {
      color: #666666;
    }
  `
};

export default S;