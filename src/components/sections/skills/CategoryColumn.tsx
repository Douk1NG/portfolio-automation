import React from 'react';
import { useCategoryColumn } from '@/hooks/useCategoryColumn';
import type { CategoryColumnProps } from '@/types/ui/skills-section';

export const CategoryColumn: React.FC<CategoryColumnProps> = ({
  id,
  title,
  icon,
  children,
  onDrop,
}) => {
  const { isDragOver, handleDragOver, handleDragLeave, handleDrop } = useCategoryColumn({
    id,
    onDrop,
  });

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex min-h-100 flex-col rounded-xl border bg-card p-4 transition-all ${
        isDragOver ? 'border-accent ring-2 ring-accent/20' : 'border-border'
      }`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        {children}

        {isDragOver && (
          <div className="rounded-lg border-2 border-dashed border-accent bg-accent/5 p-4 text-center">
            <p className="text-sm text-accent">Drop here</p>
          </div>
        )}
      </div>
    </div>
  );
};
