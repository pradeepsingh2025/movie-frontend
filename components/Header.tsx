'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function Header() {
  const { user, logout, accessToken } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-xl font-bold">
        🎬 MovieBook
      </Link>

      <nav className="flex items-center gap-4">
        <Link href="/movies" className="hover:underline">
          Movies
        </Link>

        {!accessToken ? (
          <>
            <Link
              href="/auth/login"
              className="px-4 py-2 border rounded"
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-black text-white rounded"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            <Link href="/reservations" className="hover:underline">
              My Reservations
            </Link>

            {user && user.role === 'ADMIN' && (
              <Link href="/admin" className="hover:underline">
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              className="px-4 py-2 border rounded"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
