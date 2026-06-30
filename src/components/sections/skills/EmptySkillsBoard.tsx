import React from 'react';
import { Code2 } from 'lucide-react';

export const EmptySkillsBoard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="p-4 rounded-2xl bg-white/3 border border-white/6">
        <Code2 className="h-8 w-8 text-muted-foreground/30" />
      </div>
      <p className="text-sm text-muted-foreground/50 font-medium">
        No skills yet. Add a category or skill to get started.
      </p>
    </div>
  );
};
