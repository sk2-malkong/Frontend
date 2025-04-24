import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import axios from "axios";

const PostCreate = () => {
  const navigate = useNavigate();

  // 페이지 진입 시 로그인 여부 확인
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("로그인이 필요한 기능입니다.");
        navigate("/login");
        return;
      }

      try {
        // 사용자 프로필 확인용 API
        await axios.get("http://localhost:8080/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("❌ 로그인 정보 확인 실패:", error);
        alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.");
        navigate("/login");
      }
    };

    checkLogin();
  }, [navigate]);

  // 글 등록 요청
  const handleSubmit = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:8080/api/post/create",
        {
          title: data.title,
          content: data.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ 게시글 등록 성공:", response.data);

      // 등록 성공 시 해당 게시글 상세 페이지로 이동
      const postId = response.data.postId;
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error("❌ 게시글 등록 실패:", error.response?.data || error.message);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    console.log("이전 화면으로");
    navigate(-1);
  };

  return <PostForm onSubmit={handleSubmit} onCancel={handleCancel} />;
};

export default PostCreate;
