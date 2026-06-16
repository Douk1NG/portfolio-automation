import { useState, useCallback } from 'react';
import type { Skill } from '@/types/profile';

type UseSkillCardProperties = {
  skill: Skill;
  onUpdate: (skill: Skill) => void;
};

export function useSkillCard({ skill, onUpdate }: UseSkillCardProperties) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(skill.name);
  const [editedCategory, setEditedCategory] = useState(skill.category);
  const [iconType, setIconType] = useState<'lucide' | 'svg'>(skill.svg ? 'svg' : 'lucide');
  const [iconValue, setIconValue] = useState(skill.svg || skill.icon || '');

  const handleEditStart = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
    setEditedName(skill.name);
    setEditedCategory(skill.category);
    setIconType(skill.svg ? 'svg' : 'lucide');
    setIconValue(skill.svg || skill.icon || '');
  }, [skill]);

  const handleEditSave = useCallback(() => {
    onUpdate({
      ...skill,
      name: editedName.trim(),
      category: editedCategory,
      icon: iconType === 'lucide' ? iconValue.trim() || undefined : undefined,
      svg: iconType === 'svg' ? iconValue.trim() || undefined : undefined,
    });
    setIsEditing(false);
  }, [skill, editedName, editedCategory, iconType, iconValue, onUpdate]);

  return {
    isEditing,
    editedName,
    setEditedName,
    editedCategory,
    setEditedCategory,
    iconType,
    setIconType,
    iconValue,
    setIconValue,
    handleEditStart,
    handleEditCancel,
    handleEditSave,
  };
}
