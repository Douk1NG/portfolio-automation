import simpleGit from 'simple-git';
import path from 'node:path';
import { environment } from '@/configuration/environment';

async function gitPush() {
  const GIT_COMMIT_MESSAGE = environment.gitCommitMessage;
  const PORTFOLIO_PATH = environment.portfolioPath;

  console.log(`Syncing portfolio changes: ${PORTFOLIO_PATH}`);

  if (!PORTFOLIO_PATH || !GIT_COMMIT_MESSAGE) {
    throw new Error('Missing required environment variables');
  }

  try {
    const git = simpleGit(path.resolve(process.cwd(), PORTFOLIO_PATH));

    // 1. Git add
    console.log('Adding files...');
    await git.add('-A');

    // 2. Git commit
    console.log(`Commiting changes with message: ${GIT_COMMIT_MESSAGE}`);
    await git.commit(GIT_COMMIT_MESSAGE);

    // 3. Git push
    console.log('Pushing changes...');
    await git.push();

    console.log('Successfully pushed portfolio changes');
  } catch (error) {
    console.error('Error with Git sync:', error);
    process.exit(1);
  }
}

gitPush();
