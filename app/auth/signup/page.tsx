'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/apiClient';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

interface SignupFormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
  const router = useRouter();
  const { login } = useAuth();

  async function onSubmit(data: SignupFormData) {
    try {
      // Signup endpoint according to API docs
      const result = await apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      // After successful signup, login the user
      if (result.accessToken && result.user) {
        login(result.accessToken, result.user);
        router.push('/movies');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      // Global error modal will show the error
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Full Name"
              className="border p-2 w-full rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              placeholder="Email"
              className="border p-2 w-full rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('phoneNumber', { required: 'Phone is required' })}
              type="tel"
              placeholder="Phone Number"
              className="border p-2 w-full rounded"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type="password"
              placeholder="Password"
              className="border p-2 w-full rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-black font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

