import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostFormContainer from "./PostFormContainer";
import auth from "../api/auth";
import axios from "axios";

/**
 * 게시글 작성 페이지
 * - 로그인 상태 확인
 * - 게시글 작성 후 상세 페이지로 이동
 * - PostFormContainer 컴포넌트를 사용하여 폼을 렌더링
 */

const PostCreate = () => {
  const navigate = useNavigate();

  /**
   * 로그인 여부 확인
   * - accessToken이 없거나 프로필 조회 실패 시 로그인 페이지로 이동
   */
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요한 기능입니다.");
        navigate("/login");
        return;
      }
      try {
        await auth.profile(); // accessToken으로 사용자 프로필 조회
      } catch (error) {
        alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.");
        navigate("/login");
      }
    };
    checkLogin();
  }, [navigate]);

  /**
   * 게시글 작성 요청
   * - API: POST /api/post/create
   * - 성공 시: 해당 게시글 상세 페이지로 이동
   */
  const handleSubmit = async ({ title, content }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8080/api/post/create",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // 게시글 작성 성공 시, 해당 게시글 상세 페이지로 이동
      navigate(`/post/${response.data.postId}`);
    } catch (error) {
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  // 작성 취소 시 이전 페이지로 이동
  const handleCancel = () => {
    navigate(-1);
  };

  /**
   * 게시글 작성 폼 컴포넌트 렌더링
   * - PostFormContainer는 내부에서 PostForm을 렌더링
   * - handleSubmit과 handleCancel을 props로 전달
   */
  return <PostFormContainer onSubmit={handleSubmit} onCancel={handleCancel} />;
};

export default PostCreate;
