import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostFormContainer from "./PostFormContainer";
import auth from "../api/auth";
import { createPost } from "../api/postcreate";

/**
 * 게시글 작성 페이지
 * - 로그인 상태 확인
 * - 게시글 작성 후 상세 페이지로 이동
 * - PostFormContainer 컴포넌트를 사용하여 폼을 렌더링
 */

interface CreatePostResponse {
  postId: number;
}

const PostCreate: React.FC = () => {
  const navigate = useNavigate();

  /**
   * 로그인 여부 확인 + 최신 penalty 정보 갱신
   * - accessToken이 없거나 프로필 조회 실패 시 로그인 페이지로 이동
   * - 서버에서 penalty 정보 받아서 localStorage에 저장
   */
  useEffect(() => {
    const checkLoginAndUpdatePenalty = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요한 기능입니다.");
        navigate("/login");
        return;
      }

      try {
        const profile = await auth.profile(); // 최신 penalty 정보 요청

        // ✅ penalty 정보가 있을 때만 업데이트
        if (profile.penaltyCount !== undefined) {
          localStorage.setItem("penaltyCount", String(profile.penaltyCount));
        }
        if (profile.limits !== undefined) {
          localStorage.setItem("penaltyEndDate", profile.limits);
        }

        console.log("🟢 최신 penalty 정보 갱신 완료");
      } catch (error) {
        console.warn("⚠️ penalty 정보 조회 실패");
        alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.");
        navigate("/login");
      }
    };

    checkLoginAndUpdatePenalty();
  }, [navigate]);

  /**
   * 게시글 작성 요청
   * - API: POST /api/post/create
   * - 성공 시: 해당 게시글 상세 페이지로 이동
   */
  const handleSubmit = async ({ title, content }: { title: string; content: string }) => {
    try {
      const response = await createPost({ title, content }) as CreatePostResponse;
      navigate(`/post/${response.postId}`); // 성공 후 해당 게시글 상세 페이지로 이동
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
  return (
    <PostFormContainer
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default PostCreate;
