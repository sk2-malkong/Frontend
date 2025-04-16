import React from 'react';
import styled from 'styled-components';

// 이미지 import
import defaultProfile from './profile.svg';

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((c, index) => (
        <Comment key={index}>
          <div className="top">
            <img
              className="profile"
              src={c.profile || defaultProfile}
              alt="profile"
            />
            <div className="info">
              <span className="username">{c.username}</span>
              <span className="date">{c.date}</span>
            </div>
          </div>
          <div className="text">{c.text}</div>
        </Comment>
      ))}
    </div>
  );
};

export default CommentList;

const Comment = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #000;

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
