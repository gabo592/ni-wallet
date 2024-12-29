'use server';

import { UpdateUserDto, type User } from '@/types/user';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
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
  const payload: UpdateUserDto = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
  };

  const image = formData.get('image') as File | null;

  if (image) {
    const { data } = await uploadFile(image);

    payload.avatar_url = data?.signedUrl;
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('users')
    .update(payload)
    .eq('id', formData.get('id') as string);

  if (error) {
    console.error(error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  revalidatePath('/profile', 'layout');
  redirect('/');
}

async function uploadFile(file: File) {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.getUser();

  if (error || !data) {
    console.error(error);
    redirect('/error');
  }

  await supabase.storage.from('ni-wallet').upload(`${data.user.id}/${file.name}`, file, {
    upsert: true,
  });

  const expiresInOneYear = 60 * 60 * 24 * 365;

  return supabase.storage
    .from('ni-wallet')
    .createSignedUrl(`${data.user.id}/${file.name}`, expiresInOneYear);
}
