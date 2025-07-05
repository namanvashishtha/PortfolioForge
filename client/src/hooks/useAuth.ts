import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/user";

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  const logout = async () => {
    try {
      await fetch('/api/logout', { method: 'GET' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    refetch,
  } as const;
}
