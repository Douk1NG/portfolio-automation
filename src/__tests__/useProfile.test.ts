import { renderHook, waitFor } from '@testing-library/react';
import { useProfile } from '@/hooks/useProfile';
import { describe, it, expect } from 'vitest';
import { useProfileStore } from '@/store/useProfileStore';
import { useUIStore } from '@/store/useUIStore';
import type { Profile } from '@/types/profile';

describe('useProfile', () => {
  it('should fetch and set profile on mount if not present', async () => {
    // Reset store state
    useProfileStore.setState({ profile: null });
    useUIStore.setState({ isLoading: false });

    renderHook(() => useProfile());

    await waitFor(() => {
      const state = useProfileStore.getState();
      expect(state.profile).toBeDefined();
      expect(state.profile?.name).toBe('Test ES');
    });
  });

  it('should not fetch if profile is already present', async () => {
    const mockProfile = { name: 'Existing' } as object as Profile;
    useProfileStore.setState({ profile: mockProfile });
    useUIStore.setState({ isLoading: false });

    const { result } = renderHook(() => useProfile());

    expect(result.current.hasProfile).toBe(true);
  });
});
