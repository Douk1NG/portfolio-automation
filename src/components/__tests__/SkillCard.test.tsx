import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SkillChip } from '../sections/skills/SkillChip';
import type { Skill } from '@/types/profile';

const mockSkill: Skill = {
  id: '1',
  name: 'React',
  category: 'Frontend',
  icon: 'code-2',
};

const testAccentColor = 'hsl(265 89% 65%)';

describe('SkillChip Component', () => {
  it('renders skill name and action buttons', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <SkillChip
        skill={mockSkill}
        accentColor={testAccentColor}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByRole('button', { name: /Edit React/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Delete React/i })).toBeDefined();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <SkillChip
        skill={mockSkill}
        accentColor={testAccentColor}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Edit React/i }));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <SkillChip
        skill={mockSkill}
        accentColor={testAccentColor}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Delete React/i }));
    expect(onDelete).toHaveBeenCalledOnce();
  });
});
