import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostFormContainer from "./PostFormContainer";
import auth from "../api/auth";
import axios from "axios";

/**
 * PostEdit
 * - 게시글 수정 페이지
 * - 게시글 데이터 불러오기
 * - 작성자 검증
 * - 수정 API 연결
 * - PostFormContainer를 통해 수정 폼 렌더링
 */
const PostEdit = () => {
  const { id } = useParams(); // URL 파라미터에서 게시글 ID 추출
  const [post, setPost] = useState(null); // 게시글 데이터 상태
  const [isAuthor, setIsAuthor] = useState(false); // 작성자 여부
  const [loading, setLoading] = useState(true); // 로딩 상태

  /**
   * 게시글 불러오기 + 작성자 검증
   * - GET /api/post/{id}
   * - 작성자가 아닐 경우 수정 제한
   */
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 게시글 데이터 요청
        const response = await axios.get(
          `http://localhost:8080/api/post/${id}?increaseView=false`,
          config
        );
        const data = response.data;

        // 작성자 확인
        const profile = await auth.profile();
        setIsAuthor(profile.username === data.username);

        // 제목과 내용만 저장 (폼 초기값용)
        setPost({ title: data.title, content: data.content });
      } catch (error) {
        alert("게시글 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  /**
   * 게시글 수정 요청
   * - PUT /api/post/update/{id}
   * - 성공 시: 해당 게시글 상세 페이지로 이동
   */
  const handleSubmit = async (updatedPost) => {
    try {
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.put(
        `http://localhost:8080/api/post/update/${id}`,
        updatedPost,
        config
      );

      // 수정 완료 후 상세 페이지 이동
      window.location.href = `/post/${id}`;
    } catch (error) {
      alert("게시글 수정에 실패했습니다.");
    }
  };

  /**
   * 수정 취소 (게시글 상세 페이지로 이동)
   */
  const handleCancel = () => {
    window.location.href = `/post/${id}`;
  };

  /**
   * 렌더링 조건 분기
   */
  if (loading) return <div>로딩 중...</div>;
  if (!isAuthor) return <div>✋ 작성자만 수정할 수 있습니다.</div>;
  if (!post) return <div>존재하지 않는 게시물입니다.</div>;

  /**
   * 수정 폼 렌더링
   * - PostFormContainer에 초기 제목/내용 전달
   * - 제출/취소 핸들러 함께 전달
   */
  return (
    <PostFormContainer
      initialTitle={post.title}
      initialContent={post.content}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default PostEdit;
