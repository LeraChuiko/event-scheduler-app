import { useState, type ReactNode } from 'react';
import { AUTH_TOKEN_KEY, AuthContext } from './auth';

interface AuthProviderProps {
  children: ReactNode;
}

const getStoredToken = () => {
  const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)?.trim();
  return storedToken || null;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(getStoredToken);

  const login = (newToken: string) => {
    const cleanToken = newToken.trim();

    if (!cleanToken) {
      throw new Error('The server did not return a valid authentication token.');
    }

    localStorage.setItem(AUTH_TOKEN_KEY, cleanToken);
    setToken(cleanToken);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: Boolean(token), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
