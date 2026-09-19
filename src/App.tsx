import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { useAuth } from './auth/AuthContext';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

function ProtectedRoute() {
  const { player } = useAuth();
  return player ? <Outlet /> : <Navigate to="/login" replace />;
}

export function App() {
  return (
    <div className="min-h-dvh text-slate-100">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-cyan-300 px-4 py-2 font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/play/:size" element={<GamePage />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}
