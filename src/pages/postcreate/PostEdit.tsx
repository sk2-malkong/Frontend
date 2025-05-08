import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostFormContainer from "./PostFormContainer";
import auth from "../api/auth";
import axios from "axios";
import { updatePost } from "../api/postedit";

/**
 * PostEdit
 * - 게시글 수정 페이지
 * - 게시글 데이터 불러오기
 * - 작성자 검증
 * - 수정 API 연결
 * - PostFormContainer를 통해 수정 폼 렌더링
 */
interface PostData {
  title: string;
  content: string;
}

const PostEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL 파라미터에서 게시글 ID 추출
  const [post, setPost] = useState<PostData | null>(null); // 게시글 데이터 상태
  const [isAuthor, setIsAuthor] = useState<boolean>(false); // 작성자 여부
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  /**
   * 게시글 불러오기 + 작성자 검증 + penalty 정보 최신화
   * - GET /api/post/{id}
   * - 작성자가 아닐 경우 수정 제한
   * - 서버에서 penalty 정보 받아서 localStorage에 저장
   */
  useEffect(() => {
    const fetchPostAndUpdatePenalty = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 게시글 데이터 요청
        const response = await axios.get(
          `http://localhost:8080/api/post/${id}?increaseView=false`,
          config
        );
        const data = response.data;

        // 사용자 프로필 요청
        const profile = await auth.profile();

        // 작성자 확인
        const currentUsername = localStorage.getItem("username");
        setIsAuthor(currentUsername === data.username);

        // ✅ penalty 정보가 있을 때만 업데이트
        if (profile.penaltyCount !== undefined) {
          localStorage.setItem("penaltyCount", String(profile.penaltyCount));
        }
        if (profile.limits !== undefined) {
          localStorage.setItem("penaltyEndDate", profile.limits);
        }

        console.log("🟢 최신 penalty 정보 갱신 완료");

        // 제목과 내용만 저장 (폼 초기값용)
        setPost({ title: data.title, content: data.content });
      } catch (error) {
        alert("게시글 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndUpdatePenalty();
  }, [id]);

  /**
   * 게시글 수정 요청
   * - API: PUT /api/post/update/{id}
   */
  const handleSubmit = async (updatedPost: PostData) => {
    try {
      if (!id) return;
      await updatePost(Number(id), updatedPost);
      window.location.href = `/post/${id}`; // 수정 성공 후 해당 페이지로 이동
    } catch (error) {
      alert("게시글 수정에 실패했습니다.");
    }
  };

  /**
   * 수정 취소 (게시글 상세 페이지로 이동)
   */
  const handleCancel = () => {
    if (!id) return;
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
