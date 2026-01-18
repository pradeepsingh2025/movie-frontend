'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '@/lib/AuthContext';

import { ErrorProvider } from '@/context/ErrorContext';

export function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient inside the component to ensure it's created on the client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorProvider>
          {children}
        </ErrorProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

