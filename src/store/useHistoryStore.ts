import { create } from 'zustand';
import type { Profile } from '../types/profile';
import { useProfileStore } from './useProfileStore';
import { useUIStore } from './useUIStore';

const MAX_HISTORY = 50;

function isShallowEqualProfile(profileA: Profile, profileB: Profile): boolean {
  const keys = Object.keys(profileA) as ReadonlyArray<keyof Profile>;
  if (keys.length !== Object.keys(profileB).length) return false;
  return keys.every((key) => profileA[key] === profileB[key]);
}

export type HistoryStore = {
  undoStack: Profile[];
  redoStack: Profile[];
  snapshot: (currentProfile: Profile) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
};

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  undoStack: [],
  redoStack: [],

  snapshot: (currentProfile) => {
    const { undoStack } = get();
    const lastSnapshot = undoStack[undoStack.length - 1];

    if (lastSnapshot === currentProfile) return;
    if (lastSnapshot && isShallowEqualProfile(lastSnapshot, currentProfile)) return;

    set((state) => ({
      undoStack: [...state.undoStack.slice(-(MAX_HISTORY - 1)), currentProfile],
      redoStack: [],
    }));
  },

  undo: () => {
    const { undoStack } = get();
    const profileStore = useProfileStore.getState();
    const currentProfile = profileStore.profile;

    if (undoStack.length === 0 || !currentProfile) return;

    const previousProfile = undoStack[undoStack.length - 1];
    const newUndoStack = undoStack.slice(0, -1);

    set((state) => ({
      undoStack: newUndoStack,
      redoStack: [...state.redoStack.slice(-(MAX_HISTORY - 1)), currentProfile],
    }));

    profileStore.setProfile(previousProfile, true);
    useUIStore.getState().addLog('Undo action performed');
  },

  redo: () => {
    const { redoStack } = get();
    const profileStore = useProfileStore.getState();
    const currentProfile = profileStore.profile;

    if (redoStack.length === 0 || !currentProfile) return;

    const nextProfile = redoStack[redoStack.length - 1];
    const newRedoStack = redoStack.slice(0, -1);

    set((state) => ({
      undoStack: [...state.undoStack.slice(-(MAX_HISTORY - 1)), currentProfile],
      redoStack: newRedoStack,
    }));

    profileStore.setProfile(nextProfile, true);
    useUIStore.getState().addLog('Redo action performed');
  },

  clear: () => set({ undoStack: [], redoStack: [] }),

  canUndo: () => get().undoStack.length > 0,
  canRedo: () => get().redoStack.length > 0,
}));
