import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Comment } from './style';
import defaultProfile from './profile.svg';

const CommentList = ({ postId, refreshTrigger }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/comment/${postId}`);

        console.log('✅ 댓글 API 응답:', res.data); 

        const mapped = res.data.map((c) => ({
          username: c.username,
          date: new Date(c.createdAt).toLocaleString('ko-KR'),
          content: c.content,
          profile: null,
        }));
        setComments(mapped);
      } catch (err) {
        console.error('❌ 댓글 조회 실패:', err);
        setError('댓글을 불러오는 데 실패했습니다.');
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId, refreshTrigger]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      {comments.map((c, index) => (
        <Comment key={index}>
          <div className="top">
            <img className="profile" src={c.profile || defaultProfile} alt="profile" />
            <div className="info">
              <span className="username">{c.username}</span>
              <span className="date">{c.date}</span>
            </div>
          </div>
          <div className="text">{c.content}</div>
        </Comment>
      ))}
    </div>
  );
};

export default CommentList;
