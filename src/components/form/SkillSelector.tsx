import React from 'react';
import type { SkillSelectorProps } from '@/types/ui/skill-selector';
import { useSkillSelector } from '@/hooks/useSkillSelector';
import { SkillSelectorTag } from './SkillSelectorTag';
import { SkillSelectorDropdown } from './SkillSelectorDropdown';
import { Button } from '@/components/ui/button';

export const SkillSelector: React.FC<SkillSelectorProps> = ({ form, name, label }) => {
  const {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    availableSkills,
    filteredSkills,
    toggleSkill,
    selectedValues,
  } = useSkillSelector({ form, name });

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 ml-1 truncate block">
        {label}
      </label>

      <div className="relative">
        <div className="min-h-12 w-full bg-secondary/10 border border-secondary/30 rounded-2xl p-2 flex flex-wrap gap-2 transition-all duration-300">
          {selectedValues.map((value) => {
            const skillData = availableSkills.find((s) => s.name === value);
            return (
              <SkillSelectorTag
                key={value}
                skillName={value}
                skillData={skillData}
                onRemove={toggleSkill}
              />
            );
          })}

          <Button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center min-w-25 flex-1 bg-transparent border-2 border-dashed border-secondary/50 rounded-xl hover:border-orange-400/50 hover:bg-orange-400/5 text-muted-foreground hover:text-orange-400 transition-all text-sm font-medium p-1.5"
          >
            {selectedValues.length === 0 ? 'Search skills to add...' : '+ Add more...'}
          </Button>
        </div>

        <SkillSelectorDropdown
          isOpen={isOpen}
          query={query}
          setQuery={setQuery}
          setIsOpen={setIsOpen}
          filteredSkills={filteredSkills}
          onToggleSkill={toggleSkill}
        />
      </div>
    </div>
  );
};
