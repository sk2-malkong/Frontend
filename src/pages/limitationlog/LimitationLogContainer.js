import React, { useState, useEffect } from "react";
import LimitationLog from "./LimitationLog";
import limitService from "../api/limitService";

/**
 * 운영원칙 위반 안내 내역 컨테이너 컴포넌트
 * API 호출 및 데이터 관리를 담당
 * @returns {JSX.Element} LimitationLog 컴포넌트를 반환
 */
const LimitationLogContainer = () => {
    // 위반 내역 데이터 상태
    const [limitData, setLimitData] = useState(null);
    // 로딩 상태
    const [isLoading, setIsLoading] = useState(true);
    // 에러 상태
    const [error, setError] = useState(null);

    // 컴포넌트 마운트 시 데이터 가져오기
    useEffect(() => {
        const fetchLimitData = async () => {
            try {
                setIsLoading(true);
                const data = await limitService.postUserLimits();
                setLimitData(data);
                setError(null);
            } catch (err) {
                console.error("제한 내역을 불러오는 데 실패했습니다:", err);
                setError("데이터를 불러올 수 없습니다. 나중에 다시 시도해주세요.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLimitData();
    }, []);

    // 로딩 중 표시
    if (isLoading) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    // 에러 표시
    if (error) {
        return <div>{error}</div>;
    }

    // 데이터가 없을 경우
    if (!limitData || !limitData.logGroups || limitData.logGroups.length === 0) {
        return <div>표시할 제한 내역이 없습니다.</div>;
    }

    // 날짜 포맷 변환 함수 (2025-05-07T15:05:56 -> YY.MM.DD)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(2); // Get last 2 digits
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    // 시간 포맷 변환 함수 (2025-05-07T15:05:56 -> HH:MM)
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // 각 그룹마다 LimitationLog 컴포넌트 생성
    return (
        <div>
            {limitData.logGroups.map((group, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <LimitationLog
                        badwordLogs={group.logs}
                        startDate={group.startDate}
                        endDate={group.endDate}
                        isActive={limitData.isActive}
                        formatDate={formatDate}
                        formatTime={formatTime}
                    />
                </div>
            ))}
        </div>
    );
};

export default LimitationLogContainer;