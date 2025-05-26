import api from './axios';

interface BadwordLog {
  filteredWord: string;
  originalWord: string;
  createdAt: string;
}

interface LogGroup {
  logs: BadwordLog[];
  startDate: string | null;
  endDate: string | null;
}

interface LimitData {
  isActive: boolean;
  logGroups: LogGroup[];
  startDate: string | null;
  endDate: string | null;
}

const limitService = {
  postUserLimits: async (): Promise<LimitData> => {
    try {
      const response = await api.post<LimitData>('/user/limits');
      return response.data;
    } catch (error) {
      console.error('사용자 제한 정보 조회 실패:', error);
      throw error;
    }
  },
};

export default limitService;
