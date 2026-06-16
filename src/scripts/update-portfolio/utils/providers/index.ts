import { environment } from '@/configuration/environment';
import type { CloudProvider } from './types';

export async function getCloudProvider(): Promise<CloudProvider | null> {
  // Auto-detect Cloudinary
  if (environment.cloudinaryApiKey && environment.cloudinaryApiSecret) {
    const { CloudinaryProvider } = await import('./cloudinary');
    return new CloudinaryProvider();
  }

  // Auto-detect future providers here:
  // if (environment.awsAccessKeyId && environment.awsSecretAccessKey) { ... }

  console.log(`ℹ️ No active cloud provider credentials detected. Skipping cloud upload.`);
  return null;
}
