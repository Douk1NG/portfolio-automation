import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/components/ui/button';

export const HeaderActionButton: React.FC<ButtonProps> = ({
  className,
  variant = 'ghost',
  size = 'sm',
  children,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'h-9 gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all rounded-lg',
        variant === 'ghost' && 'text-muted-foreground hover:bg-white/5 hover:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
