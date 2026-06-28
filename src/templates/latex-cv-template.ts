// src/services/latexCvTemplate.ts
// Builds a .tex string from your profile.json structure.
// Supports 'en' | 'es' — matches your existing i18n pattern.

import {
  type LocalizedString,
  type Profile,
  type Skill,
  type Langs,
  type CvGenerationOptions,
} from '@/types/profile';
// Escape special LaTeX characters
export const esc = (str: string): string =>
  str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');

const t = (s: LocalizedString, lang: Langs) => esc(s[lang]);

// Group skills by category (mirrors your existing skill structure)
export const groupSkills = (skills: Skill[]) => {
  const groupedSkills: Record<string, string[]> = {};
  for (const skill of skills) {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = [];
    }
    groupedSkills[skill.category].push(skill.name);
  }
  return groupedSkills;
};

export const buildCvTex = (
  profile: Profile,
  lang: Langs = 'en',
  options?: CvGenerationOptions,
): string => {
  const opts = options || {
    includeBio: true,
    includeExperience: true,
    includeEducation: true,
    includeSkills: true,
    includeLanguages: true,
    includeProjects: true,
    includeLinkedin: true,
    includeGithub: true,
    includePortfolio: true,
  };

  const skillGroups = groupSkills(profile.skills);

  const skillsSection = Object.entries(skillGroups)
    .map(
      ([category, names]) =>
        `\\textbf{\\color{EmphasisColor}${esc(category)}:}\\
      ${names
        .map((n) => {
          if (n === names[names.length - 1]) {
            return `\\textbf{${esc(n)}}`;
          }
          return `\\textbf{${esc(n)} }, `;
        })
        .join('')}`,
    )
    .join('\n\n    \\vspace{1pt}\n    ');

  const experienceSection = profile.experience
    .map(
      (exp) => `
    \\noindent{\\large\\color{EmphasisColor} ${t(exp.role, lang)}} \\hfill ${esc(exp.start)} -- ${esc(exp.end)} \\\\
    \\textbf{\\color{SecondaryColor} ${esc(exp.company)}} \\hfill ${t(exp.location, lang)} \\\\[2pt]
    ${t(exp.description, lang)}
    \\vspace{4pt}`,
    )
    .join('\n');

  const educationSection = profile.education
  .map(
    (edu) => `
    \\noindent{\\large\\color{EmphasisColor} ${t(edu.degree, lang)}} \\hfill ${esc(edu.start)} -- ${esc(edu.end)} \\\\
    \\textbf{\\color{SecondaryColor} ${esc(edu.institution.trim())}}
    \\vspace{2pt}`,
  )
  .join('\n');

  const projectsSection = profile.projects
    .map(
      (proj) => {
        const pLinks = [];
        if (proj.url) pLinks.push(`\\href{${proj.url}}{DEMO}`);
        if (proj.repoUrl) pLinks.push(`\\href{${proj.repoUrl}}{REPO}`);
        const linkStr = pLinks.length ? ` \\hfill ${pLinks.join(' \\quad | \\quad ')}` : '';
        return `
    \\noindent{\\large\\color{EmphasisColor} ${t(proj.name, lang)}}${linkStr} \\\\
    \\textbf{\\color{SecondaryColor} ${t(proj.key_description, lang)}} \\\\[2pt]
    ${t(proj.description, lang)}
    \\vspace{2pt}`;
      }
    )
    .join('\n');

  const languagesLine = profile.languages
    .map((l) => `${t(l.name, lang)} (${esc(l.level)})`)
    .join(' \\quad ');

  const links = [];
  if (opts.includeLinkedin && profile.linkedin) links.push(`\\href{${profile.linkedin}}{LinkedIn}`);
  if (opts.includeGithub && profile.github) links.push(`\\href{${profile.github}}{GitHub}`);
  if (opts.includePortfolio && profile.portfolioUrl)
    links.push(`\\href{${profile.portfolioUrl}}{Portfolio}`);
  const linksLine = links.join(' \\quad | \\quad ');

  const bioBlock =
    opts.includeBio && profile.bio && profile.bio[lang]
      ? `\n% ── BIO ──────────────────────────────────────────────────────────────────────\n\\section{${lang === 'en' ? 'Profile' : 'Perfil'}}\n${t(profile.bio, lang)}\n`
      : '';

  const expBlock =
    opts.includeExperience && profile.experience && profile.experience.length > 0
      ? `\n% ── EXPERIENCE ───────────────────────────────────────────────────────────────\n\\section{${lang === 'en' ? 'Experience' : 'Experiencia'}}\n${experienceSection}\n`
      : '';

  const projBlock =
    opts.includeProjects && profile.projects && profile.projects.length > 0
      ? `\n% ── PROJECTS ─────────────────────────────────────────────────────────────────\n\\section{${lang === 'en' ? 'Projects' : 'Proyectos'}}\n${projectsSection}\n`
      : '';

  const skillsBlock =
    opts.includeSkills && profile.skills && profile.skills.length > 0
      ? `\n% ── SKILLS ───────────────────────────────────────────────────────────────────\n\\section{${lang === 'en' ? 'Skills' : 'Habilidades'}}\n${skillsSection}\n`
      : '';

  const eduBlock =
    opts.includeEducation && profile.education && profile.education.length > 0
      ? `\n% ── EDUCATION ────────────────────────────────────────────────────────────────\n\\section{${lang === 'en' ? 'Education' : 'Educación'}}\n${educationSection}\n`
      : '';

  const langBlock =
    opts.includeLanguages && profile.languages && profile.languages.length > 0
      ? `\n% ── LANGUAGES ────────────────────────────────────────────────────────────────\n\\section{${lang === 'en' ? 'Languages' : 'Idiomas'}}\n${languagesLine}\n`
      : '';

  return `\\documentclass[12pt, a4paper]{article}
\\usepackage[top=1.2cm, bottom=1.2cm, left=1.5cm, right=1.5cm]{geometry}
\\usepackage{hyperref}
\\usepackage{parskip}
\\usepackage{enumitem}
\\usepackage{cmap}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\input{glyphtounicode}
\\pdfgentounicode=1
\\usepackage{xcolor}
\\usepackage{tikz}

\\newcommand{\\cvtag}[1]{%
  \\tikz[baseline]\\node[anchor=base,draw=BodyColor!30,rounded corners,inner xsep=1ex,inner ysep =0.75ex,text height=1.5ex,text depth=.25ex]{#1};
}

\\usepackage[rm]{roboto}
\\usepackage[defaultsans]{lato}
\\renewcommand{\\familydefault}{\\sfdefault}

\\definecolor{PrimaryColor}{HTML}{438797}
\\definecolor{SecondaryColor}{HTML}{59A9B5}
\\definecolor{ThirdColor}{HTML}{438797}
\\definecolor{BodyColor}{HTML}{666666}
\\definecolor{EmphasisColor}{HTML}{2E2E2E}
\\definecolor{BackgroundColor}{HTML}{FFFFFA}

\\pagecolor{BackgroundColor}

% Section styling
\\usepackage{titlesec}
\\titleformat{\\section}{\\LARGE\\rmfamily\\bfseries\\color{PrimaryColor}}{}{0em}{}[\\color{ThirdColor}\\titlerule]
\\titlespacing{\\section}{0pt}{6pt}{3pt}

\\hypersetup{
  colorlinks=true,
  urlcolor=PrimaryColor,
  linkcolor=PrimaryColor
}

\\pagestyle{empty}

\\begin{document}
\\color{BodyColor}

% ── HEADER ───────────────────────────────────────────────────────────────────
\\begin{center}
  {\\Huge\\rmfamily\\bfseries\\color{PrimaryColor} ${esc(profile.name)} ${esc(profile.surname)}} \\\\[4pt]
  {\\large\\bfseries\\color{PrimaryColor} ${t(profile.title, lang)}} \\\\[4pt]
  {\\small\\bfseries
  \\href{mailto:${esc(profile.email)}}{${esc(profile.email)}} \\quad | \\quad
  \\href{tel:${esc(profile.phone).replace(/\s/g, '')}}{${esc(profile.phone)}} \\quad | \\quad
  ${t(profile.location, lang)} \\\\[2pt]
  ${linksLine}
  }
\\end{center}
${bioBlock}${skillsBlock}${expBlock}${projBlock}${eduBlock}${langBlock}
\\end{document}
`;
};
