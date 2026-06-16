import type { Profile } from '@/types/profile';

export type HistoryState = {
  undoStack: Profile[];
  redoStack: Profile[];
};

export type HistoryActions = {
  snapshot: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
};
