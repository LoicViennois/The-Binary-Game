export function zeros(size: number): number[] {
  return fill(size, 0);
}

export function fill<T>(size: number, value: T): T[] {
  return new Array(size).fill(value);
}

export function range(size: number): number[] {
  return Array.from({ length: size }, (_, i) => i);
}

export function arraysEqual<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((val, idx) => val === b[idx]);
}
