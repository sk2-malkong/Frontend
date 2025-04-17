import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import S from './style';
import postApi from '../api/postlist';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const totalPages = Math.ceil(totalCount / postsPerPage);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const savedNickname = localStorage.getItem('username');
    if (token) {
      setIsLoggedIn(true);
      setNickname(savedNickname || '사용자');
    }
  }, []);

  useEffect(() => {
    const fetchSearchedPosts = async () => {
      if (!keyword) return;
      try {
        const data = await postApi.search(keyword, currentPage);
        setPosts(data.content);
        setTotalCount(data.totalElements);
      } catch (err) {
        console.error('검색 실패:', err.message);
      }
    };

    fetchSearchedPosts();
  }, [keyword, currentPage]);

  return (
    <S.MainWrapper>
      <S.ContentLeft>
        <h3>검색된 글</h3>
        <S.TotalCount>전체 게시글: {totalCount}</S.TotalCount>

        <S.PostListWrapper>
          {posts.length > 0 ? (
            posts.map((post) => (
              <S.PostCard key={post.postId}>
                <div className="post-header">
                  <div className="author-icon" />
                  <span>{post.username}</span>
                  <div className="divider" />
                  <span>{post.createdAt.split('T')[0]}</span>
                  <div className="divider" />
                  <span>👁 {post.count}</span>
                </div>
                <h3 className="title">{post.title}</h3>
                <p className="content">{post.content}</p>
              </S.PostCard>
            ))
          ) : (
            <p style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
              게시물이 없습니다.
            </p>
          )}
        </S.PostListWrapper>

        {posts.length > 0 && (
          <S.Pagination>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>{'<<'}</button>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>{'<'}</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                  color: currentPage === i + 1 ? 'red' : 'black',
                }}
              >
                {i + 1}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>{'>'}</button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>{'>>'}</button>
          </S.Pagination>
        )}
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
  );
};

export default Search;
