import { createBrowserClient } from '@supabase/ssr';
import { env } from '../config/env';
import { Database } from './database';

export function createClient() {
  return createBrowserClient<Database>(env.supabase.url, env.supabase.anonKey);
}
