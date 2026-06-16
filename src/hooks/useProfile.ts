import { useEffect, useCallback } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { useUIStore } from '@/store/useUIStore';
import { ProfileService } from '@/services/profile-service';

export const useProfile = () => {
  const hasProfile = useProfileStore((state) => state.profile !== null);
  const setProfile = useProfileStore((state) => state.setProfile);
  const isLoading = useUIStore((state) => state.isLoading);
  const setLoading = useUIStore((state) => state.setLoading);
  const addLog = useUIStore((state) => state.addLog);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    const { data, error, isStaticFallback } = await ProfileService.fetchProfile();
    if (data) {
      setProfile(data);
      if (isStaticFallback) {
        useProfileStore.getState().setBackendAvailable(false);
      }
    } else if (error) {
      addLog(`ERROR: ${error}`);
    }
    setLoading(false);
  }, [setProfile, setLoading, addLog]);

  useEffect(() => {
    if (!hasProfile) {
      fetchProfile();
    }
  }, [hasProfile, fetchProfile]);

  return { hasProfile, isLoading, fetchProfile };
};
