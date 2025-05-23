import styled from "styled-components";

const S: { [key: string]: any } = {};

S.MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  grid-template-columns: 1fr 250px;
  width: 1050px;
  margin: 0 auto;
  padding-top: 40px;
  justify-content: center;
  gap: 20px;
`;

S.ContentLeft = styled.div`
  width: 616px;
  min-height: 1020px;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 20px;
    font-weight: bold;
    color: #222;
    margin-bottom: 12px;
  }
`;

S.SidebarRight = styled.aside`
  position: sticky;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 15px;
  gap: 18px;
  width: 296px;
  height: 240px;
  top: 40px;
  background: white;
  border-radius: 10px;
  box-shadow:
    -5px 5px 10px rgba(230, 230, 230, 0.2),
    5px -5px 10px rgba(230, 230, 230, 0.2),
    -5px -5px 10px rgba(255, 255, 255, 0.9),
    5px 5px 13px rgba(230, 230, 230, 0.9),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3),
    inset -1px -1px 2px rgba(230, 230, 230, 0.5);
  text-align: center;
`;

S.UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e2e2e2;
  margin: 0 auto 12px;
`;

S.Nickname = styled.p`
  font-weight: bold;
  color: #000;
`;

S.ActionButton = styled.button`
  background-color: #6274f3;
  color: white;
  width: 125px;
  height: 40px;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 17px;
  margin: 0 4px;
  cursor: pointer;

  &:hover {
    background-color: #495bd3;
  }
`;

S.TotalCount = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #e53935;
  margin-bottom: 16px;
`;

S.PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.PostCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer; 

  span {
    color: #222; 
  }

  .post-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #333; 
    margin-bottom: 8px;
  }

  .author-icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ccc;
  }

  .divider {
    width: 1px;
    height: 12px;
    background-color: #bbb;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    color: #111; 
    margin-bottom: 4px;
  }

  .content {
    font-size: 14px;
    color: #222; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

S.button = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

S.Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  gap: 8px;

  button {
    background: none;
    border: none;
    font-size: 16px;
    color: #000; 
    cursor: pointer;
    width: 427px;
    height: 50px;

    &:hover {
      color: red;
    }
  }
`;

export default S;
