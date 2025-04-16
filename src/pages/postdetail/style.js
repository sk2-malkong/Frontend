import styled from 'styled-components';

const baseFont = `
  font-family: 'Pretendard', sans-serif;
`;

// 컨테이너 전체
export const Container = styled.div`
  ${baseFont}
  display: flex;
  justify-content: center;
  padding: 2.5rem 1rem;
  background-color: #ffffff;
`;

// 콘텐츠 내부 래퍼 (글 전체 박스)
export const InnerWrapper = styled.div`
  width: 100%;
  max-width: 45.625rem; /* 730px */
  margin: 0 auto;
  ${baseFont}

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

// 카드 박스 (내용)
export const Card = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 0.625rem;
  padding: 1.875rem 1.5rem 0 1.875rem; /* 댓글입력창은 패딩 없이 아래 붙게 하기 위해 아래 패딩 제거 */
  box-sizing: border-box;
  ${baseFont}

  @media (max-width: 768px) {
    padding: 1rem 1rem 0 1rem;
  }
`;

// 자유게시판 제목
export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.4375rem;
  text-align: left;
  ${baseFont}

  @media (max-width: 768px) {
    margin-bottom: 0.3125rem;
  }
`;

// 작성자+날짜
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Profile = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.75rem;
  object-fit: cover;
`;

export const Nickname = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  ${baseFont}
`;

export const DateText = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: #A6A6A6;
  ${baseFont}
`;

// 글 제목
export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #000;
  margin: 1rem 0 0.5rem 0;
  ${baseFont}
`;

// 글 내용
export const Content = styled.p`
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  margin-bottom: 1.5rem;
  ${baseFont}
`;

// 조회수 등 메타 정보
export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #797979;
  margin-bottom: 0.75rem;

  span {
    cursor: pointer;
    color: #000;
    margin-left: 0.5rem;

    &:first-child {
      margin-left: 0;
    }
  }

  div {
    display: flex;
    align-items: center;
    color: #000;
  }
`;

// 수정 / 삭제 버튼
export const ControlButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #A6A6A6;
  cursor: pointer;

  span {
    color: #A6A6A6;

    &:hover {
      text-decoration: underline;
    }
  }

  .divider {
    color: #A6A6A6;
    margin: 0 0.25rem;
  }
`;

// 구분선
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 1.5rem 0 0 0;
`;

// 댓글 박스 하나
export const Comment = styled.div`
  position: relative;
  width: 100%;
  min-height: 4.453125rem;
  padding: 0.75rem 0;
  ${baseFont}

  &:not(:first-child) {
    margin-top: 0.5rem;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #f0f0f0;
  }

  .info {
    font-size: 0.5rem;
    font-weight: 500;
    color: #888;
    margin-bottom: 0.25rem;

    @media (max-width: 768px) {
      margin-top: 0.375rem;
    }
  }

  .username {
    font-size: 0.75rem;
    font-weight: 400;
  }

  .text {
    font-size: 0.9375rem;
    font-weight: 300;
  }
`;

// 댓글 입력창 (댓글처럼 보이게, 여백 없이 카드 아래에 붙음)
export const CommentInputBox = styled.div`
  width: 100%;
  padding: 0.75rem 1.875rem;
  background-color: #dedede;
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${baseFont}

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #f0f0f0;
  }
`;

// 댓글 입력창 인풋
export const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  font-weight: 400;
  background-color: #dedede;
  border: none;
  outline: none;
  color: #000;
  ${baseFont}

  &::placeholder {
    color: #797979;
  }
`;

// 등록 버튼
export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2f80ed;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  ${baseFont}

  &:hover {
    background-color: #1f6fe0;
  }
`;
