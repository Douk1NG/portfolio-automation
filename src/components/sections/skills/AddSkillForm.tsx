import React from 'react';
import type { AddSkillFormProps } from '@/types/ui/skills-section';
import { subcategories } from './constant/skills-constants';

export const AddSkillForm: React.FC<AddSkillFormProps> = ({
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
  pushValue,
}) => {
  return (
    <form
      onSubmit={(e) => handleAddSkill(e, pushValue)}
      className="flex flex-col md:items-center gap-2"
    >
      <input
        type="text"
        value={newSkillTitle}
        onChange={(event) => setNewSkillTitle(event.target.value)}
        placeholder="Skill name..."
        autoFocus
        className="w-48 rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        onKeyDown={handleKeyDown}
      />
      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
        className="w-48 rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {subcategories.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.label}
          </option>
        ))}
      </select>
      <select
        value={newSkillIconType}
        onChange={(event) => setNewSkillIconType(event.target.value as 'lucide' | 'svg')}
        className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="lucide">Lucide</option>
        <option value="svg">SVG</option>
      </select>
      <input
        type="text"
        value={newSkillIconValue}
        onChange={(event) => setNewSkillIconValue(event.target.value)}
        placeholder={newSkillIconType === 'lucide' ? 'Lucide icon name...' : 'SVG string code...'}
        className="w-40 rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        onKeyDown={handleKeyDown}
      />

      <button
        type="submit"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Add
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        Cancel
      </button>
    </form>
  );
};
