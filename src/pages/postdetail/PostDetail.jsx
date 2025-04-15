import React from 'react';
import {
  Container,
  Card,
  Header,
  Profile,
  Nickname,
  DateText,
  Title,
  Content,
  Meta,
  Divider,
} from './style';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

const PostDetail = ({ post, comments }) => {
  return (
    <Container>
      <Card>
        <Header>
          <Profile src="/default-profile.png" alt="profile" />
          <div>
            <Nickname>{post.author}</Nickname>
            <DateText>{post.date}</DateText>
          </div>
        </Header>

        <Title>{post.title}</Title>
        <Content>{post.content}</Content>

        <Meta>
          <span>👁 {post.views}</span>
          <div>
            <span>수정</span> | <span>삭제</span>
          </div>
        </Meta>

        <Divider />

        <CommentList comments={comments} />
        <CommentInput />
      </Card>
    </Container>
  );
};

export default PostDetail;
