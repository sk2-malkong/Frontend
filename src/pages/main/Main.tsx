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
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);

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
      try {
        setLoading(true);
        setError(null);

        const data: PostListResponse = keyword
            ? await postApi.search(keyword, currentPage)
            : await postApi.postlist(currentPage);

        // 안전한 데이터 체크
        if (data && Array.isArray(data.content)) {
          setPosts(data.content);
          setTotalPages(Math.ceil(data.totalElements / PAGE_SIZE));
        } else {
          console.error('Invalid data structure:', data);
          setPosts([]); // 빈 배열로 설정
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
        setPosts([]); // 에러 시에도 빈 배열로 설정
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, currentPage]);

  const bubbles: BubbleProps[] = Array.from({ length: 10 }).map(() => ({
    size: 50 + Math.random() * 80,
    left: Math.random() * 100,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 4,
  }));

  // 로딩 상태 처리
  if (loading) {
    return (
        <S.MainWrapper>
          {bubbles.map((b, idx) => (
              <S.Bubble key={idx} {...b} />
          ))}
          <S.Header>
            <S.Title>게시판</S.Title>
          </S.Header>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            로딩 중...
          </div>
        </S.MainWrapper>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
        <S.MainWrapper>
          {bubbles.map((b, idx) => (
              <S.Bubble key={idx} {...b} />
          ))}
          <S.Header>
            <S.Title>게시판</S.Title>
          </S.Header>
          <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
            {error}
          </div>
        </S.MainWrapper>
    );
  }

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
              {/* 안전한 map 호출 */}
              {(posts && Array.isArray(posts) ? posts : []).map(post => (
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
                    <S.Td>{post.createdAt?.split('T')[0] || ''}</S.Td>
                    <S.Td>{post.count}</S.Td>
                    <S.Td>{post.commentCount ?? 0}</S.Td>
                  </tr>
              ))}

              {/* 게시글이 없을 때 메시지 */}
              {(!posts || posts.length === 0) && (
                  <tr>
                    <S.Td colSpan={6} style={{ textAlign: 'center', padding: '50px' }}>
                      게시글이 없습니다.
                    </S.Td>
                  </tr>
              )}
              </tbody>
            </S.Table>

            {posts && posts.length > 0 && (
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
            <S.Avatar>   <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 150 151" fill="none">
                    <path d="M150 75.5C150 116.921 116.421 150.5 75 150.5C33.5786 150.5 0 116.921 0 75.5C0 34.0786 33.5786 0.5 75 0.5C116.421 0.5 150 34.0786 150 75.5Z" fill="#D9D9D9"/>
                    <path d="M27.6922 133.701C31.7509 113.727 51.3876 98.5769 75 98.5769C98.6124 98.5769 118.249 113.727 122.308 133.701C109.402 144.204 92.9364 150.5 75 150.5C57.0636 150.5 40.5978 144.204 27.6922 133.701Z" fill="white"/>
                    <path d="M98.0769 65.4038C98.0769 78.4144 87.5298 88.9615 74.5192 88.9615C61.5087 88.9615 50.9615 78.4144 50.9615 65.4038C50.9615 52.3933 61.5087 41.8462 74.5192 41.8462C87.5298 41.8462 98.0769 52.3933 98.0769 65.4038Z" fill="white"/>
                  </svg></S.Avatar>
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