import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface CreateUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName: string;
    cetsId?: string;
}

interface UseCreateUserProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useCreateUser({ onSuccess, onError }: UseCreateUserProps = {}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createUser = async (userData: CreateUserData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error || 'Failed to create account';
                setError(errorMessage);
                if (onError) {
                    onError(errorMessage);
                }
                setIsLoading(false);
                return;
            }

            // Registration successful, notify user to verify email
            if (onSuccess) {
                onSuccess();
            }
            router.push('/login');
        } catch (err: any) {
            const errorMessage = err.message || 'An error occurred during registration';
            setError(errorMessage);
            if (onError) {
                onError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createUser,
        isLoading,
        error,
    };
}
