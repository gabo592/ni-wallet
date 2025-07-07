'use server';

import { createClient } from '@/shared/api/server';
import { BaseResponse } from '@/shared/api/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function register(
  formData: FormData
): Promise<BaseResponse<void>> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
      },
    },
  });

  if (error) {
    return {
      data: undefined,
      error: error.message,
      isSuccess: false,
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
