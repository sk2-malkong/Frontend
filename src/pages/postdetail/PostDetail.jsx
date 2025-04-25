import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style'; 
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import profileImg from './profile.svg';
import auth from '../api/auth';
import { deletePost } from '../api/postdetail';

/**
 * 게시글 상세 페이지 컴포넌트
 *
 * 기능 요약:
 * - 게시글 상세 내용 렌더링
 * - 본인 글일 경우 '수정/삭제' 버튼 노출
 * - 댓글 목록 렌더링
 * - 댓글 작성 및 수정 가능
 */
const PostDetail = ({ post }) => {
  const navigate = useNavigate();

  // 댓글 새로고침을 위한 상태 트리거
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // 현재 로그인한 사용자 정보
  const [currentUser, setCurrentUser] = useState(null);
  
  // 현재 수정 중인 댓글 정보
  const [editingComment, setEditingComment] = useState(null); // 수정 모드 상태

  // 사용자 프로필 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await auth.profile();
        setCurrentUser(profile);
      } catch (error) {
        console.error('프로필 조회 실패:', error.message);
      }
    };
    fetchProfile();
  }, []);

  // 게시글 작성자와 현재 사용자 비교
  const isAuthor = currentUser?.username === post.author;
  const isRestricted = currentUser?.badWordCount > 0 && currentUser?.badWordCount % 5 === 0;


  // 댓글 작성 완료 시 리스트 새로고침 트리거
  const handleAddComment = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // 게시글 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  // 게시글 삭제 요청 처리
  const handleDelete = async () => {
    const confirmed = window.confirm('글을 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await deletePost(post.id); 
      alert('게시글이 삭제되었습니다.');
      navigate('/main');
    } catch (error) {
      console.error('❌ 게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  return (
    <S.Container>
      <S.InnerWrapper>
        <S.SectionTitle>자유게시판</S.SectionTitle>
        <S.Card>
          <S.Header>
            <S.AuthorInfo>
              <S.Profile src={profileImg} alt="profile" />
              <div>
                <S.Nickname>{post.author}</S.Nickname>
                <S.DateText>{post.date}</S.DateText>
              </div>
            </S.AuthorInfo>

            {isAuthor && (
              <S.ControlButtons>
                <span onClick={handleEdit}>수정</span>
                <span className="divider">|</span>
                <span onClick={handleDelete}>삭제</span>
              </S.ControlButtons>
            )}
          </S.Header>

          <S.Title>{post.title}</S.Title>
          <S.Content>{post.content}</S.Content>
          <S.Meta>👁 {post.views}</S.Meta>

          <S.Divider />

          <CommentList
            postId={post.id}
            refreshTrigger={refreshTrigger}
            currentUser={currentUser?.username}
            isRestricted={isRestricted}
            onEditComment={setEditingComment}
          />

          {isRestricted && (
            <S.RestrictionNotice>욕설 5회 사용으로 댓글 작성이 제한됩니다.</S.RestrictionNotice>
          )}

          <CommentInput
            onSubmit={handleAddComment}
            disabled={currentUser?.badWordCount >= 5}
            postId={post.id}
            editingComment={editingComment}
            clearEdit={() => setEditingComment(null)}
          />
        </S.Card>
      </S.InnerWrapper>
    </S.Container>
  );
};

export default PostDetail;
