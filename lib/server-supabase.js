import { createClient } from "@supabase/supabase-js";

export function createServerSupabaseClient({ serviceRole = true } = {}) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = serviceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      serviceRole
        ? "Supabase server configuration is missing. Set the project URL and SUPABASE_SERVICE_ROLE_KEY."
        : "Supabase server configuration is missing. Set the project URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return createClient(url, key);
}
