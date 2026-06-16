import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { calculateDuration } from '@/scripts/update-portfolio/utils/date';
import {
  profileSkillToEntry,
  skillNamesToEntries,
} from '@/scripts/update-portfolio/utils/skill-entry';

// Freeze time so "PRESENT" calculations are deterministic across test runs.
// We pick a specific date: April 2026 (month index 3, year 2026).
const FIXED_DATE = new Date(2026, 3, 1); // April 1, 2026

const profileSkills = [
  { id: '1', name: 'React', category: 'Frontend Development', svg: 'React' },
  { id: '2', name: 'Problem Solving', category: 'Soft Skills', icon: 'brain' },
  { id: '3', name: 'Communication', category: 'Soft Skills', icon: 'message-square' },
];

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(FIXED_DATE);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('calculateDuration', () => {
  describe('English', () => {
    it('calculates years and months correctly', () => {
      const result = calculateDuration('JAN 2022', 'DEC 2023', 'en');
      // Jan 2022 -> Dec 2023 = 24 months = 2 years
      expect(result.long).toBe('2 years');
      expect(result.short).toBe('2y');
    });

    it('calculates a period under 1 year', () => {
      const result = calculateDuration('JAN 2023', 'JUN 2023', 'en');
      // 6 months
      expect(result.long).toBe('6 months');
      expect(result.short).toBe('6m');
    });

    it('reports 1 year and 1 month without pluralisation', () => {
      const result = calculateDuration('JAN 2022', 'FEB 2023', 'en');
      // Jan 2022 -> Feb 2023 = 14 months = 1 year 2 months
      expect(result.long).toBe('1 year and 2 months');
      expect(result.short).toBe('1y 2m');
    });

    it('recognises PRESENT as the current month (April 2026)', () => {
      const result = calculateDuration('APR 2025', 'PRESENT', 'en');
      // Apr 2025 -> Apr 2026 = 13 months = 1 year 1 month
      expect(result.long).toBe('1 year and 1 month');
      expect(result.short).toBe('1y 1m');
    });

    it('handles same start and end month as 1 month', () => {
      const result = calculateDuration('MAR 2023', 'MAR 2023', 'en');
      expect(result.long).toBe('1 month');
      expect(result.short).toBe('1m');
    });

    it('returns empty strings for bad input', () => {
      const result = calculateDuration('', '', 'en');
      expect(result).toEqual({ short: '', long: '' });
    });
  });

  describe('Spanish', () => {
    it('uses Spanish labels for years and months', () => {
      const result = calculateDuration('ENE 2022', 'DIC 2023', 'es');
      expect(result.long).toBe('2 años');
      expect(result.short).toBe('2a');
    });

    it('uses singular for 1 year and 1 mes', () => {
      const result = calculateDuration('ENE 2022', 'FEB 2023', 'es');
      expect(result.long).toBe('1 año y 2 meses');
      expect(result.short).toBe('1a 2m');
    });

    it('recognises PRESENTE as the current month', () => {
      const result = calculateDuration('ABR 2025', 'PRESENTE', 'es');
      expect(result.long).toBe('1 año y 1 mes');
      expect(result.short).toBe('1a 1m');
    });
  });
});

describe('profileSkillToEntry', () => {
  it('passes through icon and svg from profile', () => {
    expect(
      profileSkillToEntry({
        id: '1',
        name: 'Problem Solving',
        category: 'Soft Skills',
        icon: 'brain',
      }),
    ).toEqual({ name: 'Problem Solving', icon: 'brain' });

    expect(
      profileSkillToEntry({
        id: '2',
        name: 'React',
        category: 'Frontend Development',
        svg: 'React',
      }),
    ).toEqual({ name: 'React', svg: 'React' });
  });

  it('does not add a fallback icon when profile has none', () => {
    expect(
      profileSkillToEntry({
        id: '3',
        name: 'Unknown',
        category: 'Other',
      }),
    ).toEqual({ name: 'Unknown' });
  });
});

describe('skillNamesToEntries', () => {
  it('resolves experience skill names from the profile skills board', () => {
    const result = skillNamesToEntries(
      ['React', 'Problem Solving', 'Communication'],
      profileSkills,
    );

    expect(result[0]).toEqual({ name: 'React', svg: 'React' });
    expect(result[1]).toEqual({ name: 'Problem Solving', icon: 'brain' });
    expect(result[2]).toEqual({ name: 'Communication', icon: 'message-square' });
    expect(result).not.toContainEqual({ name: 'Problem Solving', icon: 'code' });
  });

  it('returns name-only entries for skills not on the profile board', () => {
    expect(skillNamesToEntries(['Legacy Tool'], profileSkills)).toEqual([{ name: 'Legacy Tool' }]);
  });
});
