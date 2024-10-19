// src/utils/useAuthHandler.ts
'use client';

import { supabase } from './supabaseClient';
import { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export const useAuthHandler = () => {
  const router = useRouter();

  const handleAuth = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      console.error('Error during sign in:', error);
      // Optionally, set an error state to display to the user
    } else {
      router.push('/dashboard');
    }
  };

  return handleAuth;
};