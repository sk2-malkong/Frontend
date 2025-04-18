import React from 'react';
import { Comment } from './style';
import defaultProfile from './profile.svg';

/**
 * 댓글 리스트 컴포넌트
 * - 전달받은 comments 배열을 순회하며 각 댓글을 렌더링
 * - 각 댓글에는 프로필 이미지, 작성자 이름, 작성 시간, 댓글 내용이 포함됨
 */
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

          {/* 댓글 내용 */}
          <div className="text">{c.text}</div>
        </Comment>
      ))}
    </div>
  );
};

export default CommentList;
