import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SkillCard } from '../sections/skills/SkillCard';
import type { Skill } from '@/types/profile';

const mockSkill: Skill = {
  id: '1',
  name: 'React',
  category: 'Frontend',
  icon: 'code-2',
};

describe('SkillCard Component', () => {
  it('enters edit mode and saves new icon', () => {
    const onUpdate = vi.fn();
    render(<SkillCard skill={mockSkill} onDelete={vi.fn()} onUpdate={onUpdate} />);

    // Act - click edit (using aria-label from rendered output)
    fireEvent.click(screen.getByRole('button', { name: /Edit React/i }));

    // Expect edit fields
    expect(screen.getByDisplayValue('React')).toBeDefined();
    expect(screen.getByDisplayValue('code-2')).toBeDefined();

    // Act - change icon value
    fireEvent.change(screen.getByDisplayValue('code-2'), { target: { value: 'brain' } });

    // Act - save
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    // Assert
    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'React',
        icon: 'brain',
        svg: undefined,
      }),
    );
  });
});
