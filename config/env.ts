const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

interface Env {
  supabase: {
    url: string;
    anonKey: string;
  };
}

export const env: Env = {
  supabase: {
    url: NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  },
};
