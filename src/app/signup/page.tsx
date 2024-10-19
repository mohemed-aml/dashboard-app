// src/app/signup/page.tsx
'use client';

import FormDivider from '@/components/login/FormDivider';
import InputField from '@/components/login/InputField';
import AuthProviderButtons from '@/components/login/OAuthProviderButtons';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/Login.module.css'; // Reusing the same styles as login
import { supabase } from '@/utils/supabaseClient';
import { useAuthHandler } from '@/utils/useAuthHandler';
import { Provider } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Signup = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleAuth = useAuthHandler();
  const providers: Provider[] = ['google', 'github', 'facebook', 'azure'];

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setError(null);

    // Validate that password and confirmPassword match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error('Error during signup:', error);
      alert(error.message);
    } else {
      alert('Check your email for confirmation link.');
      router.push('/login');
    }
  };

  return (
    <div className={styles.login}>
      <Image src="/login-bg-copy.jpg" alt="background" className={styles.login__bg} width={1000} height={1000}/>
      <form className={styles.login__form} onSubmit={handleSignup}>
        <h1 className={styles.login__title}>Signup</h1>
        <div className={styles.login__inputs}>
          <InputField type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} required iconClass="ri-mail-fill" />
          <InputField type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} required iconClass="ri-lock-2-fill" />
          <InputField type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} iconClass="ri-lock-2-fill" />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.login__button}>Signup</button>
        <div className={styles.login__register}>
          Already have an account?{' '}
          <Link href="/login" className={styles.login__link}>Login</ Link>
        </div>
        <FormDivider />
        <AuthProviderButtons handleAuth={handleAuth} providers={providers} />
      </form>
    </div>
  );
}

export default Signup;