// src/utils/supabaseClient.ts
'use client';

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/Database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);