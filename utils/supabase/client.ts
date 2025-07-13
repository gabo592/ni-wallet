import { env } from "@/config/env";
import { Database } from "@/types/database";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient<Database>(env.supabase.url, env.supabase.anonKey);
}
