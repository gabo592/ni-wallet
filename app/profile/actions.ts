'use server';

import { createClient } from '@/utils/supabase/server';

export async function getProfile() {
  const supabase = await createClient();

  const [authData, userData] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from('users').select().single(),
  ]);

  if (authData.error || userData.error) {
    console.error(
      'Error fetching profile data:',
      authData.error,
      userData.error
    );
    return null;
  }

  return {
    ...userData.data,
    email: authData.data.user.email,
  };
}
