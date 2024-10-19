// utils/requireAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './authContext';

const useRequireAuth = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [router, user, loading]);

  return { user, loading };
};

export default useRequireAuth;