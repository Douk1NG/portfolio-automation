import { useRef, useEffect, useCallback } from 'react';
import type { KeyboardEvent } from 'react';

type UseCategoryEditorInputProps = {
  onConfirm: (newName: string) => void;
  onCancel: () => void;
}

export function useCategoryEditorInput({ onConfirm, onCancel }: UseCategoryEditorInputProps) {
  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputReference.current) {
      inputReference.current.focus();
      inputReference.current.select();
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const newValue = inputReference.current?.value ?? '';
        onConfirm(newValue);
      }
      if (event.key === 'Escape') {
        onCancel();
      }
    },
    [onConfirm, onCancel],
  );

  const handleBlur = useCallback(() => {
    const newValue = inputReference.current?.value ?? '';
    onConfirm(newValue);
  }, [onConfirm]);

  return {
    inputReference,
    handleKeyDown,
    handleBlur,
  };
}
