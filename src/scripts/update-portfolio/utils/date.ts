import type { Language } from '@/types/scripts/portfolio';

/**
 * Calculates human-readable duration between two dates in "MMM YYYY" format.
 */
export function calculateDuration(
  start: string,
  end: string,
  lang: Language,
): { short: string; long: string } {
  const monthsMap: Record<string, number> = {
    JAN: 0,
    ENE: 0,
    FEB: 1,
    MAR: 2,
    ABR: 3,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AGO: 7,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DIC: 11,
    DEC: 11,
  };

  const parseDate = (dateString: string) => {
    const [month, year] = dateString.toUpperCase().split(' ');
    const monthIndex = monthsMap[month.substring(0, 3)] ?? 0;
    return { month: monthIndex, year: parseInt(year) };
  };

  try {
    const startDate = parseDate(start);
    const endDate =
      end.toUpperCase() === 'PRESENT' || end.toUpperCase() === 'PRESENTE'
        ? { month: new Date().getMonth(), year: new Date().getFullYear() }
        : parseDate(end);

    const totalMonths =
      (endDate.year - startDate.year) * 12 + (endDate.month - startDate.month) + 1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (lang === 'en') {
      const yearStr = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
      const monthStr = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';
      const long = [yearStr, monthStr].filter(Boolean).join(' and ');
      const short = `${years > 0 ? `${years}y ` : ''}${months > 0 ? `${months}m` : ''}`.trim();
      return { short, long };
    } else {
      const yearStr = years > 0 ? `${years} año${years > 1 ? 's' : ''}` : '';
      const monthStr = months > 0 ? `${months} mes${months > 1 ? 'es' : ''}` : '';
      const long = [yearStr, monthStr].filter(Boolean).join(' y ');
      const short = `${years > 0 ? `${years}a ` : ''}${months > 0 ? `${months}m` : ''}`.trim();
      return { short, long };
    }
  } catch {
    return { short: '', long: '' };
  }
}
