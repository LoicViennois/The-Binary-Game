import { ExternalLink, Github, X } from 'lucide-react';
import { gitInfo } from '../git-info';

interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AboutDialog({ open, onClose }: AboutDialogProps) {
  if (!open) return null;

  const commitUrl =
    gitInfo.commitSha === 'dev'
      ? 'https://github.com/LoicViennois/The-Binary-Game'
      : `https://github.com/LoicViennois/The-Binary-Game/commit/${gitInfo.commitSha}`;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <section
        aria-labelledby="about-title"
        aria-modal="true"
        role="dialog"
        className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 text-left shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">About</p>
            <h2 id="about-title" className="mt-1 text-2xl font-bold text-white">The Binary Game</h2>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Close dialog">
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <p className="mt-5 leading-7 text-slate-300">
          A small puzzle game by Loïc Viennois. Flip bits until every row and column matches its decimal target.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a className="secondary-button" href="https://github.com/LoicViennois/The-Binary-Game/issues/new" target="_blank" rel="noreferrer">
            <Github aria-hidden="true" size={17} /> Report an issue
          </a>
          <a className="secondary-button" href={commitUrl} target="_blank" rel="noreferrer">
            Build {gitInfo.shortSha} <ExternalLink aria-hidden="true" size={15} />
          </a>
        </div>

        <p className="mt-6 border-t border-slate-800 pt-5 text-sm leading-6 text-slate-400">
          Copyright © 2020 Loïc Viennois. Released under the GNU General Public License v3.
        </p>
      </section>
    </div>
  );
}
