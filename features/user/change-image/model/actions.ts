'use server';

import { createClient } from '@/shared/api/server';
import { BaseResponse } from '@/shared/api/types';
import { revalidatePath } from 'next/cache';

export async function uploadProfilePicture(
  formData: FormData
): Promise<BaseResponse<string>> {
  const supabase = await createClient();

  const file = formData.get('picture') as File;

  if (!file) {
    return {
      data: '',
      isSuccess: false,
      error: 'No se selecciono un archivo',
    };
  }

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
    .upload(`${authUser.user.id}/${file.name}`, file, { upsert: true });

  if (error) {
    return {
      data: '',
      isSuccess: false,
      error: error.message,
    };
  }

  const { error: userError } = await supabase
    .from('users')
    .update({
      profile_image_url: file.name,
    })
    .eq('id', authUser.user.id);

  if (userError) {
    console.error(userError);
    return {
      data: '',
      isSuccess: false,
      error: userError.message,
    };
  }

  revalidatePath('/profile', 'layout');

  return {
    data: data.path,
    isSuccess: true,
    error: '',
  };
}
