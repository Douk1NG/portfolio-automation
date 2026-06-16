import { create } from 'zustand';
import type { Profile } from '../types/profile';
import { useUIStore } from './useUIStore';
import { useHistoryStore } from './useHistoryStore';

export type ProfileStore = {
  profile: Profile | null;
  profileRevision: number;
  formCommit: (() => Profile) | null;
  saveStatus: 'saved' | 'saving' | 'error';
  lastSavedProfileJson: string | null;

  setProfile: (profile: Profile | null, skipHistory?: boolean) => void;
  updateProfileData: (data: Partial<Profile>, immediate?: boolean) => void;
  syncProfileFromForm: (profileData: Profile, immediate?: boolean) => void;
  registerFormCommit: (commit: (() => Profile) | null) => void;
  commitFormToStore: () => Profile | null;
  fetchProfile: () => Promise<void>;
  saveProfile: () => Promise<boolean>;
  setSaveStatus: (saveStatus: 'saved' | 'saving' | 'error') => void;
  setLastSavedProfileJson: (lastSavedProfileJson: string | null) => void;
};

let snapshotTimeout: NodeJS.Timeout | null = null;

const bumpRevision = (state: { profileRevision: number }) => state.profileRevision + 1;

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  profileRevision: 0,
  formCommit: null,
  saveStatus: 'saved',
  lastSavedProfileJson: null,

  setProfile: (profile, skipHistory = false) => {
    if (snapshotTimeout) {
      clearTimeout(snapshotTimeout);
      snapshotTimeout = null;
    }

    if (!skipHistory) {
      useHistoryStore.getState().clear();
    }

    set((state) => ({
      profile,
      profileRevision: bumpRevision(state),
    }));
  },

  registerFormCommit: (commit) => set({ formCommit: commit }),

  commitFormToStore: () => {
    const commit = get().formCommit;
    if (!commit) return null;

    const values = commit();
    set({ profile: values });
    return values;
  },

  updateProfileData: (data, immediate = false) => {
    const { profile } = get();
    if (!profile) return;

    if (immediate) {
      if (snapshotTimeout) clearTimeout(snapshotTimeout);
      useHistoryStore.getState().snapshot(profile);
    } else {
      if (!snapshotTimeout) {
        useHistoryStore.getState().snapshot(profile);
      }
      if (snapshotTimeout) clearTimeout(snapshotTimeout);
      snapshotTimeout = setTimeout(() => {
        snapshotTimeout = null;
      }, 1000); // 1 second debounce for grouping keystrokes
    }

    const updatedProfile = {
      ...profile,
      ...data,
    };

    set({ profile: updatedProfile });
  },

  syncProfileFromForm: (profileData, immediate = false) => {
    const { profile } = get();
    if (!profile) return;

    if (immediate) {
      if (snapshotTimeout) clearTimeout(snapshotTimeout);
      useHistoryStore.getState().snapshot(profile);
    } else {
      if (!snapshotTimeout) useHistoryStore.getState().snapshot(profile);
      if (snapshotTimeout) clearTimeout(snapshotTimeout);
      snapshotTimeout = setTimeout(() => {
        snapshotTimeout = null;
      }, 1000);
    }

    set({ profile: profileData });
  },

  fetchProfile: async () => {
    useUIStore.getState().setLoading(true);
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();

      // Migration: Sanitize old object fields that are now single strings
      if (data.education) {
        data.education = data.education.map(
          (edu: Record<string, string | Record<string, string> | null>) => {
            const inst = edu.institution;
            return {
              ...edu,
              institution:
                typeof inst === 'object' && inst !== null ? inst.en || inst.es || '' : inst || '',
            };
          },
        );
      }
      if (data.languages) {
        data.languages = data.languages.map(
          (l: Record<string, string | Record<string, string> | null>) => {
            const lvl = l.level;
            return {
              ...l,
              level: typeof lvl === 'object' && lvl !== null ? lvl.en || lvl.es || '' : lvl || '',
            };
          },
        );
      }

      set((state) => ({
        profile: data,
        profileRevision: bumpRevision(state),
        lastSavedProfileJson: JSON.stringify(data),
        saveStatus: 'saved',
      }));
      useHistoryStore.getState().clear();
    } catch (error) {
      console.error('Failed to fetch profile', error);
      useUIStore.getState().addLog('ERROR: Failed to fetch profile');
    } finally {
      useUIStore.getState().setLoading(false);
    }
  },

  saveProfile: async () => {
    const { profile } = get();
    if (!profile) return false;

    set({ saveStatus: 'saving' });
    try {
      const response = await fetch('/api/save-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!response.ok) throw new Error('Save failed');
      useUIStore.getState().addLog('Profile saved');
      set({
        lastSavedProfileJson: JSON.stringify(profile),
        saveStatus: 'saved',
      });
      return true;
    } catch (error) {
      console.error('Failed to save profile', error);
      useUIStore.getState().addLog('ERROR: Save failed');
      set({ saveStatus: 'error' });
      return false;
    }
  },

  setSaveStatus: (saveStatus) => set({ saveStatus }),
  setLastSavedProfileJson: (lastSavedProfileJson) => set({ lastSavedProfileJson }),
}));
