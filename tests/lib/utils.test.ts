import { describe, expect, it } from 'vitest';

import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merges conflicting Tailwind classes', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('keeps non-conflicting classes', () => {
    expect(cn('text-sm', false && 'hidden', ['font-medium'])).toBe(
      'text-sm font-medium',
    );
  });
});
