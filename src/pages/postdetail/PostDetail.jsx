import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from './style';

import CommentList from './CommentList';
import CommentInput from './CommentInput';
import profileImg from './profile.svg';

const PostDetail = ({ post, comments }) => {
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState(comments);

  // 🔹 댓글 추가
  const handleAddComment = (newComment) => {
    setCommentList((prev) => [...prev, newComment]);
  };

  // 🔹 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  // 🔹 삭제 확인
  const handleDelete = () => {
    const confirmed = window.confirm('글을 삭제하시겠습니까?');
    if (confirmed) {
      console.log('삭제됨:', post.id);
      // 실제 삭제 처리 후 목록으로 이동 예시:
      // navigate('/board');
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

            <ControlButtons>
              <span onClick={handleEdit}>수정</span>
              <span className="divider">|</span>
              <span onClick={handleDelete}>삭제</span>
            </ControlButtons>
          </Header>

          <Title>{post.title}</Title>
          <Content>{post.content}</Content>

          <Meta>👁 {post.views}</Meta>

          <Divider />

          {/* 🔹 댓글 목록 */}
          <CommentList comments={commentList} />



          {/* 🔹 댓글 입력창 */}
          <CommentInput onSubmit={handleAddComment} />
        </Card>
      </InnerWrapper>
    </Container>
  );
};

export default PostDetail;
