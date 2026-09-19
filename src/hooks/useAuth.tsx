import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Player } from '../types';

const STORAGE_KEY = 'tb_user';

interface AuthContextType {
  player: Player | null;
  loggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Player;
        if (parsed && typeof parsed.name === 'string') {
          return parsed;
        }
      }
    } catch {
      // ignore storage parsing error
    }
    return null;
  });

  const login = useCallback((username: string) => {
    const trimmed = username.trim();
    if (!trimmed) return;
    const newPlayer: Player = {
      uid: trimmed.toLowerCase(),
      name: trimmed,
    };
    setPlayer(newPlayer);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlayer));
    } catch {
      // ignore storage write error
    }
  }, []);

  const logout = useCallback(() => {
    setPlayer(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage error
    }
  }, []);

  const value = useMemo(() => ({
    player,
    loggedIn: player !== null,
    login,
    logout,
  }), [player, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
