export function reverseMapType<T extends Record<string, string>>(value: string, mapping: T) {
  const formatted = value[0].toUpperCase() + value.slice(1);
  return mapping[formatted as keyof T];
}
