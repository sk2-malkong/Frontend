import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  color: #000;
`;

const ContentLeft = styled.div`
  flex: 1;

  h3 {
    font-size: 20px;
    font-weight: bold;
    color: #000; /* ✅ 제목: 내가 작성한 게시글 */
    margin-bottom: 12px;
  }
`;

const SidebarRight = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: #ddd;
  border-radius: 50%;
`;

const Nickname = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  color: #000;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-top: 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TotalCount = styled.div`
  font-size: 14px;
  color: #d00;
  font-weight: bold;
  margin-bottom: 20px;
`;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  color: #000;
  cursor: pointer;

  .post-header {
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: 8px;
    margin-bottom: 8px;
    color: #000;

    span {
      color: #000;
    }
  }

  .author-icon {
    width: 16px;
    height: 16px;
    background-color: #aaa;
    border-radius: 50%;
  }

  .divider {
    width: 1px;
    height: 14px;
    background-color: #ccc;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    margin: 8px 0;
    color: #000;
  }

  .content {
    font-size: 15px;
    color: #333;
  }

  &:hover {
    background-color: #fdfdfd;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 8px;

  button {
    padding: 6px 10px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    font-size: 16px;
    color: #000; /* ✅ 숫자/화살표 글자 검정색 */

    &:hover {
      background: #f5f5f5;
      color: red;
    }
  }
`;

export default {
  MainWrapper,
  ContentLeft,
  SidebarRight,
  UserAvatar,
  Nickname,
  ActionButton,
  TotalCount,
  PostListWrapper,
  PostCard,
  Pagination,
};
