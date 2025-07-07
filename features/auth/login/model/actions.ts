'use server';

import { createClient } from '@/shared/api/server';
import { BaseResponse } from '@/shared/api/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData): Promise<BaseResponse<void>> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
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
