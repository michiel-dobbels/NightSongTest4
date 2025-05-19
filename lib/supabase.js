import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yfiynxfsvpklremperpg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmaXlueGZzdnBrbHJlbXBlcnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTEzNTYsImV4cCI6MjA2MjM4NzM1Nn0.1sLJqsSwKKrUuJS6ln4UFoNCBssFlhGisZCsSt09x5o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
