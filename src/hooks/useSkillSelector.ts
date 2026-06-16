import { useState } from 'react';
import { useStore, useField } from '@tanstack/react-form';
import type { ProfileFormApi, ProfilePath } from '@/types/form-types';
import type { ProfileSchemaType } from '@/types/profile-schema';
import type { Skill } from '@/types/profile';

type UseSkillSelectorProperties = {
  form: ProfileFormApi;
  name: ProfilePath;
};

export function useSkillSelector({ form, name }: UseSkillSelectorProperties) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const field = useField({ form, name });
  const selectedValues = (field.state.value as string[]) || [];

  const availableSkills = useStore(form.store, (state: { values: ProfileSchemaType }) => {
    const rawSkills = state.values.skills;
    if (!Array.isArray(rawSkills)) return [] as Skill[];
    return (rawSkills as Skill[]).filter((skill) => skill.name?.trim() !== '');
  });

  const filteredSkills = availableSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(query.toLowerCase()) &&
      !selectedValues.includes(skill.name),
  );

  const toggleSkill = (skillName: string) => {
    if (selectedValues.includes(skillName)) {
      field.handleChange(selectedValues.filter((value) => value !== skillName) as never);
    } else {
      field.handleChange([...selectedValues, skillName] as never);
    }
    setQuery('');
  };

  return {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    availableSkills,
    filteredSkills,
    toggleSkill,
    selectedValues,
  };
}
