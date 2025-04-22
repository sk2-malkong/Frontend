import React from "react";
import PostForm from "./PostForm";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ 추가

const PostCreate = () => {
  const navigate = useNavigate(); // ✅ 추가

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

      // ✅ 등록 성공 시 해당 글의 상세 페이지로 이동
      const postId = response.data.id;
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
