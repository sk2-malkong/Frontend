import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostForm from '../postcreate/PostForm';
import auth from '../api/auth';

const PostEditContainer = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(true); // 기본은 true (권한 없으면 false로 변경)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:8080/api/post/${id}`, config);
        const data = response.data;

        const profile = await auth.profile();

        // 작성자와 비교
        const isAuthorMatch = profile.username === data.username;
        setIsAuthor(isAuthorMatch);

        setPost({
          title: data.title,
          content: data.content,
        });
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
    if (!isAuthor) return; // 🔒 비작성자는 아예 처리 안 함

    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:8080/api/post/update/${id}`,
        {
          title: updatedPost.title,
          content: updatedPost.content,
        },
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
  if (!post) return <div>존재하지 않는 게시물입니다.</div>;

  return (
    <PostForm
      initialTitle={post.title}
      initialContent={post.content}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isBlocked={!isAuthor} // ✅ 작성자 아닐 때 폼에서 막을 수 있게 prop 전달
    />
  );
};

export default PostEditContainer;
