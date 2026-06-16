import path from 'node:path';
import fs from 'node:fs';
import { environment } from '@/configuration/environment';
import { runCommand } from './utils/command';

async function updateSecret() {
  const PORTFOLIO_PATH = environment.portfolioPath;

  if (!PORTFOLIO_PATH) {
    throw new Error('Missing required environment variable: PORTFOLIO_PATH');
  }

  const jsonPath = path.resolve(PORTFOLIO_PATH, 'exports', 'portfolio.json');
  console.log(`Updating secret PORTFOLIO_DATA from: ${jsonPath}`);

  if (!fs.existsSync(jsonPath)) {
    throw new Error(`File not found: ${jsonPath}`);
  }

  // 1. Update the secret
  const fileStream = fs.createReadStream(jsonPath);
  console.log('Running gh secret set PORTFOLIO_DATA...');
  await runCommand('gh secret set PORTFOLIO_DATA', PORTFOLIO_PATH, fileStream);
  console.log('Successfully updated PORTFOLIO_DATA secret.\n');
}

updateSecret().catch((error) => {
  console.error('Error updating secret:', error);
  process.exit(1);
});
