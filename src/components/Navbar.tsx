// src/components/Navbar.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-200 dark:bg-gray-800">
      <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
        My Dashboard App
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {user ? (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;