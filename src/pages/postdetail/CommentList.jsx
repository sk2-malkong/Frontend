import React, { useEffect, useState } from 'react';
import axios from 'axios';
import S from './style';
import defaultProfile from './profile.svg';

/**
 * 댓글 리스트 컴포넌트
 * - 댓글 조회
 * - 인라인 댓글 수정 기능
 * - 본인 댓글일 경우 수정/삭제 버튼 제공
 */
const CommentList = ({ postId, refreshTrigger, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  // 현재 수정 중인 댓글 ID
  const [editingId, setEditingId] = useState(null);        
  // 수정 중인 댓글 내용
  const [editingContent, setEditingContent] = useState(''); 

  /**
   * 댓글 목록 조회
   * - postId 또는 refreshTrigger가 바뀔 때마다 호출됨
   */
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/comment/${postId}`);
        const mapped = res.data.map((c) => ({
          commentId: c.commentId,
          username: c.username,
          date: new Date(c.createdAt).toLocaleString('ko-KR'),
          content: c.content,
          profile: null, // 프로필 이미지가 있다면 교체 가능
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

  /**
   * 댓글 삭제
   * - 본인 댓글만 삭제 가능 (상위 조건에서 버튼 제한)
   */
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

  // 수정 모드 진입
  const startEditing = (comment) => {
    // 이용 제한 조건
    if (isRestricted) {
      alert('욕설 5회 이상 사용으로 댓글 수정이 제한됩니다.');
      return;
    }
    setEditingId(comment.commentId);
    setEditingContent(comment.content);
    if (onEditComment) onEditComment(comment);
  };

  // 수정 모드 취소
  const cancelEditing = () => {
    setEditingId(null);
    setEditingContent('');
  };

  
  // 댓글 수정 완료
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

      // 수정된 내용으로 로컬 상태 업데이트
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
        <S.Comment key={c.commentId}>
          <div className="top">
            <img className="profile" src={c.profile || defaultProfile} alt="profile" />
            <div className="info">
              <span className="username">{c.username}</span>
              <span className="date">{c.date}</span>
            </div>

            {/* 본인 댓글만 수정/삭제 버튼 노출 */}
            {currentUser === c.username && editingId !== c.commentId && (
              <S.CommentControlButtons>
                <span onClick={() => startEditing(c)}>수정</span>
                <span className="divider">|</span>
                <span onClick={() => handleDelete(c.commentId)}>삭제</span>
              </S.CommentControlButtons>
            )}
          </div>

          {/* 인라인 수정창 또는 일반 댓글 보기 */}
          {editingId === c.commentId ? (
            <>
              <S.CommentEditTextarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <S.EditButtonGroup>
                <button onClick={saveEditing}>수정 완료</button>
                <button onClick={cancelEditing}>취소</button>
              </S.EditButtonGroup>
            </>
          ) : (
            <div className="text">{c.content}</div>
          )}
        </S.Comment>
      ))}
    </div>
  );
};

export default CommentList;
