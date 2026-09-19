import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RotateCcw, Ban, Home, Trophy, X } from 'lucide-react';
import { useBinaryGame } from '../hooks/useBinaryGame';
import { useTimer } from '../hooks/useTimer';
import { useHighScores } from '../hooks/useHighScores';
import { useAuth } from '../hooks/useAuth';
import { Grid } from '../components/game/Grid';
import { TimerDisplay } from '../components/game/TimerDisplay';
import { HighScores } from '../components/game/HighScores';
import { VictoryModal } from '../components/game/VictoryModal';

export function GamePage() {
  const { size: sizeParam } = useParams<{ size: string }>();
  const navigate = useNavigate();
  const { player } = useAuth();

  const size = Math.min(8, Math.max(3, parseInt(sizeParam ?? '4', 10) || 4));

  const {
    grid,
    rowTarget,
    colTarget,
    rowTot,
    colTot,
    isCompleted,
    toggleCell,
    restart: restartGame,
  } = useBinaryGame(size);

  const { elapsed, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer();
  const { bestScores, addHighScore } = useHighScores(size);

  const [stopped, setStopped] = useState(false);
  const [winTime, setWinTime] = useState<number | null>(null);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [mobileScoresOpen, setMobileScoresOpen] = useState(false);

  // Keep track of score saving to avoid duplicates
  const hasSavedScoreRef = useRef(false);

  // Initialize game timer on mount or restart
  useEffect(() => {
    startTimer();
    setStopped(false);
    setWinTime(null);
    setShowVictoryModal(false);
    hasSavedScoreRef.current = false;
  }, [size, startTimer]);

  // Handle victory completion
  useEffect(() => {
    if (isCompleted && !stopped && !hasSavedScoreRef.current) {
      stopTimer();
      setStopped(true);
      const finalTime = elapsed;
      setWinTime(finalTime);
      setShowVictoryModal(true);
      hasSavedScoreRef.current = true;

      if (player) {
        addHighScore(player, finalTime);
      }
    }
  }, [isCompleted, stopped, elapsed, stopTimer, player, addHighScore]);

  const handleStop = useCallback(() => {
    stopTimer();
    setStopped(true);
  }, [stopTimer]);

  const handleRestart = useCallback(() => {
    restartGame();
    resetTimer();
    startTimer();
    setStopped(false);
    setWinTime(null);
    setShowVictoryModal(false);
    hasSavedScoreRef.current = false;
  }, [restartGame, resetTimer, startTimer]);

  const handleHome = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  const handleNextSize = useCallback(() => {
    if (size < 8) {
      navigate(`/play/${size + 1}`);
    }
  }, [navigate, size]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      {/* Responsive layout: Desktop 3-columns, Mobile stacked */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-8">
        {/* Left Column: Timer & Controls (Desktop) / Header bar (Mobile) */}
        <div className="flex flex-col items-center lg:items-start gap-4 lg:w-72 order-1 lg:order-1">
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Elapsed Time
            </span>
            <TimerDisplay timeMs={winTime !== null ? winTime : elapsed} isWinningTime={isCompleted} />
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            {!stopped ? (
              <button
                onClick={handleStop}
                type="button"
                className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-rose-700 transition-colors active:scale-98"
              >
                <Ban className="h-4 w-4" />
                Stop
              </button>
            ) : (
              <>
                <button
                  onClick={handleRestart}
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors active:scale-98"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restart
                </button>
                <button
                  onClick={handleHome}
                  type="button"
                  className="flex items-center gap-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-700 transition-colors active:scale-98"
                >
                  <Home className="h-4 w-4" />
                  Home
                </button>
              </>
            )}
          </div>
        </div>

        {/* Center Column: Binary Grid */}
        <div className="flex flex-col items-center justify-center order-2 lg:order-2 flex-1">
          <div className="mb-3 text-center">
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">
              {size}&times;{size} Binary Grid
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Match the decimal target values for every row and column
            </p>
          </div>

          <Grid
            size={size}
            grid={grid}
            rowTot={rowTot}
            colTot={colTot}
            rowTarget={rowTarget}
            colTarget={colTarget}
            stopped={stopped}
            success={isCompleted}
            onCellClick={toggleCell}
          />
        </div>

        {/* Right Column: High Scores (Desktop) */}
        <div className="hidden lg:block lg:w-80 order-3">
          <HighScores scores={bestScores} gameSize={size} />
        </div>
      </div>

      {/* Mobile Floating Leaderboard Button */}
      <div className="fixed bottom-5 right-5 z-30 lg:hidden">
        <button
          onClick={() => setMobileScoresOpen(true)}
          type="button"
          aria-label="Open Leaderboard"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-amber-300 dark:bg-indigo-600 dark:text-white shadow-lg border border-slate-700 dark:border-indigo-500 active:scale-95 transition-transform"
        >
          <Trophy className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Drawer / Slide-in Panel for High Scores */}
      {mobileScoresOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-xs lg:hidden animate-in fade-in">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-t-3xl bg-white dark:bg-slate-900 p-5 shadow-2xl border-t border-stone-200 dark:border-slate-800 animate-in slide-in-from-bottom duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-bold text-slate-900 dark:text-white">Leaderboard</h3>
              </div>
              <button
                onClick={() => setMobileScoresOpen(false)}
                type="button"
                aria-label="Close leaderboard"
                className="rounded-lg p-1 text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 max-h-[60vh] overflow-y-auto">
              <HighScores scores={bestScores} gameSize={size} />
            </div>
          </div>
        </div>
      )}

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={showVictoryModal}
        timeMs={winTime ?? elapsed}
        size={size}
        onRestart={handleRestart}
        onHome={handleHome}
        onNextSize={size < 8 ? handleNextSize : undefined}
      />
    </div>
  );
}
