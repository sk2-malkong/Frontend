import React, { useState, useEffect } from 'react';
import S from './style';

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const savedNickname = localStorage.getItem('username'); 

    if (token) {
      setIsLoggedIn(true);
      setNickname(savedNickname || '사용자');
    }
  }, []);

  const dummyPosts = Array(23).fill({
    author: '동글이',
    date: '2025.04.11',
    title: '오늘은 뭐먹을까?',
    content: '오늘 아침,,, 너무 졸려………. 다들 아침에 알람 한번에 듣니…',
    views: 112,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const totalPages = Math.ceil(dummyPosts.length / postsPerPage);

  const startIdx = (currentPage - 1) * postsPerPage;
  const paginatedPosts = dummyPosts.slice(startIdx, startIdx + postsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <S.MainWrapper>
        <S.ContentLeft>
          <S.TotalCount>전체 게시글: {dummyPosts.length}</S.TotalCount>

          <S.PostListWrapper>
            {paginatedPosts.map((post, idx) => (
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

          <S.Pagination>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>{'<<'}</button>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>{'<'}</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageClick(i + 1)}
                style={{
                  fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                  color: currentPage === i + 1 ? 'red' : 'black',
                }}
              >
                {i + 1}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>{'>'}</button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>{'>>'}</button>
          </S.Pagination>
        </S.ContentLeft>

        {isLoggedIn && (
          <S.SidebarRight>
            <S.UserAvatar />
            <S.Nickname>{nickname}</S.Nickname>
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
