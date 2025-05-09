import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import profileImg from './profile.svg';
import auth from '../api/auth';
import { deletePost } from '../api/postdetail';
import { isUserRestricted } from '../../utils/penalty'; // ✅ 경로 수정

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

/**
 * 🧠 localStorage 기반으로 작성 제한 여부 판단
 */
const getIsRestricted = (): boolean => {
  const endDateStr = localStorage.getItem('penaltyEndDate');
  const now = new Date();

  console.log('🔍 penaltyEndDate:', endDateStr);

  return endDateStr !== null && new Date(endDateStr) > now;
};

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ username: string; badWordCount: number } | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0); // 댓글 새로고침용 트리거

  const isRestricted = getIsRestricted(); // ✅ 진입 시 판단

  // 현재 로그인된 사용자 정보 불러오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await auth.profile();

        // ✅ 닉네임 갱신
        if (profile.username) {
          localStorage.setItem("username", profile.username);
        }

        // ✅ 최신 endDate 정보 갱신
        if (profile.endDate !== undefined && profile.endDate !== null) {
          localStorage.setItem('penaltyEndDate', profile.endDate);
        }

        setCurrentUser({
          username: profile.username,
          badWordCount: 0, // ✅ penaltyCount는 제거됨 → 기본값 사용
        });
      } catch (error) {
        console.error('프로필 조회 실패:', (error as Error).message);
      }
    };
    fetchProfile();
  }, []);

  const isAuthor = currentUser?.username === post.author;

  /**
   * 글 수정 버튼 클릭
   * - 제한 조건 만족 시: 팝업 띄우고 차단
   * - 아니면 수정 페이지로 이동
   */
  const handleEdit = () => {
    if (getIsRestricted()) {
      alert('❌ 욕설 5회 사용으로 글 수정이 제한됩니다.');
      return;
    }

    navigate(`/edit/${post.id}`);
  };

  const handleDeletePost = async () => {
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

            <CommentList
              postId={post.id}
              currentUser={currentUser?.username || null}
              badWordCount={currentUser?.badWordCount || 0}
              refreshTrigger={refreshTrigger}
            />
          </S.ContentWrapper>

          {/* ✅ 댓글 작성 제한 문구 */}
          {isRestricted && (
            <S.RestrictionNotice>
              욕설 5회 사용하여 기능이 제한됩니다.
            </S.RestrictionNotice>
          )}

          {/* 댓글 입력창 */}
          <CommentInput
            onSubmit={handleRefreshComments}
            postId={post.id}
          />

        </S.Card>
      </S.InnerWrapper>
    </S.Container>
  );
};

export default PostDetail;
