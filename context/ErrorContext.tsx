'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_ERROR_EVENT, ApiErrorDetail } from '@/lib/errorEvent';
import { ErrorModal } from '@/components/ui/ErrorModal';

interface ErrorContextType {
    showError: (message: string, title?: string) => void;
    hideError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [errorInfo, setErrorInfo] = useState<{ message: string; title: string }>({
        message: '',
        title: 'Error',
    });

    const showError = useCallback((message: string, title: string = 'Error') => {
        setErrorInfo({ message, title });
        setIsOpen(true);
    }, []);

    const hideError = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Listen for global API error events/
    useEffect(() => {
        const handleApiError = (event: Event) => {
            const customEvent = event as CustomEvent<ApiErrorDetail>;
            showError(customEvent.detail.message, customEvent.detail.title);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener(API_ERROR_EVENT, handleApiError);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener(API_ERROR_EVENT, handleApiError);
            }
        };
    }, [showError]);

    return (
        <ErrorContext.Provider value={{ showError, hideError }}>
            {children}
            <ErrorModal
                isOpen={isOpen}
                onClose={hideError}
                title={errorInfo.title}
                message={errorInfo.message}
            />
        </ErrorContext.Provider>
    );
}

export function useError() {
    const context = useContext(ErrorContext);
    if (context === undefined) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
}
