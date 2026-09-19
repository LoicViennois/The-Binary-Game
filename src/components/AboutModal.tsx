import { useEffect, useRef } from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { gitInfo } from '../git-info';
import { GithubIcon, RedditIcon } from './icons/BrandIcons';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const commitUrl =
    gitInfo.commitSha && gitInfo.commitSha !== 'dev'
      ? `https://github.com/LoicViennois/The-Binary-Game/commit/${gitInfo.commitSha}`
      : 'https://github.com/LoicViennois/The-Binary-Game';

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      className="m-auto w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-0 text-slate-800 dark:text-slate-200 shadow-2xl border border-slate-200/80 dark:border-slate-800 backdrop:bg-slate-950/60 backdrop:backdrop-blur-xs transition-all duration-200"
      aria-labelledby="about-dialog-title"
    >
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 id="about-dialog-title" className="text-lg font-semibold text-slate-900 dark:text-white">
            About The Binary Game
          </h2>
        </div>
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 px-6 py-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-700">
          <p className="font-medium text-slate-900 dark:text-white">
            The Binary Game &bull; Build{' '}
            <a
              href={commitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline underline-offset-2"
            >
              {gitInfo.shortSha}
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Copyright &copy; 2020-{new Date().getFullYear()} by{' '}
            <a
              href="https://github.com/LoicViennois"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 underline underline-offset-2"
            >
              Loïc Viennois
            </a>
          </p>
        </div>

        <p>
          This program is free software: you can redistribute it and/or modify it under the terms of
          the GNU General Public License as published by the Free Software Foundation, either version 3
          of the License, or (at your option) any later version.
        </p>

        <p>
          See the{' '}
          <a
            href="https://www.gnu.org/licenses/gpl-3.0.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline underline-offset-2"
          >
            GNU General Public License v3
          </a>{' '}
          for more details.
        </p>

        <hr className="border-slate-100 dark:border-slate-800" />

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Send Feedback & Support
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href="https://github.com/LoicViennois/The-Binary-Game/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span>File an issue or suggestion on GitHub</span>
                <ExternalLink className="ml-auto w-3.5 h-3.5 text-slate-400" />
              </a>
            </li>
            <li>
              <a
                href="https://www.reddit.com/message/compose/?to=LoicViennois"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <RedditIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>Send a message on Reddit</span>
                <ExternalLink className="ml-auto w-3.5 h-3.5 text-slate-400" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </dialog>
  );
}
