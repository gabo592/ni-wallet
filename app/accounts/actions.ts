'use server';

import { Account, AccountEntity, CreateAccountDto, UpdateAccountDto } from '@/types/account';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

interface SearchFilters {
  search?: string;
}

export async function createAccount(formData: FormData): Promise<AccountEntity | null> {
  const supabase = await createClient();

  const { error: authError, data: authData } = await supabase.auth.getUser();

  if (authError || !authData) {
    console.error(authError);
    return null;
  }

  const payload: CreateAccountDto = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    currency_id: formData.get('currency_id') as string,
    balance: Number(formData.get('balance') as string),
    user_id: authData.user.id,
  };

  const { error, data } = await supabase.from('accounts').insert(payload).select().single();

  if (error || !data) {
    console.error(error);
    return null;
  }

  revalidatePath('/accounts', 'layout');

  return data;
}

export async function getAccounts(filters: SearchFilters): Promise<Account[]> {
  const supabase = await createClient();

  let query = supabase
    .from('accounts')
    .select('*, currency:currencies(*)')
    .order('created_at', { ascending: false });

  if (filters.search) {
    const searchTerm = `%${filters.search}%`;
    query = query.or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`);
  }

  const { error, data } = await query;

  if (error || !data) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getAccount(id: string): Promise<Account | null> {
  const supabase = await createClient();

  const { error, data } = await supabase
    .from('accounts')
    .select('*, currency:currencies(*)')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error(error);
    return null;
  }

  return data;
}

export async function updateAccount(formData: FormData): Promise<AccountEntity | null> {
  const supabase = await createClient();

  const { error: authError, data: authData } = await supabase.auth.getUser();

  if (authError || !authData) {
    console.error(authError);
    return null;
  }

  const payload: UpdateAccountDto = {
    id: formData.get('id') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    currency_id: formData.get('currency_id') as string,
    balance: Number(formData.get('balance') as string),
  };

  const { error, data } = await supabase
    .from('accounts')
    .update(payload)
    .eq('id', payload.id as string)
    .select()
    .single();

  if (error || !data) {
    console.error(error);
    return null;
  }

  revalidatePath('/accounts', 'layout');

  return data;
}

export async function deleteAccount(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from('accounts').delete().eq('id', id);

  if (error) {
    console.error(error);
  }

  revalidatePath('/accounts', 'layout');
}
