import styled from "styled-components";

export const ScaledContainer = styled.div`
  transform: scale(0.8);  /* 원하는 배율 (예: 0.8이면 80% 크기로 축소) */
  transform-origin: top center;  /* 상단 중앙 기준으로 축소 */
`;

// 전체 글꼴을 Pretendard로 설정 (필요 시 index.css 또는 전역 스타일에서도 설정)
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  font-family: "Pretendard", sans-serif;
`;

// 프로필 영역
export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 780px;
`;

// 프로필 이미지
export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

// 사용자 정보를 담는 영역
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

// 닉네임
export const Nickname = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #000;
`;

// 날짜/시간
export const DateText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #aaa;
`;

// 글 작성 박스
export const ContentBox = styled.div`
  width: 780px;
  height: 463px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// 박스 내부 제목+글 입력 영역
export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  flex: 1;
`;

// 제목 입력
export const TitleInput = styled.input`
  font-size: 24px;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #ddd;
  padding: 8px 4px;
  outline: none;
  color: #000;
  &::placeholder {
    color: #aaa;
  }
`;

// 글 내용 입력
export const ContentInput = styled.textarea`
  width: 100%;
  border: none;
  padding: 8px 4px;
  resize: none;
  flex: 1;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  color: #000;
  &::placeholder {
    color: #bbb;
  }
`;

// 버튼 영역
export const ButtonContainer = styled.div`
  width: 780px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

// '이전 화면으로' 버튼
export const BackButton = styled.button`
  width: 180px;
  height: 55px;
  background-color: #797979;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  &:hover {
    background-color: #5e5e5e;
  }
`;

// '작성 완료' 버튼
export const SubmitButton = styled.button`
  width: 180px;
  height: 55px;
  background-color: ${(props) => (props.active ? "#5784E1" : "#ccc")};
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
  font-family: "Pretendard", sans-serif;
  &:hover {
    background-color: ${(props) => (props.active ? "#447acc" : "#ccc")};
  }
`;
