import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostEdit from './PostEdit';
import auth from '../api/auth';

const PostEditContainer = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:8080/api/post/${id}?increaseView=false`, config);
        const data = response.data;

        const profile = await auth.profile();
        const isAuthorMatch = profile.username === data.username;
        setIsAuthor(isAuthorMatch);

        setPost({ title: data.title, content: data.content });
      } catch (error) {
        console.error('❌ 게시글 불러오기 실패:', error);
        alert('게시글 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (updatedPost) => {
    if (!isAuthor) return;

    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:8080/api/post/update/${id}`,
        updatedPost,
        config
      );

      console.log('✅ 수정 완료 응답:', response.data);
      window.location.href = `/post/${id}`;
    } catch (error) {
      console.error('❌ 게시글 수정 실패:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    window.location.href = `/post/${id}`;
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <PostEdit
      post={post}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isAuthor={isAuthor}
    />
  );
};

export default PostEditContainer;
