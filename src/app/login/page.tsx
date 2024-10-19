// src/app/login/page.tsx
'use client';

import FormDivider from '@/components/login/FormDivider';
import InputField from '@/components/login/InputField';
import AuthProviderButtons from '@/components/login/OAuthProviderButtons';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/Login.module.css';
import { supabase } from '@/utils/supabaseClient';
import { useAuthHandler } from '@/utils/useAuthHandler';
import { Provider } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function Login() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleAuth = useAuthHandler();
  const providers: Provider[] = ['google', 'github', 'facebook', 'azure'];

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);
  
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error during email login:', error);
      alert(error.message);
    } else {
      router.push('/');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.login}>
      <Image src="/login-bg-copy.jpg" alt="background" className={styles.login__bg} width={1000} height={1000}/>
      <form className={styles.login__form} onSubmit={handleEmailLogin}>
        <h1 className={styles.login__title}>Login</h1>
        <div className={styles.login__inputs}>
          <InputField type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} required iconClass="ri-mail-fill" />
          <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required iconClass="ri-lock-2-fill" />
        </div>
        <div className={styles.login__check}>
          <div className={styles.login__check_box}>
            <input type="checkbox" className={styles.login__check_input} id="user-check" />
            <label htmlFor="user-check" className={styles.login__check_label}>Remember me</label>
          </div>
          <Link href="#" className={styles.login__forgot}>Forgot Password?</Link>
        </div>
        <button type="submit" className={styles.login__button} >Login</button>
        <div className={styles.login__register}>
          Don&apos;t have an account? <Link href="/signup" className={styles.login__link}>Register</ Link>
        </div>
        <FormDivider />
        <AuthProviderButtons 
          handleAuth={handleAuth}
          providers={providers}
        />
      </form>
    </div>
  );
}

export default Login;