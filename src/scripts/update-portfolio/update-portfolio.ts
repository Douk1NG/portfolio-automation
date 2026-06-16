import fs from 'node:fs/promises';
import type { Profile } from '@/types/profile';

import { PORTFOLIO_PATH, PROFILE_JSON_PATH } from '@/scripts/update-portfolio/constants/paths';

import { copyCVs, writePortfolioJson } from '@/scripts/update-portfolio/utils/file';
import { mapProfileToPortfolioData } from '@/scripts/update-portfolio/utils/portfolio-mapper';

/**
 * Orchestrates the portfolio update process by reading profile data
 * and mapping it directly to the target JSON schema.
 */
async function updatePortfolio() {
  console.log(`🔄 Starting portfolio update using JSON Data Pattern at: ${PORTFOLIO_PATH}`);

  try {
    const profileContent = await fs.readFile(PROFILE_JSON_PATH, 'utf-8');
    const profile = JSON.parse(profileContent) as Profile;

    const nameToLowerCase = profile.name.toLowerCase();
    const fileNames = {
      es: `cv-${nameToLowerCase}-es.pdf`,
      en: `cv-${nameToLowerCase}-en.pdf`,
    };

    // Upload to Cloud Provider
    let cvUrls: { es: string; en: string } | undefined;
    try {
      const { getCloudProvider } = await import('@/scripts/update-portfolio/utils/providers');
      const { environment } = await import('@/configuration/environment');
      const path = await import('node:path');

      const provider = await getCloudProvider();

      if (provider && environment.downloadsPath) {
        const esUrl = await provider.uploadCV(
          path.resolve(environment.downloadsPath, fileNames.es),
          `cv-${nameToLowerCase}-es`,
        );
        const enUrl = await provider.uploadCV(
          path.resolve(environment.downloadsPath, fileNames.en),
          `cv-${nameToLowerCase}-en`,
        );
        cvUrls = { es: esUrl, en: enUrl };
      }
    } catch (error) {
      console.warn(
        '⚠️ Skipping cloud upload, using local CV paths instead.',
        error instanceof Error ? error.message : error,
      );
    }

    // Map profile to portfolio JSON schema
    const portfolioData = mapProfileToPortfolioData(profile, cvUrls);

    // Write to portfolio.private.json
    await writePortfolioJson('data/portfolio.private.json', portfolioData);

    // Copy assets
    await copyCVs(fileNames);

    // Run resolve-portfolio script from the target portfolio project
    console.log(`🔄 Resolving portfolio data in ${PORTFOLIO_PATH}...`);
    const { exec } = await import('node:child_process');
    const { promisify } = await import('node:util');
    const execAsync = promisify(exec);

    // Execute the resolve-portfolio script
    const { stdout, stderr } = await execAsync('npm run resolve-portfolio', {
      cwd: PORTFOLIO_PATH,
    });
    if (stdout) console.log(stdout.trim());
    if (stderr) console.error(stderr.trim());

    // Execute the export file script
    console.log(`🔄 Exporting portfolio data in ${PORTFOLIO_PATH}...`);
    const { stdout: exportStdout, stderr: exportStderr } = await execAsync(
      'npm run export-portfolio',
      {
        cwd: PORTFOLIO_PATH,
      },
    );
    if (exportStdout) console.log(exportStdout.trim());
    if (exportStderr) console.error(exportStderr.trim());

    console.log('✨ Portfolio synchronization (JSON Data) complete!');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Error updating portfolio:', message);
    process.exit(1);
  }
}

updatePortfolio();
