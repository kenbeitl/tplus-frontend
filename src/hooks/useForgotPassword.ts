import { useState } from 'react';

interface UseForgotPasswordProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useForgotPassword({ onSuccess, onError }: UseForgotPasswordProps = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendResetEmail = async (userId: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error || 'Failed to send password reset email';
                setError(errorMessage);
                if (onError) {
                    onError(errorMessage);
                }
                setIsLoading(false);
                return;
            }

            if (onSuccess) {
                onSuccess();
            }
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to send password reset email';
            setError(errorMessage);
            if (onError) {
                onError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        sendResetEmail,
        isLoading,
        error,
    };
}
