import path from 'node:path';
import { environment } from '@/configuration/environment';

export const PORTFOLIO_PATH = environment.portfolioPath;

export const PROFILE_JSON_PATH = path.resolve(process.cwd(), 'src/data/profile.json');
