import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import profileImg from './profile.svg';
import auth from '../api/auth';
import { deletePost } from '../api/postdetail';
import { isUserRestricted } from '../../utils/penalty';

/**
 * PostDetail
 * 
 * - 게시글 상세 페이지 렌더링
 * - 게시글 정보 + 댓글 목록 + 댓글 입력창 표시
 */
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
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0); // 댓글 새로고침용 트리거

  const [isRestricted, setIsRestricted] = useState<boolean>(false);
  const [restrictionMessage, setRestrictionMessage] = useState<string | null>(null);

  // 현재 로그인된 사용자 정보 불러오기
  const refreshProfile = async () => {
    try {
      const profile = await auth.profile();

      if (profile.username) {
        localStorage.setItem("username", profile.username);
      }

      if (profile.endDate) {
        localStorage.setItem("penaltyEndDate", profile.endDate);
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
    } catch (error) {
      console.error('프로필 조회 실패:', (error as Error).message);
    }
  };

  useEffect(() => {
    refreshProfile();

    // 60초마다 제한 상태 자동 갱신
    const interval = setInterval(() => {
      refreshProfile();
    }, 60000);

    return () => clearInterval(interval);
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

          {/* 게시글 본문 + 댓글 목록 */}
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

                {/* 글 작성자만 수정/삭제 버튼 표시 */}
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

            {/* 댓글 목록 */}
            <CommentList
              postId={post.id}
              currentUser={currentUser?.username || null}
              badWordCount={currentUser?.badWordCount || 0}
              refreshTrigger={refreshTrigger}
            />
          </S.ContentWrapper>

          {/* 댓글 작성 제한 문구 */}
          {isRestricted && restrictionMessage && (
            <S.RestrictionNotice>{restrictionMessage}</S.RestrictionNotice>
          )}

          {/* 댓글 입력창 */}
          <CommentInput
            onSubmit={() => {
              handleRefreshComments();
              refreshProfile();
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