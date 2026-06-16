import React from 'react';
import { LucideIcon } from 'lucide-react';

type SectionEmptyStateProps = {
  icon: LucideIcon;
  message: string;
};

export const SectionEmptyState: React.FC<SectionEmptyStateProps> = ({ icon: Icon, message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-secondary rounded-lg bg-secondary/5 animate-in fade-in zoom-in-95 duration-500">
      <Icon className="w-12 h-12 text-secondary mb-4 opacity-20" />
      <p className="text-muted-foreground text-sm italic">{message}</p>
    </div>
  );
};
