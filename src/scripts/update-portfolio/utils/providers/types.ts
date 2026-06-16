export interface CloudProvider {
  uploadCV(filePath: string, publicId: string): Promise<string>;
}
