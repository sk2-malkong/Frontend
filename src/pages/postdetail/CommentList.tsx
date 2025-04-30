import React, { useEffect, useState, ChangeEvent } from 'react';
import * as S from './style';
import defaultProfile from './profile.svg';
import { fetchComments, deleteComment, updateComment } from '../api/comment';

/**
 * CommentList
 * 
 * - 댓글 목록 조회 및 표시
 * - 댓글 삭제 및 수정 기능 지원
 */
interface Comment {
  commentId: number;
  username: string;
  date: string;
  content: string;
  profile: string | null;
}

interface CommentListProps {
  postId: number;
  currentUser: string | null;
  badWordCount: number;
  refreshTrigger: number;
}

const CommentList: React.FC<CommentListProps> = ({ postId, currentUser, badWordCount, refreshTrigger }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // 댓글 목록 불러오기 (postId 또는 refreshTrigger가 변할 때마다)
  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(postId);
        const mapped = data.map((c: any) => ({
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

    if (postId) loadComments();
  }, [postId, refreshTrigger]); // refreshTrigger 변경될 때 댓글 다시 fetch

  const handleDelete = async (commentId: number) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      await deleteComment(commentId);
      alert('댓글이 삭제되었습니다.');
      setComments((prev) => prev.filter((c) => c.commentId !== commentId));
    } catch (err) {
      console.error('❌ 댓글 삭제 실패:', err);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const startEditing = (comment: Comment) => {
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

    if (editingId === null) return;

    try {
      await updateComment(editingId, editingContent);
      setEditingId(null);
      setEditingContent('');
      // 수정 완료 후 바로 새로고침 없이 목록 상태만 업데이트
      setComments(prev =>
        prev.map(c => c.commentId === editingId ? { ...c, content: editingContent } : c)
      );
    } catch (err) {
      console.error('❌ 댓글 수정 실패:', err);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const isRestricted = badWordCount > 0 && badWordCount % 5 === 0;

  if (error) return <div>{error}</div>;

  return (
    <>
      {comments.map((c) => (
        <S.Comment key={c.commentId}>
          <div className="top">
            <img className="profile" src={c.profile || defaultProfile} alt="profile" />
            <div className="info">
              <span className="username">{c.username}</span>
              <span className="date">{c.date}</span>
            </div>

            {/* 본인 댓글일 경우 수정/삭제 버튼 제공 */}
            {currentUser === c.username && editingId !== c.commentId && (
              <S.CommentControlButtons>
                <span onClick={() => startEditing(c)}>수정</span>
                <span className="divider">|</span>
                <span onClick={() => handleDelete(c.commentId)}>삭제</span>
              </S.CommentControlButtons>
            )}
          </div>

          {/* 수정 모드 */}
          {editingId === c.commentId ? (
            <>
              <S.CommentEditTextarea
                value={editingContent}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditingContent(e.target.value)}
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
    </>
  );
};

export default CommentList;
