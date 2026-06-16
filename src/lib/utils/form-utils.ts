/**
 * Formats a field name into a human-readable label.
 * Handles camelCase and snake_case.
 *
 * @example
 * formatLabel('companyName') // 'Company Name'
 * formatLabel('job_title') // 'Job Title'
 * formatLabel('name') // 'Name'
 */
export const formatLabel = (name: string): string => {
  // Split by camelCase or underscore
  const words = name
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .trim()
    .split(/\s+/);

  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};
