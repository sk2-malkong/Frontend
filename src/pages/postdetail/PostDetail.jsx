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
  RestrictionNotice
} from './style';

import CommentList from './CommentList';
import CommentInput from './CommentInput';
import profileImg from './profile.svg';

/**
 * 게시글 상세 페이지
 * - 게시글 본문, 수정/삭제 버튼
 * - 댓글 목록 및 댓글 입력
 * - 욕설 5회 이상 사용 시 댓글 입력 제한
 */
const PostDetail = ({ post, comments }) => {
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState(comments);

    // 더미 사용자 정보 – 나중에 백엔드 연동 시 대체
    const user = {
      nickname: '사용자1',
      badWordCount: 4, // 여기를 바꾸면 제한 여부 테스트 가능
    };
    
    // 제한 여부 판단 (욕설 5회 사용마다 true)
    const isBlocked = user.badWordCount > 0 && user.badWordCount % 5 === 0;

  // 댓글 추가 - 새로운 댓글을 기존 배열에 추가
  const handleAddComment = (newComment) => {
    setCommentList((prev) => [...prev, newComment]);
  };

  // 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  // 삭제 확인 (confirm 창으로 확인)
  const handleDelete = () => {
    const confirmed = window.confirm('글을 삭제하시겠습니까?');
    if (confirmed) {
      console.log('삭제됨:', post.id);
      // 실제 삭제 처리 후 목록으로 이동 예시:
      // navigate('/main');
    }
  };

  return (
    <Container>
      <InnerWrapper>
        <SectionTitle>자유게시판</SectionTitle>
        <Card>
          {/* 작성자 정보 + 수정/삭제 버튼 */}
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

          {/* 게시글 본문 */}
          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
          <Meta>👁 {post.views}</Meta>

          <Divider />

          {/* 댓글 목록 */}
          <CommentList comments={commentList} />

          {/* 제한 문구 (조건부 렌더링) */}
          {isBlocked && (
            <RestrictionNotice>
              욕설 5회 사용하여 기능이 제한됩니다.
            </RestrictionNotice>
          )}


          {/* 댓글 입력창 (제한 여부에 따라 비활성화됨)*/}
          <CommentInput onSubmit={handleAddComment} disabled={isBlocked}/>
        </Card>
      </InnerWrapper>
    </Container>
  );
};

export default PostDetail;
