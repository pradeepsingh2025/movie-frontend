'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';
import { setAccessToken } from './apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getBaseUrl() {
  // Browser
  if (typeof window !== "undefined") {
    return "";
  }

  // Server (Next.js)
  return API_BASE_URL ?? "http://localhost:3000";
}

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreAuth() {
      const baseUrl = getBaseUrl();
      try {
        const res = await fetch(`${baseUrl}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (res.status === 401) {
          return;
        }

        if (!res.ok){
          throw new Error("Unexpected refresh failure");
        } 
        
        const data = await res.json();
        setAccessToken(data.token);
        setAccessTokenState(data.token);
        setUser(data.user);
      } catch{
        // user remains logged out
      } finally {
        setLoading(false);
      }
    }

    restoreAuth();
  }, []);

  function login(token: string, userData: User) {
    setAccessToken(token);
    setAccessTokenState(token);
    setUser(userData);
  }

  async function logout() {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      // Include Authorization header if we have a token
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      await fetch(`/api/auth/logout`, {
        method: 'POST',
        headers,
        credentials: 'include'
      });
    } catch (error) {
      // Even if logout fails on backend, clear local state
      console.error('Logout error:', error);
    } finally {
      // Always clear local state regardless of backend response
      setAccessToken(null);
      setAccessTokenState(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, accessToken }}>
      {loading ? <div className='text-center text-xl md:text-4xl font-semibold text-gray-500 mt-20 md:mt-60 animate-pulse'>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}