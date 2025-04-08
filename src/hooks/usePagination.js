import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePagination = ({ pageRange, list }) => {
  const location = useLocation();  // 현재 URL 정보
  const navigate = useNavigate();  // URL 업데이트 함수

  // URL에서 page 쿼리 파라미터 값 가져오기
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page"), 10) || 1;

  const [page, setPage] = useState(initialPage); // 페이지 상태

  const startPost = (page - 1) * pageRange; // 시작 인덱스
  const endPost = startPost + pageRange; // 끝 인덱스
  const currentList = list.slice(startPost, endPost); // 현재 페이지에 해당하는 항목들
  const totalPost = list.length; // 총 게시물 수
  const totalPage = Math.ceil(totalPost / pageRange); // 총 페이지 수

  // 페이지가 변경될 때마다 URL의 쿼리 파라미터를 업데이트
  useEffect(() => {
    navigate(`?page=${page}`, { replace: true });  // page가 변경될 때 URL 업데이트
  }, [page, navigate]);

  return { currentList, setPage, page, totalPost, totalPage };
};

export default usePagination;
