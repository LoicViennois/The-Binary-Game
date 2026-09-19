import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './views/LoginPage';
import { HomePage } from './views/HomePage';
import { GamePage } from './views/GamePage';
import { gitInfo } from './git-info';

function AppRoutes() {
  const { loggedIn } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-stone-100/90 text-slate-800 antialiased font-sans selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/play/:size"
            element={
              <ProtectedRoute>
                <GamePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={<Navigate to={loggedIn ? '/home' : '/login'} replace />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      {/* Footer / Build info */}
      <footer className="py-4 text-center text-xs text-slate-400">
        <span>
          Build{' '}
          <a
            href={
              gitInfo.commitSha && gitInfo.commitSha !== 'dev'
                ? `https://github.com/LoicViennois/The-Binary-Game/commit/${gitInfo.commitSha}`
                : 'https://github.com/LoicViennois/The-Binary-Game'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-slate-500 hover:text-indigo-600 underline underline-offset-2"
          >
            {gitInfo.shortSha}
          </a>
        </span>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
