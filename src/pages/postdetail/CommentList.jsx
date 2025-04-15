import React from 'react';
import styled from 'styled-components';

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((c, index) => (
        <Comment key={index}>
          <div className="info">
            <span className="username">{c.username}</span>
            <span className="date">{c.date}</span>
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

  .info {
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 6px;

    .username {
      font-weight: 600;
      color: #000;
      margin-right: 8px;
    }

    .date {
      font-weight: normal;
    }
  }

  .text {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #000;
  }
`;
