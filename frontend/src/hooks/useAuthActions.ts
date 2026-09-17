import { useState } from 'react';
import { authApi } from '../api/auth/auth.api';
import { useAuthStore } from '../store/authStore';
import { tokenService } from '../services/tokenService';

export const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logoutStore = useAuthStore((state) => state.logout);

  const login = () => {
    authApi.loginRedirect();
  };

  const exchangeCode = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const tokens = await authApi.exchangeCode(code);
      useAuthStore.getState().login(tokens.access_token);
    } catch (err: any) {
      setError(err.response?.data || 'Authorization error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const code = tokenService.getRefreshToken() || '';
      await authApi.logout({ code });
    } catch (err) {
      console.error('Server logout error', err);
    } finally {
      logoutStore();
    }
  };

  return { login, exchangeCode, logout, isLoading, error };
};