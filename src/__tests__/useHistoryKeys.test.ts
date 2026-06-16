import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHistoryKeys } from '@/hooks/useHistoryKeys';
import { useHistoryStore } from '@/store/useHistoryStore';
import { useProfileStore } from '@/store/useProfileStore';
import type { Profile } from '@/types/profile';

const mockProfile: Profile = {
  name: 'Original',
  surname: '',
  title: { es: 'Dev', en: 'Dev' },
  email: '',
  phone: '',
  location: { es: '', en: '' },
  linkedin: '',
  github: '',
  bio: { es: '', en: '' },
  portfolioUrl: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  devProjects: {
    title: { es: '', en: '' },
    date: { es: '', en: '' },
    description: { es: '', en: '' },
  },
};

function fireKeydown(options: Partial<KeyboardEvent>) {
  const event = new KeyboardEvent('keydown', { bubbles: true, ...options });
  window.dispatchEvent(event);
}

describe('useHistoryKeys', () => {
  beforeEach(() => {
    // Start each test with a fresh profile and empty stacks
    useProfileStore.getState().setProfile({ ...mockProfile });
  });

  it('Ctrl+Z triggers undo when there is history', () => {
    const store = useProfileStore.getState();
    store.updateProfileData({ name: 'Changed' }, true);
    expect(useProfileStore.getState().profile?.name).toBe('Changed');

    renderHook(() => useHistoryKeys());

    act(() => {
      fireKeydown({ key: 'z', ctrlKey: true });
    });

    expect(useProfileStore.getState().profile?.name).toBe('Original');
  });

  it('Ctrl+Y triggers redo when there is undone history', () => {
    const store = useProfileStore.getState();
    store.updateProfileData({ name: 'Changed' }, true);
    useHistoryStore.getState().undo();
    expect(useProfileStore.getState().profile?.name).toBe('Original');

    renderHook(() => useHistoryKeys());

    act(() => {
      fireKeydown({ key: 'y', ctrlKey: true });
    });

    expect(useProfileStore.getState().profile?.name).toBe('Changed');
  });

  it('Ctrl+Shift+Z triggers redo', () => {
    const store = useProfileStore.getState();
    store.updateProfileData({ name: 'Changed' }, true);
    useHistoryStore.getState().undo();

    renderHook(() => useHistoryKeys());

    act(() => {
      fireKeydown({ key: 'z', ctrlKey: true, shiftKey: true });
    });

    expect(useProfileStore.getState().profile?.name).toBe('Changed');
  });

  it('Ctrl+Z does nothing when the undo stack is empty', () => {
    renderHook(() => useHistoryKeys());

    act(() => {
      fireKeydown({ key: 'z', ctrlKey: true });
    });

    expect(useProfileStore.getState().profile?.name).toBe('Original');
    expect(useHistoryStore.getState().undoStack).toHaveLength(0);
  });

  it('Ctrl+Y does nothing when the redo stack is empty', () => {
    renderHook(() => useHistoryKeys());

    act(() => {
      fireKeydown({ key: 'y', ctrlKey: true });
    });

    expect(useProfileStore.getState().profile?.name).toBe('Original');
    expect(useHistoryStore.getState().redoStack).toHaveLength(0);
  });

  it('removes the keydown listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useHistoryKeys());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
