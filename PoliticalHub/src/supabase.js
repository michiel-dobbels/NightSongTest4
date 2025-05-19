import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-project.supabase.co'; // TODO: replace with your Supabase URL
const SUPABASE_ANON_KEY = 'public-anon-key'; // TODO: replace with your Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
