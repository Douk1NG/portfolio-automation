import React from 'react';

interface SkillNameInputProps {
  name: string;
  setName: (name: string) => void;
}

export const SkillNameInput: React.FC<SkillNameInputProps> = ({ name, setName }) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="skill-name-input"
        className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60"
      >
        Skill Name
      </label>
      <input
        id="skill-name-input"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="e.g. React, Docker, Figma..."
        autoFocus
        className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-foreground
          placeholder:text-muted-foreground/30
          focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30
          transition-all"
      />
    </div>
  );
};
