import { v2 as cloudinary } from 'cloudinary';
import { environment } from '@/configuration/environment';
import type { CloudProvider } from './types';

export class CloudinaryProvider implements CloudProvider {
  constructor() {
    if (
      !environment.cloudinaryCloudName ||
      !environment.cloudinaryApiKey ||
      !environment.cloudinaryApiSecret
    ) {
      throw new Error('Cloudinary credentials are not properly configured.');
    }

    cloudinary.config({
      cloud_name: environment.cloudinaryCloudName,
      api_key: environment.cloudinaryApiKey,
      api_secret: environment.cloudinaryApiSecret,
    });
  }

  async uploadCV(filePath: string, publicId: string): Promise<string> {
    console.log(`\n📤 [Cloudinary] Uploading ${filePath} as ${publicId}...`);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        resource_type: 'raw',
        overwrite: true,
      });

      console.log(`✅ [Cloudinary] Uploaded successfully! URL: ${result.secure_url}`);
      return result.secure_url;
    } catch (error) {
      console.error(`❌ [Cloudinary] Failed to upload ${publicId}:`, error);
      throw error;
    }
  }
}
