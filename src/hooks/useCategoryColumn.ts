import { useState } from 'react';

type UseCategoryColumnProps = {
  id: string;
  onDrop: (itemId: string, categoryId: string) => void;
};

export function useCategoryColumn({ id, onDrop }: UseCategoryColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const itemId = event.dataTransfer.getData('text/plain');
    if (itemId) {
      onDrop(itemId, id);
    }
  };

  return {
    isDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
