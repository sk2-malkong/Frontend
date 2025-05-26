import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import S from './style';
import postApi from '../api/postlist';

interface Post {
  postId: number;
  username: string;
  title: string;
  content: string;
  createdAt: string;
  count: number;
}

interface MyPostsResponse {
  content: Post[];
  totalElements: number;
}

const MyPostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 8;
  const navigate = useNavigate(); // ✅ 추가

  const totalPages = Math.ceil(totalCount / postsPerPage);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const data: MyPostsResponse = await postApi.getMyPosts(currentPage - 1);
        setPosts(data.content);
        setTotalCount(data.totalElements);
      } catch (err) {
        console.error('[내 글 불러오기 실패]', err);
      }
    };

    fetchMyPosts();
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ 게시글 클릭 시 상세 페이지 이동
  const handleClickPost = (postId: number) => {
    navigate(`/post/post/${postId}`);
  };

  return (
    <S.MainWrapper>
      <S.ContentLeft>
        <h3>내가 작성한 글</h3>
        <S.TotalCount>전체 게시글: {totalCount}</S.TotalCount>

        <S.PostListWrapper>
          {posts.length > 0 ? (
            posts.map((post) => (
              <S.PostCard
                key={post.postId}
                onClick={() => handleClickPost(post.postId)} // ✅ 클릭 이벤트
                style={{ cursor: 'pointer' }} // ✅ 커서 스타일
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
            <button onClick={() => goToPage(1)}>{'<<'}</button>
            <button onClick={() => goToPage(Math.max(currentPage - 1, 1))}>{'<'}</button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                style={{
                  fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                  color: currentPage === i + 1 ? 'red' : 'black',
                }}
              >
                {i + 1}
              </button>
            ))}

            <button onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}>{'>'}</button>
            <button onClick={() => goToPage(totalPages)}>{'>>'}</button>
          </S.Pagination>
        )}
      </S.ContentLeft>
    </S.MainWrapper>
  );
};

export default MyPostList;
