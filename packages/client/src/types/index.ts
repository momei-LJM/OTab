declare global {
  type WithStyle<T> = T & { style?: React.CSSProperties };
}
export {};
