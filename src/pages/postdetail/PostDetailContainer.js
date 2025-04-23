import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostDetail from './PostDetail';

const PostDetailContainer = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPostAndComments = async () => {
      try {
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
          setPost(mappedPost);
        }
      } catch (error) {
        console.error('❌ 게시글 불러오기 실패:', error.message);
      }

      try {
        // ✅ 토큰 제거하고 바로 요청
        const commentRes = await axios.get(`http://localhost:8080/api/comment/${id}`);
        const mappedComments = commentRes.data.map((c) => ({
          username: c.username,
          date: new Date(c.createdAt).toLocaleString('ko-KR'),
          text: c.text,
          profile: null,
        }));

        if (isMounted) {
          setComments(mappedComments);
        }
      } catch (error) {
        console.error('❌ 댓글 불러오기 실패:', error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPostAndComments();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!post) return <div>존재하지 않는 게시물입니다.</div>;

  return <PostDetail post={post} comments={comments} />;
};

export default PostDetailContainer;
