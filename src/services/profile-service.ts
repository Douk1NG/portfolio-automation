import { apiClient } from '@/services/api-client';
import type { Profile } from '@/types/profile';

export const ProfileService = {
  async fetchProfile() {
    return apiClient.get<Profile>('/api/profile');
  },

  async saveProfile(profile: Profile) {
    return apiClient.post<{ success: boolean }>('/api/save-profile', profile);
  },
};
