import { useState, useCallback } from 'react';

type UseSkillsSectionActionsReturn = {
  isAddingCategory: boolean;
  newCategoryName: string;
  setNewCategoryName: (value: string) => void;
  startAddingCategory: () => void;
  cancelAddingCategory: () => void;
};

export function useSkillsSectionActions(): UseSkillsSectionActionsReturn {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const startAddingCategory = useCallback(() => {
    setIsAddingCategory(true);
    setNewCategoryName('');
  }, []);

  const cancelAddingCategory = useCallback(() => {
    setIsAddingCategory(false);
    setNewCategoryName('');
  }, []);

  return {
    isAddingCategory,
    newCategoryName,
    setNewCategoryName,
    startAddingCategory,
    cancelAddingCategory,
  };
}
