import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { player, loggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = (val: string): boolean => {
    const trimmed = val.trim();
    if (trimmed.length < 3) {
      setError('Username must be at least 3 characters long.');
      return false;
    }
    if (trimmed.length > 12) {
      setError('Username must not exceed 12 characters.');
      return false;
    }
    const regex = /^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]*$/;
    if (!regex.test(trimmed)) {
      setError('Only alphanumeric and accented letters are allowed.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);
    if (error) validate(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(username)) {
      login(username);
      navigate('/home');
    }
  };

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Welcome Banner */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-amber-300 shadow-md">
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome to The Binary Game
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            A fast-paced binary puzzle. Align the bits, match row and column totals, and beat the clock!
          </p>
        </div>

        {/* Existing Player Card */}
        {loggedIn && player && (
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-stone-200 text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
              <UserCheck className="h-4 w-4 text-emerald-600" />
              <span>Signed in as <span className="text-indigo-600 font-bold">{player.name}</span></span>
            </div>
            <button
              onClick={handleContinue}
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors active:scale-98"
            >
              <Play className="h-4 w-4 fill-current" />
              Play as {player.name}
            </button>
          </div>
        )}

        {/* New / Switch Player Form */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-stone-200">
          <h2 className="text-base font-semibold text-slate-900">
            {loggedIn ? 'Or play with a different username' : 'Choose your player username'}
          </h2>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="username-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Username (3-12 characters)
              </label>
              <div className="mt-1.5">
                <input
                  id="username-input"
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="e.g. Neo, Ada, Turing"
                  className={`
                    w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400
                    transition-colors focus:outline-hidden focus:ring-2
                    ${
                      error
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                        : 'border-stone-300 focus:border-indigo-500 focus:ring-indigo-100'
                    }
                  `}
                />
              </div>
              {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={username.trim().length < 3}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-98"
            >
              <Play className="h-4 w-4 fill-current" />
              Start Game
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
