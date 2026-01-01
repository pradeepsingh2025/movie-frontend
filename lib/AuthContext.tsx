'use client';

import { createContext, useContext, useState } from 'react';
import { User } from './types';
import { setAccessToken } from './apiClient';

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const url = process.env.NEXT_PUBLIC_API_URL

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

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

      await fetch(`${url}/api/auth/logout`, {
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}