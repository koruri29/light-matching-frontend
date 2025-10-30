import { useAuth } from './context';

export const useIsAuthenticated = () => {
  const { user, loading } = useAuth();
  return { isAuthenticated: !!user, user, loading };
};
