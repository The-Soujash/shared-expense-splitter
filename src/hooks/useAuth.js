import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const initialAuthState = {
  isAuthenticated: false,
  currentUser: null,
  users: [],
};

export function useAuth() {
  const [authState, setAuthState] = useLocalStorage('expense-splitter-auth', initialAuthState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (credentials) => {
      setIsLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = authState.users.find((u) => u.email === credentials.email);

      if (!user) {
        setError('No account found with this email address');
        setIsLoading(false);
        return false;
      }

      // Accept any password for demo or implement real password logic here
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: true,
        currentUser: user,
      }));

      setIsLoading(false);
      return true;
    },
    [authState.users, setAuthState]
  );

  const register = useCallback(
    async (data) => {
      setIsLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingUser = authState.users.find((u) => u.email === data.email);
      if (existingUser) {
        setError('An account with this email already exists');
        setIsLoading(false);
        return false;
      }

      if (data.password !== data.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return false;
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
      };

      setAuthState((prev) => ({
        ...prev,
        users: [...prev.users, newUser],
        isAuthenticated: true,
        currentUser: newUser,
      }));

      setIsLoading(false);
      return true;
    },
    [authState.users, setAuthState]
  );

  const logout = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      isAuthenticated: false,
      currentUser: null,
    }));
    setError(null);
  }, [setAuthState]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    currentUser: authState.currentUser,
    error,
    isLoading,
    login,
    register,
    logout,
    clearError,
  };
}
