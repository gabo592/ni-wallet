import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createBrowserClientMock } = vi.hoisted(() => ({
  createBrowserClientMock: vi.fn(),
}));

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: createBrowserClientMock,
}));

import { createClient } from '@/lib/supabase/client';

describe('supabase client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'public-anon-key';
    createBrowserClientMock.mockReturnValue({ kind: 'browser-client' });
  });

  it('creates a browser client with the configured environment variables', () => {
    const client = createClient();

    expect(client).toEqual({ kind: 'browser-client' });
    expect(createBrowserClientMock).toHaveBeenCalledWith(
      'https://example.supabase.co',
      'public-anon-key',
    );
  });
});
