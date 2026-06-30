import { useState, useCallback } from 'react';
import type { Skill } from '@/types/profile';
import type { SkillModalMode } from '@/types/ui/skills-section';

type SkillModalState = {
  isOpen: boolean;
  mode: SkillModalMode;
  editingSkill: Skill | null;
  preselectedCategory: string;
};

type UseSkillModalReturn = {
  isOpen: boolean;
  mode: SkillModalMode;
  editingSkill: Skill | null;
  preselectedCategory: string;
  openAddModal: (category: string) => void;
  openEditModal: (skill: Skill) => void;
  closeModal: () => void;
};

const CLOSED_MODAL_STATE: SkillModalState = {
  isOpen: false,
  mode: 'add',
  editingSkill: null,
  preselectedCategory: '',
};

export function useSkillModal(): UseSkillModalReturn {
  const [modalState, setModalState] = useState<SkillModalState>(CLOSED_MODAL_STATE);

  const openAddModal = useCallback((category: string) => {
    setModalState({
      isOpen: true,
      mode: 'add',
      editingSkill: null,
      preselectedCategory: category,
    });
  }, []);

  const openEditModal = useCallback((skill: Skill) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      editingSkill: skill,
      preselectedCategory: skill.category,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(CLOSED_MODAL_STATE);
  }, []);

  return {
    ...modalState,
    openAddModal,
    openEditModal,
    closeModal,
  };
}
