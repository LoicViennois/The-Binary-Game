import { ArrowRight, Binary, Gauge, Grid3X3 } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const USERNAME_PATTERN = /^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]*$/;

export function LoginPage() {
  const { player, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const trimmedUsername = username.trim();
  const valid = trimmedUsername.length >= 3 && trimmedUsername.length <= 12 && USERNAME_PATTERN.test(trimmedUsername);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid) return;
    login(trimmedUsername);
    navigate('/home');
  }

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-8rem)] max-w-6xl items-center gap-10 py-8 lg:grid-cols-[1.1fr_.9fr] lg:py-12">
      <section className="max-w-2xl text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-cyan-300">
          <Binary size={15} aria-hidden="true" /> Learn by playing
        </div>
        <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
          Think in bits.<br />Move at speed.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
          Flip zeros and ones until every row and column matches its decimal target. Simple rules, surprisingly sharp puzzles.
        </p>
        <div className="mt-8 grid max-w-lg grid-cols-2 gap-3 text-sm text-slate-300">
          <div className="feature-chip"><Grid3X3 size={18} className="text-cyan-300" aria-hidden="true" /> 6 grid sizes</div>
          <div className="feature-chip"><Gauge size={18} className="text-amber-300" aria-hidden="true" /> Beat your time</div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/85 p-6 shadow-2xl shadow-cyan-950/30 sm:p-8">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden="true" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Player setup</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Choose your name</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">It stays on this device and appears beside your best scores.</p>

        {player && (
          <button type="button" className="mt-6 flex min-h-14 w-full items-center justify-between rounded-2xl border border-emerald-300/20 bg-emerald-300/5 px-4 text-left transition hover:border-emerald-300/40 hover:bg-emerald-300/10" onClick={() => navigate('/home')}>
            <span>
              <span className="block text-xs uppercase tracking-wider text-emerald-300">Continue as</span>
              <span className="block font-semibold text-white">{player.name}</span>
            </span>
            <ArrowRight aria-hidden="true" className="text-emerald-300" />
          </button>
        )}

        <form className="mt-6" onSubmit={submit} noValidate>
          <label htmlFor="username" className="text-sm font-semibold text-slate-200">{player ? 'Or use another name' : 'Username'}</label>
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-2 min-h-14 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
            placeholder="3–12 characters"
            minLength={3}
            maxLength={12}
            autoComplete="nickname"
            autoFocus={!player}
            aria-describedby="username-help"
          />
          <p id="username-help" className="mt-2 text-xs leading-5 text-slate-500">Letters (including accents) and numbers only.</p>
          <button type="submit" className="primary-button mt-6 w-full" disabled={!valid}>
            Enter the game <ArrowRight aria-hidden="true" size={18} />
          </button>
        </form>
      </section>
    </div>
  );
}
