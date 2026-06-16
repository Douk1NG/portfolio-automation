import fs from 'node:fs/promises';
import path from 'node:path';
import { PORTFOLIO_PATH } from '@/scripts/update-portfolio/constants/paths';
import { environment } from '@/configuration/environment';

type TFileNames = {
  es: string;
  en: string;
};
/**
 * Helper to write the private portfolio JSON file.
 */
export async function writePortfolioJson(filePath: string, data: Record<string, unknown>) {
  if (!PORTFOLIO_PATH) {
    throw new Error('PORTFOLIO_PATH is not defined. Please set it in your .env file.');
  }

  const absolutePath = path.resolve(PORTFOLIO_PATH, filePath);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Generated ${path.basename(filePath)}`);
}

/**
 * Copies CV PDFs from the local data directory to the portfolio public directory.
 */
export async function copyCVs(fileNames: TFileNames) {
  if (!PORTFOLIO_PATH) {
    throw new Error('PORTFOLIO_PATH is not defined. Please set it in your .env file.');
  }

  const downloadsPath = environment.downloadsPath;

  if (!downloadsPath) {
    throw new Error('DOWNLOADS_PATH is not defined. Please set it in your .env file.');
  }

  const CV_ES_PATH = path.resolve(downloadsPath, fileNames.es);
  const CV_EN_PATH = path.resolve(downloadsPath, fileNames.en);
  const TARGET_DIR = path.join(PORTFOLIO_PATH, 'public');

  try {
    await fs.copyFile(CV_ES_PATH, path.join(TARGET_DIR, fileNames.es));
    console.log(`✅ Copied ${fileNames.es} from ${downloadsPath}`);
  } catch (error) {
    console.warn(
      `⚠️ Could not copy ${fileNames.es}:`,
      error instanceof Error ? error.message : error,
    );
  }
  try {
    await fs.copyFile(CV_EN_PATH, path.join(TARGET_DIR, fileNames.en));
    console.log(`✅ Copied ${fileNames.en} from ${downloadsPath}`);
  } catch (error) {
    console.warn(
      `⚠️ Could not copy ${fileNames.en}:`,
      error instanceof Error ? error.message : error,
    );
  }
}
