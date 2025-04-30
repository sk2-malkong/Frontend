import styled from 'styled-components';
import AlertIcon from './danger.svg';
import SubmitIcon from './Inputbutton.svg';

// ============================
// 🧱 기본 설정
// ============================

const baseFont = `
  font-family: 'Pretendard', sans-serif;
`;

// ============================
// 🧱 페이지 전체 레이아웃
// ============================

export const Container = styled.div`
  ${baseFont}
  display: flex;
  justify-content: center;
  padding: 2.5rem 1rem;
  background-color: #ffffff;
`;

export const InnerWrapper = styled.div`
  width: 100%;
  max-width: 45.625rem;
  margin: 0 auto;
  ${baseFont}

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

export const SectionTitle = styled.h2`
  ${baseFont}
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.4375rem;
  text-align: left;

  @media (max-width: 768px) {
    margin-bottom: 0.3125rem;
  }
`;

// ============================
// 🧱 게시글 카드 레이아웃
// ============================

export const Card = styled.div`
  ${baseFont}
  width: 100%;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 0.625rem;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  padding: 2rem 2rem 0 2rem;

  @media (max-width: 768px) {
    padding: 1.75rem 1.5rem 0 1.5rem;
  }
`;

// ============================
// 🧱 게시글 헤더 (작성자 정보)
// ============================

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
  ${baseFont}
  font-size: 1rem;
  font-weight: 500;
  color: #000;
`;

export const DateText = styled.div`
  ${baseFont}
  font-size: 0.75rem;
  font-weight: 500;
  color: #A6A6A6;
`;

// ============================
// 🧱 게시글 본문
// ============================

export const Title = styled.h1`
  ${baseFont}
  font-size: 1.75rem;
  font-weight: 600;
  color: #000;
  margin: 1rem 0 0.5rem 0;
`;

export const Content = styled.p`
  ${baseFont}
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  margin-bottom: 1.5rem;
`;

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
  }

  div {
    display: flex;
    align-items: center;
    color: #000;
  }
`;

export const ControlButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
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
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 1.5rem 0 0 0;
`;

// ============================
// 🧱 댓글 리스트
// ============================

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
    flex-direction: column;
    font-size: 0.8rem;
    color: #888;

    .username {
      font-weight: 600;
      color: #000;
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

export const CommentControlButtons = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-left: auto;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #A6A6A6;
  cursor: pointer;

  span {
    color: #A6A6A6;
    padding: 0 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CommentEditTextarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  font-size: 0.95rem;
  padding: 8px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  resize: vertical;
  font-family: 'Pretendard', sans-serif;
  color: #000 !important;
  background-color: #fff !important;

  &:focus {
    outline: none;
    border-color: #999;
  }
`;

export const EditButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 4px;

  button {
    font-size: 0.8125rem;
    padding: 6px 12px;
    border: none;
    border-radius: 0.375rem;
    background: #eeeeee;
    color: #333;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #cccccc;
    }
  }
`;

// ============================
// 🧱 댓글 입력창
// ============================

export const CommentInputWrapper = styled.div`
  width: 100%;
  background-color: #F0F0F0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-top: 1px solid #f0f0f0;
  height: 2.5rem;
  overflow: hidden;
`;

export const CommentInput = styled.textarea`
  flex: 1;
  padding: 0 0.75rem;
  font-size: 0.9375rem;
  background-color: #F0F0F0;
  border: none;
  color: #000;
  outline: none;
  height: 100%;
  resize: none;

  display: flex;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &::placeholder {
    color: #797979;
  }

  &:disabled {
    color: #a0a0a0;
    cursor: not-allowed;
  }
`;

export const IconButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #ffffff;
  background-image: url(${SubmitIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1.2rem 1.2rem;
  border: none;
  border-bottom-right-radius: 0.625rem;
  cursor: pointer;
  margin-left: auto;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ============================
// 🧱 욕설 제한 안내 메시지
// ============================

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