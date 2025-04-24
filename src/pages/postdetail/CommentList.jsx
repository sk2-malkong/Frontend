import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Comment,
  CommentControlButtons,
  CommentEditTextarea,
  EditButtonGroup,
} from './style';
import defaultProfile from './profile.svg';

/**
 * 댓글 리스트 컴포넌트 (인라인 수정 기능 포함)
 */
const CommentList = ({ postId, refreshTrigger, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/comment/${postId}`);
        const mapped = res.data.map((c) => ({
          commentId: c.commentId,
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

  const handleDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:8080/api/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('댓글이 삭제되었습니다.');
      setComments((prev) => prev.filter((c) => c.commentId !== commentId));
    } catch (err) {
      console.error('❌ 댓글 삭제 실패:', err);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const startEditing = (comment) => {
    setEditingId(comment.commentId);
    setEditingContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingContent('');
  };

  const saveEditing = async () => {
    if (!editingContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:8080/api/comment/${editingId}`,
        { content: editingContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComments((prev) =>
        prev.map((c) =>
          c.commentId === editingId ? { ...c, content: editingContent } : c
        )
      );

      cancelEditing();
    } catch (err) {
      console.error('❌ 댓글 수정 실패:', err);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      {comments.map((c) => (
        <Comment key={c.commentId}>
          <div className="top">
            <img className="profile" src={c.profile || defaultProfile} alt="profile" />
            <div className="info">
              <span className="username">{c.username}</span>
              <span className="date">{c.date}</span>
            </div>

            {currentUser === c.username && editingId !== c.commentId && (
              <CommentControlButtons>
                <span onClick={() => startEditing(c)}>수정</span>
                <span className="divider">|</span>
                <span onClick={() => handleDelete(c.commentId)}>삭제</span>
              </CommentControlButtons>
            )}
          </div>

          {editingId === c.commentId ? (
            <>
              <CommentEditTextarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <EditButtonGroup>
                <button onClick={saveEditing}>수정 완료</button>
                <button onClick={cancelEditing}>취소</button>
              </EditButtonGroup>
            </>
          ) : (
            <div className="text">{c.content}</div>
          )}
        </Comment>
      ))}
    </div>
  );
};

export default CommentList;
