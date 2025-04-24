import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostDetail from './PostDetail';

/**
 * PostDetailContainer
 *
 * 역할:
 * - 게시글 ID를 기반으로 게시글 정보 및 댓글 목록을 API에서 불러옴
 * - 불러온 데이터를 PostDetail 컴포넌트에 props로 전달
 */
const PostDetailContainer = () => {
  const { id } = useParams(); // URL의 postId 가져오기

  const [post, setPost] = useState(null);         // 게시글 상세 데이터
  const [comments, setComments] = useState([]);   // 댓글 목록
  const [loading, setLoading] = useState(true);   // 로딩 상태

  // 게시글 및 댓글 조회 요청
  useEffect(() => {
    let isMounted = true; // 언마운트 후 상태 업데이트 방지용

    const fetchPostAndComments = async () => {
      try {
        // 게시글 상세 데이터 가져오기
        const postRes = await axios.get(`http://localhost:8080/api/post/${id}`);
        const data = postRes.data;

        const mappedPost = {
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
        console.error('❌ 게시글 불러오기 실패:', error.message);
      }

      try {
        // 댓글 목록 가져오기 (인증 없이 조회 가능)
        const commentRes = await axios.get(`http://localhost:8080/api/comment/${id}`);
        const mappedComments = commentRes.data.map((c) => ({
          username: c.username,
          date: new Date(c.createdAt).toLocaleString('ko-KR'),
          text: c.text,
          profile: null, // 프로필 이미지가 있으면 설정 가능
        }));

        if (isMounted) {
          setComments(mappedComments); // 댓글 상태 설정
        }
      } catch (error) {
        console.error('❌ 댓글 불러오기 실패:', error.message);
      } finally {
        // 로딩 종료
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
  if (loading) return <div>로딩 중...</div>;

  // 게시글이 존재하지 않으면 안내
  if (!post) return <div>존재하지 않는 게시물입니다.</div>;

  // 게시글 데이터와 댓글 리스트 전달
  return <PostDetail post={post} comments={comments} />;
};

export default PostDetailContainer;
