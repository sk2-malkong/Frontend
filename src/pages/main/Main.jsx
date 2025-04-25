import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import S from './style';
import postApi from '../api/postlist';
import auth from '../api/auth';

const Main = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); 
  const postsPerPage = 8;

  const totalPages = Math.ceil(totalCount / postsPerPage);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          setIsLoggedIn(true);
          const userData = await auth.profile();
          setNickname(userData.username);
        }
      } catch (error) {
        console.error('프로필 조회 실패:', error.message);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = keyword
          ? await postApi.search(keyword, currentPage)
          : await postApi.postlist(currentPage);
        setPosts(data.content);
        setTotalCount(data.totalElements);
      } catch (error) {
        console.error('게시글 불러오기 실패:', error.message);
      }
    };
    fetchData();
  }, [keyword, currentPage]);

  return (
    <div>
      <S.MainWrapper>
        <S.ContentLeft>
          <S.TotalCount>전체 게시글: {totalCount}</S.TotalCount>

          <S.PostListWrapper>
            {posts.length > 0 ? (
              posts.map((post) => (
                <S.PostCard
                  key={post.postId}
                  onClick={() => navigate(`/post/${post.postId}`)}
                  style={{ cursor: 'pointer' }}
                >
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
              <button disabled={currentPage === 0} onClick={() => setCurrentPage(0)}>
                {'<<'}
              </button>
              <button disabled={currentPage === 0} onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}>
                {'<'}
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  style={{
                    fontWeight: currentPage === i ? 'bold' : 'normal',
                    color: currentPage === i ? 'red' : 'black',
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
              >
                {'>'}
              </button>
              <button
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage(totalPages - 1)}
              >
                {'>>'}
              </button>
            </S.Pagination>
          )}
        </S.ContentLeft>

        {isLoggedIn && (
          <S.SidebarRight>
            <S.UserAvatar />
            <S.Nickname>{nickname}</S.Nickname>
            <div>
              <S.ActionButton onClick={() => navigate('/postcreate')}>글쓰기</S.ActionButton>
              <S.ActionButton onClick={() => navigate('/mypage')}>마이페이지</S.ActionButton>
            </div>
          </S.SidebarRight>
        )}
      </S.MainWrapper>
    </div>
  );
};

export default Main;
