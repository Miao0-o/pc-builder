// ============================================================
// Supabase Client — singleton initialization
// ============================================================
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://arugyuunlepawitrpanv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GPxnB1pqSNwjLYARPcROkw_K_l5oyit';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getUserId() {
  const session = await getSession();
  return session?.user?.id || null;
}
