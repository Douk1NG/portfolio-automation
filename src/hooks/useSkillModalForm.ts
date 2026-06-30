import { useState, useEffect, useCallback } from 'react';
import type { Skill } from '@/types/profile';
import type { SkillModalMode } from '@/types/ui/skills-section';

type UseSkillModalFormProperties = {
  mode: SkillModalMode;
  initialSkill: Skill | null;
  preselectedCategory: string;
  onSave: (skill: Skill) => void;
  onClose: () => void;
};

type UseSkillModalFormReturn = {
  name: string;
  setName: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  iconType: 'lucide' | 'svg';
  setIconType: (value: 'lucide' | 'svg') => void;
  iconValue: string;
  setIconValue: (value: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
};

export function useSkillModalForm({
  mode,
  initialSkill,
  preselectedCategory,
  onSave,
  onClose,
}: UseSkillModalFormProperties): UseSkillModalFormReturn {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [iconType, setIconType] = useState<'lucide' | 'svg'>('lucide');
  const [iconValue, setIconValue] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialSkill) {
      setName(initialSkill.name);
      setCategory(initialSkill.category);
      const resolvedIconType = initialSkill.svg ? 'svg' : 'lucide';
      setIconType(resolvedIconType);
      setIconValue(initialSkill.svg ?? initialSkill.icon ?? '');
    } else {
      setName('');
      setCategory(preselectedCategory);
      setIconType('lucide');
      setIconValue('');
    }
  }, [mode, initialSkill, preselectedCategory]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const trimmedName = name.trim();
      if (trimmedName === '') return;

      const skillId = mode === 'edit' && initialSkill ? initialSkill.id : crypto.randomUUID();
      const trimmedIconValue = iconValue.trim();

      const savedSkill: Skill = {
        id: skillId,
        name: trimmedName,
        category,
        icon: iconType === 'lucide' && trimmedIconValue ? trimmedIconValue : undefined,
        svg: iconType === 'svg' && trimmedIconValue ? trimmedIconValue : undefined,
      };

      onSave(savedSkill);
      onClose();
    },
    [name, category, iconType, iconValue, mode, initialSkill, onSave, onClose],
  );

  return {
    name,
    setName,
    category,
    setCategory,
    iconType,
    setIconType,
    iconValue,
    setIconValue,
    handleSubmit,
  };
}
