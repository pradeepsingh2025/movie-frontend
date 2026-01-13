'use client';

import { useState } from 'react'; // Added for toggle state
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
// import { div } from 'motion/react-client'; // Unused in snippet, kept if needed

export default function Header() {
  const { user, logout, accessToken } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-6 py-4 bg-white/50 backdrop-blur-md bg-linear-to-br from-purple-900/60 via-slate-950/50 to-purple-900/60 border-b border-white/10 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300"
        >
          🎬 MovieBook
        </Link>

        {/* --- DESKTOP MENU (Hidden on mobile via 'hidden md:flex') --- */}
        <nav className="hidden md:flex items-center gap-4">
          <Link 
            href="/movies" 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
          >
            Movies
          </Link>
          <Link 
            href="/showTimes" 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
          >
            Shows
          </Link>

          {!accessToken ? (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
              >
                Login
              </Link>

              <Link
                href="/auth/signup"
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-500/25"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/reservations" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
              >
                My Reservations
              </Link>

              <button
                onClick={logout}
                className="px-4 pt-1 pb-2 text-sm font-medium text-white rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* --- MOBILE HAMBURGER BUTTON (Visible only on mobile via 'md:hidden') --- */}
        <button 
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            // X Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-white/10 pt-4 animate-in slide-in-from-top-2 fade-in duration-200">
          <Link 
            href="/movies" 
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
          >
            Movies
          </Link>
          <Link 
            href="/showTimes" 
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
          >
            Shows
          </Link>

          {!accessToken ? (
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/auth/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-center px-4 py-2 text-sm font-medium border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setIsMenuOpen(false)}
                className="text-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-500/25"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <Link 
                href="/reservations" 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                My Reservations
              </Link>
              <button
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="text-left text-sm font-medium text-red-400 hover:text-red-300 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}