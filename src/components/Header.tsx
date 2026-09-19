import { Github, Info, LogOut, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { AboutDialog } from './AboutDialog';
import { Logo } from './Logo';

export function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const { player, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const onLoginPage = location.pathname === '/login';

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <>
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to={player ? '/home' : '/login'} aria-label="The Binary Game home" className="rounded-xl focus-visible:outline-2 focus-visible:outline-cyan-300">
            <span className="sm:hidden"><Logo compact /></span>
            <span className="hidden sm:inline"><Logo /></span>
          </Link>

          <nav aria-label="Utility navigation" className="flex items-center gap-2">
            <a className="icon-button" href="https://github.com/LoicViennois/The-Binary-Game" target="_blank" rel="noreferrer" aria-label="View source on GitHub">
              <Github aria-hidden="true" size={20} />
            </a>
            <button type="button" className="icon-button" onClick={() => setAboutOpen(true)} aria-label="About The Binary Game">
              <Info aria-hidden="true" size={20} />
            </button>
            {player && !onLoginPage && (
              <button type="button" className="ml-1 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white" onClick={handleLogout} title="Log out">
                <UserRound aria-hidden="true" size={17} className="text-cyan-300" />
                <span className="max-w-28 truncate">{player.name}</span>
                <LogOut aria-hidden="true" size={16} className="text-slate-500" />
              </button>
            )}
          </nav>
        </div>
      </header>
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
