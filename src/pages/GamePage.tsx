import { ChevronLeft, House, RotateCcw, Square, Trophy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { GameBoard } from '../components/GameBoard';
import { HighScores } from '../components/HighScores';
import { formatTime } from '../lib/game';
import { saveHighScore } from '../lib/storage';
import type { GameStatus } from '../types';

export function GamePage() {
  const { size: sizeParameter } = useParams();
  const { player } = useAuth();
  const size = Number(sizeParameter);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [elapsed, setElapsed] = useState(0);
  const [round, setRound] = useState(0);
  const [scoreRefreshKey, setScoreRefreshKey] = useState(0);
  const startedAt = useRef(0);

  useEffect(() => {
    if (status !== 'playing') return;
    if (startedAt.current === 0) startedAt.current = Date.now();
    const timer = window.setInterval(() => setElapsed(Date.now() - startedAt.current), 10);
    return () => window.clearInterval(timer);
  }, [status, round]);

  if (!Number.isInteger(size) || size < 3 || size > 8) return <Navigate to="/home" replace />;

  function completeGame() {
    if (!player) return;
    const finalTime = Date.now() - startedAt.current;
    setElapsed(finalTime);
    setStatus('won');
    saveHighScore(size, player, finalTime);
    setScoreRefreshKey((key) => key + 1);
  }

  function stopGame() {
    setElapsed(Date.now() - startedAt.current);
    setStatus('stopped');
  }

  function restartGame() {
    startedAt.current = Date.now();
    setElapsed(0);
    setStatus('playing');
    setRound((value) => value + 1);
  }

  return (
    <div className="py-2 sm:py-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Link to="/home" className="secondary-button px-3 sm:px-4">
          <ChevronLeft aria-hidden="true" size={18} /> <span className="hidden sm:inline">Grid selection</span><span className="sm:hidden">Back</span>
        </Link>
        <div className="text-right">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Current grid</p>
          <h1 className="text-xl font-bold text-white">{size} × {size}</h1>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[13rem_minmax(0,1fr)_17rem] xl:gap-8">
        <aside className="order-2 grid grid-cols-2 gap-3 lg:order-1 lg:grid-cols-1" aria-label="Game status">
          <section className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4 lg:p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">Timer</p>
            <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-cyan-300 sm:text-3xl">{formatTime(elapsed)}</p>
          </section>
          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 lg:p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Status</p>
            <p className={`mt-2 text-base font-bold sm:text-lg ${status === 'won' ? 'text-emerald-300' : status === 'stopped' ? 'text-rose-300' : 'text-white'}`}>
              {status === 'won' ? 'Grid solved' : status === 'stopped' ? 'Game stopped' : 'In progress'}
            </p>
          </section>
        </aside>

        <section className="order-1 flex min-w-0 flex-col items-center rounded-[2rem] border border-white/10 bg-slate-900/55 px-3 py-5 shadow-2xl shadow-slate-950/30 sm:px-6 sm:py-7 lg:order-2" aria-label="Game board">
          <p className="mb-4 max-w-lg text-center text-sm leading-6 text-slate-400">Flip the bits. A target lights up when its row or column is correct.</p>
          <GameBoard key={round} size={size} status={status} onCompleted={completeGame} />

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {status === 'playing' ? (
              <button type="button" className="danger-button" onClick={stopGame}><Square aria-hidden="true" size={16} fill="currentColor" /> Stop</button>
            ) : (
              <>
                <Link to="/home" className="secondary-button"><House aria-hidden="true" size={17} /> Home</Link>
                <button type="button" className="primary-button" onClick={restartGame}><RotateCcw aria-hidden="true" size={17} /> Play again</button>
              </>
            )}
          </div>
        </section>

        <aside className="order-3 hidden lg:block"><HighScores game={size} refreshKey={scoreRefreshKey} /></aside>
      </div>

      <details className="group mt-5 rounded-3xl border border-white/10 bg-slate-900/60 lg:hidden">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-5 font-semibold text-white">
          <span className="inline-flex items-center gap-2"><Trophy size={18} className="text-amber-300" aria-hidden="true" /> High scores</span>
          <span className="font-mono text-xs text-slate-500 group-open:hidden">OPEN</span>
          <span className="hidden font-mono text-xs text-slate-500 group-open:inline">CLOSE</span>
        </summary>
        <div className="px-3 pb-3"><HighScores game={size} refreshKey={scoreRefreshKey} /></div>
      </details>
    </div>
  );
}
