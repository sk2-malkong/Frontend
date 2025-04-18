import styled from 'styled-components';
import AlertIcon from './danger.svg';
import SubmitIcon from './Inputbutton.svg';

// 공통 폰트 설정
const baseFont = `
  font-family: 'Pretendard', sans-serif;
`;

//
// ✅ 페이지 전체 구조
//

// 전체 컨테이너 (페이지 전체를 감싸는 wrapper)
export const Container = styled.div`
  ${baseFont}
  display: flex;
  justify-content: center;
  padding: 2.5rem 1rem;
  background-color: #ffffff;
`;

// 내부 콘텐츠 래퍼 (카드 중앙 정렬용)
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

// 글 전체 카드 박스
export const Card = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 0.625rem;
  padding: 1.875rem 1.5rem 0 1.875rem;
  box-sizing: border-box;
  ${baseFont}

  @media (max-width: 768px) {
    padding: 1rem 1rem 0 1rem;
  }
`;

// '자유게시판' 제목 영역
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

//
// ✅ 글 헤더 (작성자, 날짜, 버튼)
//

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

//
// ✅ 본문 영역
//

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #000;
  margin: 1rem 0 0.5rem 0;
  ${baseFont}
`;

export const Content = styled.p`
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  margin-bottom: 1.5rem;
  ${baseFont}
`;

//
// ✅ 조회수 및 버튼
//

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

// 수정 / 삭제 버튼 영역
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

// 구분선 (댓글 영역과 본문 사이)
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 1.5rem 0 0 0;
`;

//
// ✅ 댓글 목록 스타일
//

export const Comment = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #000;
  font-family: 'Pretendard', sans-serif;

  .top {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
  }

  .profile {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  .info {
    display: flex;
    font-size: 0.8rem;
    flex-direction: column;
    color: #888;

    .username {
      font-weight: 600;
      color: #000;
      margin-right: 8px;
    }

    .date {
      color: #aaa;
    }
  }

  .text {
    font-size: 0.95rem;
    color: #000;
    line-height: 1.4;
    margin-left: 42px;
  }
`;

//
// ✅ 댓글 입력창 영역
//

export const CommentInputWrapper = styled.div`
  width: calc(100% + 3.375rem);
  margin-left: -1.875rem;
  margin-right: -1.5rem;
  background-color: #F0F0F0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
  border-top: 1px solid #f0f0f0;
  height: 2.5rem;
  overflow: hidden;

  @media (max-width: 768px) {
    width: calc(100% + 2rem);
    margin: 0 -1rem;
    padding: 0; 
    height: 2.5rem;
  }
`;

// 인풋 필드
export const CommentInput = styled.input`
  flex: 1;
  padding: 0 0.75rem;
  font-size: 0.9375rem;
  background-color: #F0F0F0;
  border: none;
  color: #000;
  outline: none;
  height: 100%;

  &::placeholder {
    color: #797979;
  }

  &:disabled {
    color: #a0a0a0;
    cursor: not-allowed;
  }
`;

// 등록 버튼 (아이콘 버튼)
export const IconButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #ffffff;
  background-image: url(${SubmitIcon});
  background-repeat: no-repeat;
  background-position: center;
  border-bottom-right-radius: 0.625rem;
  background-size: 1.2rem 1.2rem;
  border: none;
  cursor: pointer;
  margin-left: auto;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

//
// ✅ 욕설 제한 안내 문구
//

export const RestrictionNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #F91F15;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 0.25rem;

  &::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    background-image: url(${AlertIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
