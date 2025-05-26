import React, { useState, useEffect } from "react";
import LimitationLog from "./LimitationLog";
import limitService from "../api/limitService";
import S from "./style";

// 욕설 로그 타입
interface BadwordLog {
    originalWord: string;
    filteredWord: string;
    createdAt: string;
}

// 로그 그룹 타입
interface LogGroup {
    logs: BadwordLog[];
    startDate: string | null;
    endDate: string | null;
}

// 전체 API 응답 타입
interface LimitData {
    isActive: boolean;
    logGroups: LogGroup[];
    startDate: string | null;
    endDate: string | null;
}

const LimitationLogContainer: React.FC = () => {
    const [limitData, setLimitData] = useState<LimitData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLimitData = async () => {
            try {
                setIsLoading(true);

                // 타입 단언 제거하고 그대로 받음
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

    if (isLoading) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!limitData || !limitData.logGroups || limitData.logGroups.length === 0) {
        return <S.EmptyMessage>이용제한 내역 없음</S.EmptyMessage>;
    }

    // 날짜 포맷 변환 함수 (2025-05-07T15:05:56 -> YY.MM.DD)
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    // 시간 포맷 변환 함수 (2025-05-07T15:05:56 -> HH:MM)
    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div>
            {limitData.logGroups.map((group, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <LimitationLog
                        badwordLogs={group.logs}
                        startDate={group.startDate ?? ''}
                        endDate={group.endDate ?? ''}
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