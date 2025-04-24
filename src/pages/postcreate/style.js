import styled from "styled-components";

const S = {};

// 공통 폰트 설정
const baseFont = `
  font-family: 'Pretendard', sans-serif;
`;

//
// 레이아웃 구조
//

// 페이지 전체 Wrapper (바깥 영역)
S.Wrapper = styled.div`
  ${baseFont}
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2.5rem 1rem;
  background-color: #fff;
`;

// 콘텐츠 최대 너비 제한
S.Container = styled.div`
  width: 100%;
  max-width: 45.625rem; /* 730px */
  margin: 0 auto;
  ${baseFont}

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

//
// 프로필 영역
//

S.Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

S.ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

S.UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

S.Nickname = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: #000;
  ${baseFont}
`;

S.DateText = styled.span`
  font-size: 1rem;
  color: #aaa;
  ${baseFont}
`;

//
// 글쓰기 박스 (제목 + 본문 입력 영역)
//

S.ContentBox = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  height: 460px;
  overflow-y: auto;
  margin-bottom: 1.875rem;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

S.ContentBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.875rem 1.5rem 1.875rem 1.875rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// 제목 입력창
S.TitleInput = styled.input`
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 0.25rem;
  outline: none;
  color: #000;
  ${baseFont}

  &::placeholder {
    color: #aaa;
  }
`;

// 본문 입력창 (textarea)
S.TextArea = styled.textarea`
  flex: 1;
  width: 100%;
  border: none;
  padding: 0.5rem 0.25rem;
  resize: none;
  outline: none;
  font-size: 1rem;
  font-weight: 100;
  line-height: 1.75;
  color: #000;
  ${baseFont}

  &::placeholder {
    color: #bbb;
  }
`;

//
// 버튼 영역
//

S.ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 이전 화면으로 버튼
S.BackButton = styled.button`
  width: 140px;
  height: 50px;
  background-color: #797979;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #5e5e5e;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// 작성 완료 버튼
S.SubmitButton = styled.button`
  width: 140px;
  height: 50px;
  background-color: ${(props) => (props.active ? "#5784E1" : "#797979")};
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};

  &:hover {
    background-color: ${(props) => (props.active ? "#447acc" : "#5e5e5e")};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// 이용 제한 경고 문구
S.RestrictionMessageBox = styled.div`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #FFF0F0;
  color: #F91F15;
  border: 1px solid #f8cfcf;
  border-radius: 0.625rem;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
`;

export default S;