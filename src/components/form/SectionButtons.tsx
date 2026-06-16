import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, LucideIcon, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type AddButtonProps = {
  onClick: () => void;
  label: string;
  className?: string;
  icon?: LucideIcon;
};

export const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  label,
  className,
  icon: Icon = Plus,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn('border-dashed transition-all duration-300 cursor-pointer', className)}
    >
      <Icon className="w-4 h-4 mr-2" /> {label}
    </Button>
  );
};

type RemoveButtonProps = {
  onClick: () => void;
  className?: string;
  icon?: LucideIcon;
};

export const RemoveButton: React.FC<RemoveButtonProps> = ({
  onClick,
  className,
  icon: Icon = Trash2,
}) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        'cursor-pointer h-8 w-8 text-primary opacity-100 transition-opacity',
        className,
      )}
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
};
