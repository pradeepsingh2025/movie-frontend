'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function Header() {
  const { user, logout, accessToken } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const text = "MovieBook";

  return (
    <>
      <style jsx global>{`
        @keyframes gradient {
          0% {
            filter: drop-shadow(0 0 20px rgba(124, 58, 237, 0.4)) hue-rotate(0deg);
          }
          100% {
            filter: drop-shadow(0 0 20px rgba(124, 58, 237, 0.4)) hue-rotate(360deg);
          }
        }
        
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
      `}</style>

      <header className="sticky top-0 z-40 px-6 py-4 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity duration-300 flex items-center gap-2"
          >
            <span className="text-red-600">🎬</span>
            <span>
              {text.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-gradient"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    background: 'conic-gradient(from 0deg, #e0e7ff, #ddd6fe, #fce7f3, #fecdd3, #fed7aa, #e0e7ff)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/movies" 
              className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              Movies
            </Link>
            <Link 
              href="/showTimes" 
              className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              Shows
            </Link>

            {!accessToken ? (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 shadow-lg shadow-red-900/20"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/reservations" 
                  className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors duration-200"
                >
                  My Reservations
                </Link>

                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-700 rounded-lg hover:border-red-500 hover:text-red-500 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* --- MOBILE MENU DROPDOWN --- */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-gray-800 pt-4 animate-in slide-in-from-top-2 fade-in duration-200 bg-gray-950">
            <Link 
              href="/movies" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              Movies
            </Link>
            <Link 
              href="/showTimes" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors duration-200"
            >
              Shows
            </Link>

            {!accessToken ? (
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-center px-4 py-2 text-sm font-medium border border-gray-700 rounded-lg hover:bg-gray-800 text-gray-300"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-center px-4 py-2 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg shadow-red-900/20"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Link 
                  href="/reservations" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors duration-200"
                >
                  My Reservations
                </Link>
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="text-left text-sm font-medium text-red-500 hover:text-red-400 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}