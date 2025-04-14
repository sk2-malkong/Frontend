import React from 'react';
import S from './style';

const Main = () => {
    const isLoggedIn = false
    const dummyPosts = Array(6).fill({
    author: '동글이',
    date: '2025.04.11',
    title: '오늘은 뭐먹을까?',
    content: '오늘 아침,,, 너무 졸려………. 다들 아침에 알람 한번에 듣니…',
    views: 112,
  });
  return (
    <div>
      <S.MainWrapper>
      <S.ContentLeft>
        <S.TotalCount>전체 게시글: {dummyPosts.length}</S.TotalCount>
        <S.PostListWrapper>
        {dummyPosts.map((post, idx) => (
            <S.PostCard key={idx}>
              <div className="post-header">
                <div className="author-icon" />
                <span>{post.author}</span>
                <div className="divider" />
                <span>{post.date}</span>
                <div className="divider" />
                <span>👁 {post.views}</span>
              </div>
              <h3 className="title">{post.title}</h3>
              <p className="content">{post.content}</p>
            </S.PostCard>
          ))}
        </S.PostListWrapper>
      </S.ContentLeft>

      {isLoggedIn && (
        <S.SidebarRight>
          <S.UserAvatar />
          <S.Nickname>닉네임</S.Nickname>
          <div>
            <S.ActionButton>글쓰기</S.ActionButton>
            <S.ActionButton>마이페이지</S.ActionButton>
          </div>
        </S.SidebarRight>
      )}
    </S.MainWrapper>
    </div>
  );
};

export default Main;