import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';
import { loadPlayer, removePlayer, storePlayer } from '../lib/storage';
import type { Player } from '../types';

interface AuthContextValue {
  player: Player | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(() => loadPlayer());

  const value = useMemo<AuthContextValue>(
    () => ({
      player,
      login(username) {
        const name = username.trim();
        const nextPlayer = { uid: name.toLocaleLowerCase(), name };
        storePlayer(nextPlayer);
        setPlayer(nextPlayer);
      },
      logout() {
        removePlayer();
        setPlayer(null);
      }
    }),
    [player]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// The hook intentionally shares the provider module to keep the auth boundary cohesive.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
