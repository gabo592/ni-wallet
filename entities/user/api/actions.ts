'use server';

import { createClient } from '@/shared/api/server';
import { BaseResponse } from '@/shared/api/types';
import { AuthUser } from '../model/types';

export async function getUser(): Promise<BaseResponse<AuthUser | undefined>> {
  const supabase = await createClient();

  const { data: authUser, error: authError } = await supabase.auth.getUser();

  if (authError) {
    return {
      data: undefined,
      error: authError.message,
      isSuccess: false,
    };
  }

  const { data, error } = await supabase.from('users').select().single();

  if (error) {
    return {
      data: undefined,
      error: error.message,
      isSuccess: false,
    };
  }

  return {
    data: {
      ...data,
      email: authUser.user?.email ?? '',
    },
    error: undefined,
    isSuccess: true,
  };
}
