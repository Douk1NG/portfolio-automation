import React from 'react';
import type { SkillCardProps } from '@/types/ui/skills-section';
import { useSkillCard } from '@/hooks/useSkillCard';
import { SkillCardEdit } from './SkillCardEdit';
import { SkillCardDisplay } from './SkillCardDisplay';

export const SkillCard: React.FC<SkillCardProps> = ({ skill, onDelete, onUpdate }) => {
  const {
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
  } = useSkillCard({ skill, onUpdate });

  if (isEditing) {
    return (
      <SkillCardEdit
        editedName={editedName}
        setEditedName={setEditedName}
        editedCategory={editedCategory}
        setEditedCategory={setEditedCategory}
        iconType={iconType}
        setIconType={setIconType}
        iconValue={iconValue}
        setIconValue={setIconValue}
        onCancel={handleEditCancel}
        onSave={handleEditSave}
      />
    );
  }

  return <SkillCardDisplay skill={skill} onEditStart={handleEditStart} onDelete={onDelete} />;
};
