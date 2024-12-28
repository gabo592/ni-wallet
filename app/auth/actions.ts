'use server';

import { type User } from '@/types/user';
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
