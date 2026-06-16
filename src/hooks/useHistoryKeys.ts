import { useEffect } from 'react';
import { useHistoryStore } from '@/store/useHistoryStore';

/**
 * Custom hook to listen for Ctrl+Z and Ctrl+Y / Ctrl+Shift+Z
 * to trigger undo and redo actions in the Profile Store.
 */
export const useHistoryKeys = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isZ = event.key?.toLowerCase() === 'z';
      const isY = event.key?.toLowerCase() === 'y';
      const isCtrl = event.ctrlKey || event.metaKey;
      const isShift = event.shiftKey;

      const store = useHistoryStore.getState();

      if (isCtrl && isZ) {
        if (isShift) {
          if (store.canRedo()) {
            event.preventDefault();
            store.redo();
          }
        } else {
          if (store.canUndo()) {
            event.preventDefault();
            store.undo();
          }
        }
      } else if (isCtrl && isY) {
        if (store.canRedo()) {
          event.preventDefault();
          store.redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};
