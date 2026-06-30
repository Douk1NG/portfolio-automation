import React from 'react';
import type { CategoryEditorProps } from '@/types/ui/skills-section';
import { useCategoryEditorInput } from '@/hooks/useCategoryEditorInput';

export const CategoryEditor: React.FC<CategoryEditorProps> = ({
  categoryName,
  onConfirm,
  onCancel,
}) => {
  const { inputReference, handleKeyDown, handleBlur } = useCategoryEditorInput({
    onConfirm,
    onCancel,
  });

  return (
    <input
      ref={inputReference}
      defaultValue={categoryName}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className="bg-transparent border-b border-white/20 focus:border-primary outline-none
        text-sm font-bold uppercase tracking-widest text-foreground/80
        px-1 py-0.5 w-48 transition-colors"
      aria-label="Category name"
    />
  );
};
