import { useAuth } from '@/features/auth/context/context';

export const useIsAuthenticated = () => {
  const { user, loading } = useAuth();
  return { isAuthenticated: !!user, user, loading };
};
