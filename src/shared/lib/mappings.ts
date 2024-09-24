export function reverseMapType<T>(value: string) {
  return (value[0].toUpperCase() + value.slice(1)) as T[keyof T];
}
