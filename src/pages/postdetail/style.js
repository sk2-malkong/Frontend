import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 16px;
  background-color: #f9f9f9;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 640px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  color: #000; /* 전체 텍스트 색상 지정 */
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const Profile = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
`;

export const Nickname = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #000;
`;

export const DateText = styled.div`
  font-size: 0.75rem;
  color: #999;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 16px 0 8px 0;
  color: #000;
`;

export const Content = styled.p`
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 24px;
  color: #000;
`;

export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #000;
  margin-bottom: 12px;

  span {
    cursor: pointer;
    margin-left: 8px;
    &:first-child {
      margin-left: 0;
    }
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 24px 0;
`;

/* ✅ 댓글 컴포넌트 스타일도 여기 포함시킬 수 있어 */
export const Comment = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #000; /* 댓글 전체 글자색 */

  .info {
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 4px;
  }

  .username {
    font-weight: bold;
    color: #000;
  }

  .text {
    font-size: 0.95rem;
    color: #000;
  }
`;
