import React from 'react';

interface SkillCategorySelectProps {
  category: string;
  setCategory: (category: string) => void;
  categories: readonly string[];
}

export const SkillCategorySelect: React.FC<SkillCategorySelectProps> = ({
  category,
  setCategory,
  categories,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="skill-category-select"
        className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60"
      >
        Category
      </label>
      <select
        id="skill-category-select"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="w-full rounded-xl border border-white/8 bg-input px-4 py-3 text-sm text-foreground
          focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30
          transition-all"
      >
        {categories.map((categoryOption) => (
          <option key={categoryOption} value={categoryOption} className="bg-card text-foreground">
            {categoryOption}
          </option>
        ))}
      </select>
    </div>
  );
};
