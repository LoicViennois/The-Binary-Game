export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="grid h-10 w-10 grid-cols-2 overflow-hidden rounded-xl border border-cyan-300/30 bg-slate-950 p-1 font-mono text-[11px] font-bold leading-4 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
        <span className="text-cyan-300">1</span>
        <span className="text-slate-500">0</span>
        <span className="text-slate-500">0</span>
        <span className="text-amber-300">1</span>
      </span>
      {!compact && (
        <span className="text-left leading-tight">
          <span className="block font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">The</span>
          <span className="block text-base font-bold tracking-tight text-white">Binary Game</span>
        </span>
      )}
    </span>
  );
}
