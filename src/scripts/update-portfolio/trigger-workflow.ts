import { environment } from '@/configuration/environment';
import { runCommand } from './utils/command';

async function triggerWorkflow() {
  const PORTFOLIO_PATH = environment.portfolioPath;
  const gitHubRepoName = environment.gitHubRepoName;
  const gitHubWorkflowName = environment.gitHubWorkflowName;

  if (!PORTFOLIO_PATH || !gitHubRepoName || !gitHubWorkflowName) {
    throw new Error(
      'Missing required environment variables: PORTFOLIO_PATH, GIT_HUB_REPO_NAME, GITHUB_WORKFLOW_NAME',
    );
  }

  try {
    console.log('Triggering deployment workflow...');
    await runCommand(
      `gh workflow run ${gitHubWorkflowName} --repo ${gitHubRepoName}`,
      PORTFOLIO_PATH,
    );
    console.log('Successfully triggered deployment workflow.');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Failed to trigger workflow:', errorMessage);
    throw error;
  }
}

triggerWorkflow().catch((error) => {
  console.error('Error triggering workflow:', error);
  process.exit(1);
});
