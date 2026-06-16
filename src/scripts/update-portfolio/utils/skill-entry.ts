import type { Skill } from '@/types/profile';
import type { SkillEntry, SvgIconName } from '@/types/scripts/portfolio';

/** Maps a profile skill to a portfolio gen entry (pass-through from profile data). */
export function profileSkillToEntry(skill: Skill): SkillEntry {
  const entry: SkillEntry = { name: skill.name };
  if (skill.svg) entry.svg = skill.svg as SvgIconName;
  if (skill.icon) entry.icon = skill.icon;
  return entry;
}

/**
 * Resolves experience/project skill name strings using the profile skills board.
 * No name guessing — only data stored on each profile skill.
 */
export function skillNamesToEntries(names: string[], profileSkills: Skill[]): SkillEntry[] {
  const byName = new Map(profileSkills.map((skill) => [skill.name, skill]));

  return names.map((name) => {
    const profileSkill = byName.get(name);
    return profileSkill ? profileSkillToEntry(profileSkill) : { name };
  });
}
