import { renderHook, act } from '@testing-library/react';
import { usePortfolioActions } from '@/hooks/usePortfolioActions';
import { useProfileStore } from '@/store/useProfileStore';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('usePortfolioActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset store so handleSave and handleSync can access a profile.
    useProfileStore.setState({ profile: { name: 'Test' } as never });
  });

  it('handleAction should trigger toast info and success', async () => {
    const { result } = renderHook(() => usePortfolioActions());

    await act(async () => {
      await result.current.handleAction('sync', 'Sync');
    });

    expect(toast.info).toHaveBeenCalledWith('Starting Sync...');
    expect(toast.success).toHaveBeenCalledWith('Sync completed!');
  });
});
