import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createServerClientMock, cookiesMock, cookieStore } = vi.hoisted(() => ({
  createServerClientMock: vi.fn(),
  cookiesMock: vi.fn(),
  cookieStore: {
    getAll: vi.fn(),
    set: vi.fn(),
  },
}));

vi.mock('@supabase/ssr', () => ({
  createServerClient: createServerClientMock,
}));

vi.mock('next/headers', () => ({
  cookies: cookiesMock,
}));

import { createClient } from '@/lib/supabase/server';

describe('supabase server client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'public-anon-key';

    cookieStore.getAll.mockReturnValue([
      { name: 'sb-access-token', value: '1' },
    ]);
    cookiesMock.mockResolvedValue(cookieStore);
    createServerClientMock.mockReturnValue({ kind: 'server-client' });
  });

  it('creates a server client wired to the Next cookie store', async () => {
    const client = await createClient();

    expect(client).toEqual({ kind: 'server-client' });
    expect(cookiesMock).toHaveBeenCalled();
    expect(createServerClientMock).toHaveBeenCalledWith(
      'https://example.supabase.co',
      'public-anon-key',
      expect.objectContaining({
        cookies: expect.objectContaining({
          getAll: expect.any(Function),
          setAll: expect.any(Function),
        }),
      }),
    );

    const options = createServerClientMock.mock.calls[0][2];

    expect(options.cookies.getAll()).toEqual([
      { name: 'sb-access-token', value: '1' },
    ]);

    options.cookies.setAll(
      [{ name: 'sb-refresh-token', value: '2', options: { path: '/' } }],
      {},
    );

    expect(cookieStore.set).toHaveBeenCalledWith('sb-refresh-token', '2', {
      path: '/',
    });
  });
});
