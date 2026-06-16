import React from 'react';
import type { SkillCardEditProps } from '@/types/ui/skills-section';
import { subcategories } from './constant/skills-constants';

export const SkillCardEdit: React.FC<SkillCardEditProps> = ({
  editedName,
  setEditedName,
  editedCategory,
  setEditedCategory,
  iconType,
  setIconType,
  iconValue,
  setIconValue,
  onCancel,
  onSave,
}) => {
  return (
    <div className="group flex flex-col gap-2 rounded-lg border border-border bg-secondary/50 p-3 shadow-sm">
      <input
        value={editedName}
        onChange={(event) => setEditedName(event.target.value)}
        placeholder="Skill name"
        className="w-full rounded-md border border-border bg-input px-2.5 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        autoFocus
      />
      <select
        value={editedCategory}
        onChange={(event) => setEditedCategory(event.target.value)}
        className="w-full rounded-md border border-border bg-input px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">No subcategory...</option>
        {subcategories.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.label}
          </option>
        ))}
      </select>
      <div className="flex gap-2 flex-col">
        <select
          value={iconType}
          onChange={(event) => {
            setIconType(event.target.value as 'lucide' | 'svg');
            setIconValue('');
          }}
          aria-label="Icon type"
          className="rounded-md border border-border bg-input px-2 py-1 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="lucide">Lucide</option>
          <option value="svg">SVG Icon</option>
        </select>
        <input
          value={iconValue}
          onChange={(event) => setIconValue(event.target.value)}
          placeholder={iconType === 'lucide' ? 'Lucide icon name...' : 'SVG string code...'}
          className="flex-1 rounded-md border border-border bg-input px-2.5 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="flex justify-end gap-2 mt-1">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-medium text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-secondary transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="text-xs font-medium text-primary hover:text-primary/80 px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};
