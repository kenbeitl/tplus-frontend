import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface UseLoginProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useLogin({ onSuccess, onError }: UseLoginProps = {}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error('Login failed:', result.error);
        const errorMessage = 'Invalid username or password';
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
        setIsLoading(false);
      } else {
        if (onSuccess) {
          onSuccess();
        }
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'An error occurred while logging in';
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
}
