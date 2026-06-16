import { useState } from 'react';
import type { Skill } from '@/types/profile';

export function useSkillsSection() {
  const sectionPath = 'skills' as const;
  const [isAdding, setIsAdding] = useState(false);
  const [newSkillTitle, setNewSkillTitle] = useState('');
  const [newSkillIconType, setNewSkillIconType] = useState<'lucide' | 'svg'>('lucide');
  const [newSkillIconValue, setNewSkillIconValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Frontend Development');

  const handleAddSkill = (
    event: React.ChangeEvent<HTMLFormElement>,
    pushValue: (value: never) => void,
  ) => {
    event.preventDefault();
    if (newSkillTitle.trim()) {
      pushValue({
        id: crypto.randomUUID(),
        name: newSkillTitle.trim(),
        category: selectedCategory,
        icon: newSkillIconType === 'lucide' ? newSkillIconValue.trim() || undefined : undefined,
        svg: newSkillIconType === 'svg' ? newSkillIconValue.trim() || undefined : undefined,
      } as never);
      setNewSkillTitle('');
      setNewSkillIconValue('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsAdding(false);
      setNewSkillTitle('');
      setNewSkillIconValue('');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewSkillTitle('');
    setNewSkillIconValue('');
  };

  const handleDrop = (
    itemId: string,
    categoryId: string,
    allSkills: Skill[],
    setValue: (value: never) => void,
  ) => {
    const updatedSkills = allSkills.map((skill) =>
      skill.id === itemId ? { ...skill, category: categoryId } : skill,
    );
    setValue(updatedSkills as never);
  };

  return {
    sectionPath,
    isAdding,
    setIsAdding,
    newSkillTitle,
    setNewSkillTitle,
    newSkillIconType,
    setNewSkillIconType,
    newSkillIconValue,
    setNewSkillIconValue,
    selectedCategory,
    setSelectedCategory,
    handleAddSkill,
    handleKeyDown,
    handleCancel,
    handleDrop,
  };
}
