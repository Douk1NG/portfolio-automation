import { describe, it, expect } from 'vitest';
import { ProfileService } from '@/services/profile-service';
import { server } from '@root/vitest.setup';
import { http, HttpResponse } from 'msw';
import type { Profile } from '@/types/profile';

describe('ProfileService', () => {
  it('fetchProfile should return data on success', async () => {
    const { data, error } = await ProfileService.fetchProfile();
    expect(data).toBeDefined();
    expect(data?.name).toBe('Test ES');
    expect(error).toBeNull();
  });

  it('fetchProfile should return error on failure', async () => {
    server.use(
      http.get('/api/profile', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );
    const { data, error } = await ProfileService.fetchProfile();
    expect(data).toBeNull();
    expect(error).toContain('500');
  });

  it('saveProfile should send data correctly', async () => {
    const mockProfile = { name: 'New' } as object as Profile;
    const { data } = await ProfileService.saveProfile(mockProfile);
    expect(data?.success).toBe(true);
  });
});
