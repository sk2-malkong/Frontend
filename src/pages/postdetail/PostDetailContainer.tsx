import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from './PostDetail';
import { fetchPostDetail } from '../api/postdetail'; 
import { fetchComments } from '../api/comment';      

/**
 * PostDetailContainer
 * 
 * - 게시글 ID를 기반으로 게시글 상세 데이터를 API에서 가져옴
 * - 가져온 데이터를 PostDetail 컴포넌트에 전달
 */
interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  views: number;
}

/**
 * PostDetailContainer
 */
const PostDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL의 postId 가져오기

  const [post, setPost] = useState<Post | null>(null); // 게시글 상세 데이터
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  // 게시글 및 댓글 조회 요청
  useEffect(() => {
    let isMounted = true; // 언마운트 후 상태 업데이트 방지용

    const fetchPostAndComments = async () => {
      try {
        if (!id) return;

        // 게시글 상세 데이터 가져오기
        const data = await fetchPostDetail(Number(id)); 
        const mappedPost: Post = {
          id: data.postId,
          author: data.username,
          title: data.title,
          content: data.content,
          date: new Date(data.createdAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
          views: data.count,
        };

        if (isMounted) {
          setPost(mappedPost); // 게시글 상태 설정
        }
      } catch (error) {
        console.error('❌ 게시글 불러오기 실패:', (error as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPostAndComments();

    // 컴포넌트 언마운트 시 무효화
    return () => {
      isMounted = false;
    };
  }, [id]);

  // 로딩 중이면 로딩 메시지
  if (loading) return <div>{"로딩 중..."}</div>;
  // 게시글이 존재하지 않으면 안내
  if (!post) return <div>{"존재하지 않는 게시물입니다."}</div>;
  // 게시글 데이터와 댓글 리스트 전달
  return <PostDetail post={post} />;
};

export default PostDetailContainer;
