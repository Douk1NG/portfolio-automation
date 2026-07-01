import { apiClient } from '@/services/api-client';
import type { Profile } from '@/types/profile';
import { ProfileSchema } from '@/types/profile-schema';

export type ProfileFetchResult = {
  data: Profile | null;
  error: string | null;
  isStaticFallback: boolean;
};

const loadStaticProfile = async (): Promise<Profile | null> => {
  try {
    const module = await import('@/data/profile.json');
    return ProfileSchema.parse(module.default);
  } catch {
    return null;
  }
};

export const ProfileService = {
  async fetchProfile(): Promise<ProfileFetchResult> {
    const apiResult = await apiClient.get<Profile>('/api/profile');

    if (apiResult.data) {
      return { ...apiResult, isStaticFallback: false };
    }

    const staticProfile = await loadStaticProfile();

    if (staticProfile) {
      return { data: staticProfile, error: null, isStaticFallback: true };
    }

    return { ...apiResult, isStaticFallback: false };
  },

  async saveProfile(profile: Profile) {
    return apiClient.post<{ success: boolean }>('/api/save-profile', profile);
  },
};
