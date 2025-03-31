'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const file = formData.get('image') as File;

  const url = await uploadAvatar(file);

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
        profile_image_url: url,
      },
    },
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/auth/login');
}

export async function getUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('users').select().single();

  if (error) {
    redirect('/error');
  }

  return data;
}

async function uploadAvatar(file: File) {
  const supabase = await createClient();

  const today = Date.now();

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`${file.name}-${today}`, file);

  if (error) {
    redirect('/error');
  }

  const { data: url } = supabase.storage
    .from('avatars')
    .getPublicUrl(data.path);

  return url.publicUrl;
}
