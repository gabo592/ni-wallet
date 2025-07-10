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

export async function getSignedUrl(
  fileName: string
): Promise<BaseResponse<string>> {
  const supabase = await createClient();

  const { data: authUser, error: authError } = await supabase.auth.getUser();

  if (authError) {
    return {
      data: '',
      isSuccess: false,
      error: authError.message,
    };
  }

  const { data, error } = await supabase.storage
    .from('nic-ahorro')
    .createSignedUrl(`${authUser.user.id}/${fileName}`, 3600);

  if (error) {
    return {
      data: '',
      isSuccess: false,
      error: error.message,
    };
  }

  return {
    data: data.signedUrl,
    isSuccess: true,
    error: '',
  };
}
