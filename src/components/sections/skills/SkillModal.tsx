import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { SkillModalProps } from '@/types/ui/skills-section';
import { SkillModalFormContent } from './SkillModalFormContent';

export const SkillModal: React.FC<SkillModalProps> = ({
  isOpen,
  mode,
  categories,
  initialSkill,
  preselectedCategory,
  onSave,
  onClose,
}) => {
  if (!isOpen) return null;

  const modalTitle = mode === 'add' ? 'Add Skill' : 'Edit Skill';

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-0">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-card/95 backdrop-blur-xl border border-white/8 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-white/6">
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            {modalTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-muted-foreground/50 hover:text-foreground hover:bg-white/6 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <SkillModalFormContent
          mode={mode}
          categories={categories}
          initialSkill={initialSkill}
          preselectedCategory={preselectedCategory}
          onSave={onSave}
          onClose={onClose}
        />
      </div>
    </div>,
    document.body,
  );
};
