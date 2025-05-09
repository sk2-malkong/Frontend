/**
 * 사용자의 제한 여부를 판단하는 함수
 *
 * @param isActive - 백엔드에서 온 계정 활성 상태 (false면 제한받은 상태)
 * @param endDateStr - 제한 해제 시각 (penaltyEndDate, ISO string)
 * @returns 제한 중이면 true, 제한이 풀렸으면 false
 */
export const isUserRestricted = (
    isActive: boolean,
    endDateStr?: string
  ): boolean => {
    if (!isActive && endDateStr) {
      const now = new Date();
      const endDate = new Date(endDateStr);
      return endDate > now;
    }
    return false;
  };