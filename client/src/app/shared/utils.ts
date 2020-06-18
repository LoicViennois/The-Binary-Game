export function zeros (size: number) {
  return fill(size, 0)
}

export function fill<T> (size: number, value: T) {
  return new Array(size).fill(value)
}
