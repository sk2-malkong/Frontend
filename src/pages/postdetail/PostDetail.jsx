import React from 'react';
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
              <span>수정</span>
              <span className="divider">|</span>
              <span>삭제</span>
            </ControlButtons>
          </Header>

          <Title>{post.title}</Title>
          <Content>{post.content}</Content>

          <Meta>👁 {post.views}</Meta>

          <Divider />

          {/* 댓글 목록 */}
          <CommentList comments={comments} />

          {/* 댓글 입력창 - 여백 없이 바로 아래에 붙게! */}
          <CommentInput />
        </Card>
      </InnerWrapper>
    </Container>
  );
};

export default PostDetail;
