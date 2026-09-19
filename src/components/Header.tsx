import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Info, LogOut, User, Binary, Sun, Moon } from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { AboutModal } from './AboutModal';

export function Header() {
  const { player, loggedIn, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
      <header className="sticky top-0 z-30 w-full border-b border-stone-200/80 bg-stone-100/80 dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo & Brand */}
          <Link
            to={loggedIn ? '/home' : '/login'}
            className="group flex items-center gap-2.5 transition-transform active:scale-98"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-amber-300 dark:bg-indigo-600 dark:text-white shadow-sm transition-colors group-hover:bg-slate-800 dark:group-hover:bg-indigo-500">
              <Binary className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
                The Binary Game
              </span>
              <span className="hidden text-[10px] font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400 sm:inline">
                Puzzle & Math Challenge
              </span>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-stone-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-4.5 w-4.5 text-amber-400" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-slate-700" />
              )}
            </button>

            <a
              href="https://github.com/LoicViennois/The-Binary-Game"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub repository"
              aria-label="GitHub repository"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-stone-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <button
              onClick={() => setIsAboutOpen(true)}
              title="About & License"
              aria-label="About and License"
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-stone-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            >
              <Info className="h-4 w-4" />
            </button>

            {loggedIn && !isLoginPage && player && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-stone-300 dark:border-slate-700">
                <div className="flex items-center gap-2 rounded-xl bg-white dark:bg-slate-800 px-3 py-1.5 shadow-xs border border-stone-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-200">
                  <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="max-w-[100px] truncate sm:max-w-[140px]">{player.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Log out"
                  aria-label="Log out"
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors"
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
