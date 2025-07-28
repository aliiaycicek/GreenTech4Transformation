import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This will be caught by the server and should provide a clear error.
  throw new Error('CRITICAL: Supabase environment variables are not loaded. Check your .env.local file and restart the server.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);