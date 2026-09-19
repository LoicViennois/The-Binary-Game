import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Info, LogOut, User, Binary } from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';
import { useAuth } from '../hooks/useAuth';
import { AboutModal } from './AboutModal';

export function Header() {
  const { player, loggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-stone-200/80 bg-stone-100/80 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo & Brand */}
          <Link
            to={loggedIn ? '/home' : '/login'}
            className="group flex items-center gap-2.5 transition-transform active:scale-98"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-amber-300 shadow-sm transition-colors group-hover:bg-slate-800">
              <Binary className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                The Binary Game
              </span>
              <span className="hidden text-[10px] font-medium tracking-wide uppercase text-slate-500 sm:inline">
                Puzzle & Math Challenge
              </span>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/LoicViennois/The-Binary-Game"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub repository"
              aria-label="GitHub repository"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-stone-200/60 hover:text-slate-900 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <button
              onClick={() => setIsAboutOpen(true)}
              title="About & License"
              aria-label="About and License"
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-stone-200/60 hover:text-slate-900 transition-colors"
            >
              <Info className="h-4 w-4" />
            </button>

            {loggedIn && !isLoginPage && player && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-stone-300">
                <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 shadow-xs border border-stone-200 text-sm font-medium text-slate-800">
                  <User className="h-4 w-4 text-indigo-600" />
                  <span className="max-w-[100px] truncate sm:max-w-[140px]">{player.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Log out"
                  aria-label="Log out"
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
}
