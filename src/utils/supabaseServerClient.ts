// src/utils/supabaseServerClient.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/Database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseServer = createClient<Database>(supabaseUrl, supabaseServiceRoleKey);