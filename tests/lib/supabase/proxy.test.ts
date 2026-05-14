import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createServerClientMock, nextMock, redirectMock } = vi.hoisted(() => ({
  createServerClientMock: vi.fn(),
  nextMock: vi.fn(),
  redirectMock: vi.fn(),
}));

vi.mock('@supabase/ssr', () => ({
  createServerClient: createServerClientMock,
}));

vi.mock('next/server', () => ({
  NextResponse: {
    next: nextMock,
    redirect: redirectMock,
  },
}));

import { updateSession } from '@/lib/supabase/proxy';

function createResponse(kind: 'next' | 'redirect') {
  return {
    kind,
    cookies: {
      set: vi.fn(),
    },
    headers: {
      set: vi.fn(),
    },
  };
}

function createRequest(pathname: string) {
  return {
    cookies: {
      getAll: vi.fn(() => [{ name: 'sb-access-token', value: 'old' }]),
      set: vi.fn(),
    },
    nextUrl: {
      pathname,
      clone: vi.fn(() => ({ pathname })),
    },
  };
}

describe('updateSession', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'public-anon-key';
    nextMock.mockImplementation(() => createResponse('next'));
    redirectMock.mockImplementation((url) => ({
      ...createResponse('redirect'),
      url,
    }));
  });

  it('redirects anonymous users visiting protected routes', async () => {
    const request = createRequest('/dashboard');

    createServerClientMock.mockImplementation((_url, _key, options) => {
      expect(options.cookies.getAll()).toEqual([
        { name: 'sb-access-token', value: 'old' },
      ]);
      options.cookies.setAll(
        [{ name: 'sb-access-token', value: 'new', options: { path: '/' } }],
        { 'x-supabase': '1' },
      );

      return {
        auth: {
          getClaims: vi.fn().mockResolvedValue({ data: { claims: null } }),
        },
      };
    });

    const response = await updateSession(request as never);

    expect(createServerClientMock).toHaveBeenCalled();
    expect(request.cookies.getAll).toHaveBeenCalled();
    expect(request.cookies.set).toHaveBeenCalledWith('sb-access-token', 'new');
    expect(nextMock).toHaveBeenCalledTimes(2);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock.mock.calls[0][0]).toEqual({ pathname: '/auth/login' });
    expect(response).toMatchObject({
      kind: 'redirect',
      url: { pathname: '/auth/login' },
    });
  });

  it('allows anonymous users on /login without redirecting', async () => {
    const request = createRequest('/login');

    createServerClientMock.mockReturnValue({
      auth: {
        getClaims: vi.fn().mockResolvedValue({ data: { claims: null } }),
      },
    });

    const response = await updateSession(request as never);

    expect(redirectMock).not.toHaveBeenCalled();
    expect(response).toMatchObject({ kind: 'next' });
  });

  it('allows anonymous users on /auth routes and preserves response mutations', async () => {
    const request = createRequest('/auth/login');

    createServerClientMock.mockImplementation((_url, _key, options) => {
      options.cookies.setAll(
        [{ name: 'sb-refresh-token', value: '2', options: { path: '/' } }],
        { 'x-supabase': '1' },
      );

      return {
        auth: {
          getClaims: vi.fn().mockResolvedValue({ data: { claims: null } }),
        },
      };
    });

    const response = await updateSession(request as never);

    expect(redirectMock).not.toHaveBeenCalled();
    expect(request.cookies.set).toHaveBeenCalledWith('sb-refresh-token', '2');
    expect(response.cookies.set).toHaveBeenCalledWith('sb-refresh-token', '2', {
      path: '/',
    });
    expect(response.headers.set).toHaveBeenCalledWith('x-supabase', '1');
  });

  it('returns the passthrough response for authenticated users', async () => {
    const request = createRequest('/dashboard');

    createServerClientMock.mockReturnValue({
      auth: {
        getClaims: vi
          .fn()
          .mockResolvedValue({ data: { claims: { sub: '123' } } }),
      },
    });

    const response = await updateSession(request as never);

    expect(redirectMock).not.toHaveBeenCalled();
    expect(response).toMatchObject({ kind: 'next' });
  });
});
