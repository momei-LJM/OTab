import { AppCtx, WindowSnapshot } from '@/config';
import { defaultData } from '@/hooks/useAppContext';
import { createContext } from 'react';

export const AppContext = createContext<{
  appContext: AppCtx;
  setAppContext: React.Dispatch<React.SetStateAction<AppCtx>>;
  flatedSource: Map<string, (typeof defaultData.config.sources)[number]>;
}>({
  appContext: defaultData,
  setAppContext: () => {},
  flatedSource: new Map(),
});

export const WindowsContext = createContext<{
  activeWindows: WindowSnapshot[];
  createWindow: (window: Omit<WindowSnapshot, 'zIndex'>) => void;
  focusWindow: (window: WindowSnapshot) => void;
  updateWindow: (window: WindowSnapshot) => void;
  closeWindow: (trigger: string) => void;
  minimizeWindow: (trigger: string) => void;
  toggleMaximizeWindow: (trigger: string) => void;
}>({
  activeWindows: [],
  createWindow: () => {},
  focusWindow: () => {},
  updateWindow: () => {},
  closeWindow: () => {},
  minimizeWindow: () => {},
  toggleMaximizeWindow: () => {},
});
