import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import S, { BubbleProps } from './style';
import postApi from '../api/postlist';
import auth from '../api/auth';

interface Post {
  postId: number;
  title: string;
  username: string;
  createdAt: string;
  count: number;
  commentCount?: number;
}

interface PostListResponse {
  content: Post[];
  totalElements: number;
}

const PAGE_SIZE = 8;

const Main: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get('keyword') ?? '';
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn]     = useState(false);
  const [nickname, setNickname]         = useState('');
  const [posts, setPosts]               = useState<Post[]>([]);
  const [currentPage, setCurrentPage]   = useState(0);
  const [totalPages, setTotalPages]     = useState(1);

  useEffect(() => {
    AOS.init({ duration: 600 });
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      auth.profile().then(u => setNickname(u.username));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data: PostListResponse = keyword
        ? await postApi.search(keyword, currentPage)
        : await postApi.postlist(currentPage);
      setPosts(data.content);
      setTotalPages(Math.ceil(data.totalElements / PAGE_SIZE));
    };
    fetchData().catch(console.error);
  }, [keyword, currentPage]);

  const bubbles: BubbleProps[] = Array.from({ length: 10 }).map(() => ({
    size: 50 + Math.random() * 80,
    left: Math.random() * 100,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 4,
  }));

  return (
    <S.MainWrapper>
      {bubbles.map((b, idx) => (
        <S.Bubble key={idx} {...b} />
      ))}

      <S.Header>
        <S.Title>게시판</S.Title>
      </S.Header>

      <S.Body>
        <S.TableWrapper>
          <S.Table>
            <thead>
              <tr>
                <S.Th style={{ width: '60px' }}>번호</S.Th>
                <S.Th>제목</S.Th>
                <S.Th style={{ width: '120px' }}>글쓴이</S.Th>
                <S.Th style={{ width: '100px' }}>작성일</S.Th>
                <S.Th style={{ width: '80px' }}>조회</S.Th>
                <S.Th style={{ width: '80px' }}>댓글수</S.Th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr
                  key={post.postId}
                  onClick={() => navigate(`/post/post/${post.postId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <S.Td>{post.postId}</S.Td>
                  <S.Td style={{ maxWidth: '400px' }} title={post.title}>
                    {post.title}
                  </S.Td>
                  <S.Td>{post.username}</S.Td>
                  <S.Td>{post.createdAt.split('T')[0]}</S.Td>
                  <S.Td>{post.count}</S.Td>
                  <S.Td>{post.commentCount ?? 0}</S.Td>
                </tr>
              ))}
            </tbody>
          </S.Table>

          {posts.length > 0 && (
            <S.Pagination>
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(0)}
              >
                {'<<'}
              </button>
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              >
                {'<'}
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  data-active={currentPage === i}
                  onClick={() => setCurrentPage(i)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
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
        </S.TableWrapper>

        <S.SidebarCard>
          <S.Avatar />
          <S.Username>{isLoggedIn ? nickname : '비회원'}</S.Username>
          <S.ButtonGroup>
            <S.Button
              onClick={() => {
                if (isLoggedIn) navigate('/post/postcreate');
                else {
                  alert('로그인이 필요합니다.');
                  navigate('/login');
                }
              }}
            >
              글쓰기
            </S.Button>
            <S.Button
              onClick={() => {
                if (isLoggedIn) navigate('/post/mypage');
                else {
                  alert('로그인이 필요합니다.');
                  navigate('/login');
                }
              }}
            >
              마이페이지
            </S.Button>
          </S.ButtonGroup>
        </S.SidebarCard>
      </S.Body>
    </S.MainWrapper>
  );
};

export default Main;
