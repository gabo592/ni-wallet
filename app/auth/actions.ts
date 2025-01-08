'use server';

import { UpdateUserDto, type User } from '@/types/user';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const { data: avatar } = await uploadAvatar(supabase, formData);

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        avatar_url: avatar?.publicUrl ?? '',
      },
    },
  });

  if (error || !data) {
    console.error(error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error || !data) {
    console.error(error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/auth/login');
}

export async function getUser(): Promise<User | null> {
  const supabase = await createClient();

  const { error, data } = await supabase.from('users').select().single();

  if (error || !data) {
    console.error(error);
    return null;
  }

  return data;
}

export async function updateUser(formData: FormData) {
  const supabase = await createClient();

  const payload: UpdateUserDto = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
  };

  const { data } = await uploadAvatar(supabase, formData);

  if (!data) {
    redirect('/error');
  }

  if (data.publicUrl) {
    payload.avatar_url = data.publicUrl;
  }

  const { error } = await supabase
    .from('users')
    .update(payload)
    .eq('id', formData.get('id') as string);

  if (error) {
    console.error(error);
    redirect('/error');
  }

  revalidatePath('/profile', 'layout');
}

async function uploadAvatar(supabase: SupabaseClient, formData: FormData) {
  const file = formData.get('image') as File;

  if (!file) {
    return { data: { publicUrl: '' } };
  }

  const { error, data } = await supabase.storage.from('avatars').upload(`${file.name}`, file, {
    upsert: true,
  });

  if (error) {
    console.error(error);
    return { data: null };
  }

  return supabase.storage.from('avatars').getPublicUrl(data.path);
}
