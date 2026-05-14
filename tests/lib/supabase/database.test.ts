import { describe, expect, it } from 'vitest';

import { Constants } from '@/lib/supabase/database';

describe('supabase database constants', () => {
  it('exports the generated constants object', () => {
    expect(Constants).toEqual({
      public: {
        Enums: {},
      },
    });
  });
});
