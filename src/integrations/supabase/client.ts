import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xmxiadlljeyaoknkaymw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhteGlhZGxsamV5YW9rbmtheW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTc3MDAsImV4cCI6MjA4ODUzMzcwMH0.gKrWodpciUlSOAvht5HHg195h4Ne1dmkjZNeq9Eb0Yk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
