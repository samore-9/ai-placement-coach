import { useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { api } from '@/services/api';

export function useAuth() {
  const { user, accessToken, status, setAuth, clearAuth, setStatus } = useAuthStore();

  const register = useCallback(
    async (payload) => {
      const data = await authService.register(payload);
      setAuth(data);
      return data;
    },
    [setAuth]
  );

  const login = useCallback(
    async (payload) => {
      const data = await authService.login(payload);
      setAuth(data);
      return data;
    },
    [setAuth]
  );

  const googleLogin = useCallback(
    async (idToken) => {
      const data = await authService.googleLogin(idToken);
      setAuth(data);
      return data;
    },
    [setAuth]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  // Called once on app load: tries to silently exchange the httpOnly refresh
  // cookie for a fresh access token, so a page reload doesn't force re-login.
  const bootstrap = useCallback(async () => {
    setStatus('loading');
    try {
      const { data } = await api.post('/auth/refresh-token');
      setAuth(data.data);
    } catch {
      clearAuth();
    }
  }, [setAuth, clearAuth, setStatus]);

  return {
    user,
    accessToken,
    status,
    isAuthenticated: status === 'authenticated',
    register,
    login,
    googleLogin,
    logout,
    bootstrap,
  };
}
