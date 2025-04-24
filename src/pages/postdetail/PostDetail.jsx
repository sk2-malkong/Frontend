import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  InnerWrapper,
  SectionTitle,
  Card,
  Header,
  AuthorInfo,
  Profile,
  Nickname,
  DateText,
  Title,
  Content,
  Meta,
  Divider,
  ControlButtons,
  RestrictionNotice,
} from './style';

import CommentList from './CommentList';
import CommentInput from './CommentInput';
import profileImg from './profile.svg';
import auth from '../api/auth';

/**
 * 게시글 상세 페이지
 * - 게시글 정보 렌더링
 * - 댓글 작성 및 목록
 * - 본인 글일 경우 수정/삭제 버튼 제공
 */
const PostDetail = ({ post }) => {
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingComment, setEditingComment] = useState(null); // 수정 모드 상태

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await auth.profile();
        setCurrentUser(profile.username);
      } catch (error) {
        console.error('프로필 조회 실패:', error.message);
      }
    };
    fetchProfile();
  }, []);

  const isAuthor = currentUser === post.author;

  const handleAddComment = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('글을 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:8080/api/post/delete/${post.id}`, config);
      alert('게시글이 삭제되었습니다.');
      navigate('/main');
    } catch (error) {
      console.error('❌ 게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  return (
    <Container>
      <InnerWrapper>
        <SectionTitle>자유게시판</SectionTitle>
        <Card>
          <Header>
            <AuthorInfo>
              <Profile src={profileImg} alt="profile" />
              <div>
                <Nickname>{post.author}</Nickname>
                <DateText>{post.date}</DateText>
              </div>
            </AuthorInfo>

            {isAuthor && (
              <ControlButtons>
                <span onClick={handleEdit}>수정</span>
                <span className="divider">|</span>
                <span onClick={handleDelete}>삭제</span>
              </ControlButtons>
            )}
          </Header>

          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
          <Meta>👁 {post.views}</Meta>

          <Divider />

          <CommentList
            postId={post.id}
            refreshTrigger={refreshTrigger}
            currentUser={currentUser}
            onEditComment={setEditingComment}
          />

          {currentUser && currentUser.badWordCount >= 5 && (
            <RestrictionNotice>욕설 5회 사용으로 댓글 작성이 제한됩니다.</RestrictionNotice>
          )}

          <CommentInput
            onSubmit={handleAddComment}
            disabled={currentUser && currentUser.badWordCount >= 5}
            postId={post.id}
            editingComment={editingComment}
            clearEdit={() => setEditingComment(null)}
          />
        </Card>
      </InnerWrapper>
    </Container>
  );
};

export default PostDetail;
