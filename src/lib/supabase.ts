import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Browser/SSR client — anon key, RLS-bound. Safe to call anywhere.
 */
export function createBrowserClient(): SupabaseClient {
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

/**
 * Server-only client — service role key. Bypasses RLS. NEVER import from a
 * "use client" file. Used inside Server Actions and server components only.
 */
export function createServerClient(): SupabaseClient {
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
