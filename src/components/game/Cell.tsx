interface CellProps {
  row: number;
  col: number;
  value: number;
  disabled?: boolean;
  onClick: (row: number, col: number) => void;
}

export function Cell({ row, col, value, disabled = false, onClick }: CellProps) {
  const isOne = value === 1;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick(row, col)}
      aria-label={`Row ${row + 1}, Column ${col + 1}, value ${value}`}
      className={`
        relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl font-mono text-xl sm:text-2xl font-bold
        transition-all duration-150 select-none shadow-xs
        focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        ${disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer active:scale-95 hover:shadow-sm'}
        ${
          isOne
            ? 'bg-slate-900 text-amber-300 ring-2 ring-slate-800 shadow-slate-900/20'
            : 'bg-white text-slate-700 border border-stone-300 hover:border-stone-400 hover:bg-stone-50'
        }
      `}
    >
      <span className="transition-transform duration-100">{value}</span>
    </button>
  );
}
