import dotenv from 'dotenv';
import type { EnvironmentVariables } from '@/types/environment/environmentVariables';

dotenv.config();

const portfolioPath = process.env.PORTFOLIO_PATH;
const downloadsPath = process.env.DOWNLOADS_PATH;
const gitCommitMessage = process.env.GIT_COMMIT_MESSAGE;
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

const gitHubRepoName = process.env.GIT_HUB_REPO_NAME;
const gitHubWorkflowName = process.env.GITHUB_WORKFLOW_NAME;

export const environment: EnvironmentVariables = {
  portfolioPath,
  downloadsPath,
  gitCommitMessage,
  cloudinaryCloudName,
  cloudinaryApiKey,
  cloudinaryApiSecret,
  gitHubRepoName,
  gitHubWorkflowName,
};
