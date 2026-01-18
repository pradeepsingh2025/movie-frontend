'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { useError } from '@/context/ErrorContext';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const { showError } = useError();

    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Server Component Error:', error);

        // Optionally trigger the global modal if you want it to pop up immediately
        // showError(error.message || 'Something went wrong', 'Application Error');
        // However, since this is a page replacement, we likely want to render a nice UI *instead* of the page.
    }, [error, showError]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 text-center"
            >
                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-500" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Something went wrong!
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xs mx-auto">
                    {error.message || "We encountered an unexpected error while loading this page."}
                </p>

                <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity font-medium w-full sm:w-auto"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try again
                </button>
            </motion.div>
        </div>
    );
}
