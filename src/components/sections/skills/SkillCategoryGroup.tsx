import React from 'react';
import type { SkillCategoryGroupProps } from '@/types/ui/skills-section';
import { SkillChip } from './SkillChip';
import { SkillCategoryHeader } from './SkillCategoryHeader';
import { SkillCategoryEmptyState } from './SkillCategoryEmptyState';

const SkillCategoryGroupContent: React.FC<SkillCategoryGroupProps> = ({
  categoryName,
  skills,
  accentColor,
  onAddSkill,
  onEditSkill,
  onDeleteSkill,
  onRenameCategory,
  onDeleteCategory,
}) => {
  const skillCount = skills.length;

  return (
    <div className="group/category animate-in fade-in slide-in-from-bottom-2 duration-500">
      <SkillCategoryHeader
        categoryName={categoryName}
        skillCount={skillCount}
        accentColor={accentColor}
        onAddSkill={onAddSkill}
        onRenameCategory={onRenameCategory}
        onDeleteCategory={onDeleteCategory}
      />

      <div
        className="relative rounded-xl border border-white/5 bg-white/2 p-3"
        style={{ borderTopColor: accentColor, borderTopWidth: '1px' }}
      >
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillChip
              key={skill.id}
              skill={skill}
              accentColor={accentColor}
              onEdit={() => onEditSkill(skill)}
              onDelete={() => onDeleteSkill(skill)}
            />
          ))}

          {skillCount === 0 && <SkillCategoryEmptyState onAddSkill={onAddSkill} />}
        </div>
      </div>
    </div>
  );
};

export const SkillCategoryGroup = React.memo(SkillCategoryGroupContent);
