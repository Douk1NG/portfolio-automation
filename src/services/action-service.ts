import { apiClient } from '@/services/api-client';

export const ActionService = {
  async runAction(endpoint: string) {
    return apiClient.post<{ success: boolean }>(`/api/${endpoint}`);
  },
};
