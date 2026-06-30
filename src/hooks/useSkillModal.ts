import { useState, useCallback } from 'react';
import type { Skill } from '@/types/profile';
import type { SkillModalMode } from '@/types/ui/skills-section';

type UseSkillModalReturn = {
  isOpen: boolean;
  mode: SkillModalMode;
  editingSkill: Skill | null;
  preselectedCategory: string;
  openAddModal: (category: string) => void;
  openEditModal: (skill: Skill) => void;
  closeModal: () => void;
};

export function useSkillModal(): UseSkillModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<SkillModalMode>('add');
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [preselectedCategory, setPreselectedCategory] = useState('');

  const openAddModal = useCallback((category: string) => {
    setMode('add');
    setEditingSkill(null);
    setPreselectedCategory(category);
    setIsOpen(true);
  }, []);

  const openEditModal = useCallback((skill: Skill) => {
    setMode('edit');
    setEditingSkill(skill);
    setPreselectedCategory(skill.category);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setEditingSkill(null);
    setPreselectedCategory('');
  }, []);

  return {
    isOpen,
    mode,
    editingSkill,
    preselectedCategory,
    openAddModal,
    openEditModal,
    closeModal,
  };
}
