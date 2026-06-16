import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Plus, X, Search } from 'lucide-react';
import { SkillIcon } from '@/components/SkillIcon';
import type { SkillSelectorDropdownProps } from '@/types/ui/skill-selector';

export const SkillSelectorDropdown: React.FC<SkillSelectorDropdownProps> = ({
  isOpen,
  query,
  setQuery,
  setIsOpen,
  filteredSkills,
  onToggleSkill,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-0">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-md bg-background border border-secondary/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-2 p-3 border-b border-secondary/30">
          <Search className="h-4 w-4 text-muted-foreground/50 ml-2" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills to add..."
            className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-muted-foreground/50"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full text-muted-foreground/50 hover:text-foreground hover:bg-secondary/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {filteredSkills.length > 0 ? (
            <div className="space-y-1">
              {filteredSkills.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => onToggleSkill(skill.name)}
                  className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-orange-400/10 hover:text-orange-400 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <SkillIcon
                      icon={skill.icon}
                      svg={skill.svg}
                      className="h-5 w-5 text-muted-foreground/50 group-hover:text-orange-400 transition-colors"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold tracking-tight">{skill.name}</span>
                      <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-black">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-muted-foreground/30 group-hover:text-orange-400 group-hover:rotate-90 transition-all duration-300" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
              <p className="text-sm text-muted-foreground/60 font-medium italic">
                {query ? 'No matching skills found.' : 'No more skills available.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
