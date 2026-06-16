import { toast } from 'sonner';
import { useProfileStore } from '@/store/useProfileStore';
import { useHistoryStore } from '@/store/useHistoryStore';

export type RemoveWithUndoOptions = {
  label?: string;
  onRemove: () => void;
};

/**
 * Helper to remove an item from a form array with an Undo toast.
 * It takes a snapshot before removing, so the global Undo action
 * will restore the item.
 */
export const removeWithUndo = (options: RemoveWithUndoOptions) => {
  const { label = 'Item', onRemove } = options;
  const store = useProfileStore.getState();
  const historyStore = useHistoryStore.getState();

  // 1. Flush form edits, then snapshot so undo restores the correct state
  store.commitFormToStore();
  const profile = store.profile;
  if (profile) historyStore.snapshot(profile);

  // 2. Perform the removal
  onRemove();

  // 3. Show the toast with Undo action
  toast.success(`${label} removed`, {
    description: 'You can restore it using the button below or Ctrl+Z',
    action: {
      label: 'Undo',
      onClick: () => {
        historyStore.undo();
        toast.info(`${label} restored`);
      },
    },
    duration: 5000,
  });
};
