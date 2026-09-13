export function zeros(size: number): number[] {
  return fill(size, 0);
}

export function fill<T>(size: number, value: T): T[] {
  return new Array(size).fill(value);
}
