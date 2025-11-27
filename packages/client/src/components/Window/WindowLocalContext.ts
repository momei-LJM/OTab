import { createContext } from 'react';

export const WindowLocalContext = createContext<{
  handleDragStart: (e: React.PointerEvent) => void;
}>({
  handleDragStart: () => {},
});
