import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import axios from 'axios';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import profileImg from './profile.svg';
import auth from '../api/auth';
import { deletePost } from '../api/postdetail';
import { isUserRestricted } from '../../utils/penalty';

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  views: number;
}

interface PostDetailProps {
  post: Post;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ username: string; badWordCount: number } | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const [isRestricted, setIsRestricted] = useState<boolean>(false);
  const [restrictionMessage, setRestrictionMessage] = useState<string | null>(null);

  const refreshProfile = async () => {
    try {
      const profile = await auth.profile();

      if (profile.username) {
        localStorage.setItem('username', profile.username);
      }
      if (profile.endDate) {
        localStorage.setItem('penaltyEndDate', profile.endDate);
      }

      const restricted = isUserRestricted(profile.isActive, profile.endDate ?? undefined);
      setIsRestricted(restricted);

      if (restricted && profile.endDate) {
        setRestrictionMessage(
          ` 욕설 사용으로 인해 ${new Date(profile.endDate).toLocaleString()}까지 댓글 작성이 제한됩니다.`
        );
      } else {
        setRestrictionMessage(null);
      }

      setCurrentUser({
        username: profile.username,
        badWordCount: 0,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
        // 비회원이므로 상태 초기화만 하고 로그는 남기지 않음
        setCurrentUser(null);
        setIsRestricted(false);
        setRestrictionMessage(null);  
        } else {
          console.error('프로필 조회 실패:', error);
        }
      } else { 
        console.error('❌ 알 수 없는 에러:', error);
      }
    }
  };

  useEffect(() => {
    refreshProfile(); // 최초 1회만
  }, []);

  const isAuthor = currentUser?.username === post.author;

  const handleEdit = () => {
    if (isRestricted) {
      alert('❌ 욕설 5회 사용으로 글 수정이 제한됩니다.');
      return;
    }
    navigate(`/post/edit/${post.id}`);
  };

  const handleDeletePost = async () => {
    const confirmed = window.confirm('글을 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await deletePost(post.id);
      alert('게시글이 삭제되었습니다.');
      navigate('/post/main');
    } catch (error) {
      console.error('❌ 게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleRefreshComments = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <S.Container>
      <S.InnerWrapper>
        <S.SectionTitle>자유게시판</S.SectionTitle>
        <S.Card>
          <S.ContentWrapper>
            <S.Header>
              <S.HeaderInner>
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
                    <span onClick={handleDeletePost}>삭제</span>
                  </S.ControlButtons>
                )}
              </S.HeaderInner>
            </S.Header>

            <S.Title>{post.title}</S.Title>
            <S.Content>{post.content}</S.Content>
            <S.Meta>👁 {post.views}</S.Meta>

            <S.Divider />

            <CommentList
              postId={post.id}
              currentUser={currentUser?.username || null}
              badWordCount={currentUser?.badWordCount || 0}
              refreshTrigger={refreshTrigger}
            />
          </S.ContentWrapper>

          {isRestricted && restrictionMessage && (
            <S.RestrictionNotice>{restrictionMessage}</S.RestrictionNotice>
          )}

          <CommentInput
            onSubmit={() => {
              handleRefreshComments();
              refreshProfile(); // 댓글 작성 후 상태 갱신용
            }}
            postId={post.id}
            isRestricted={isRestricted}
          />
        </S.Card>
      </S.InnerWrapper>
    </S.Container>
  );
};

export default PostDetail;