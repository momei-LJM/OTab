import { AppCtx, WindowSnapshot } from '@/config';
import { defaultData } from '@/hooks/useAppContext';
import { createContext } from 'react';

export const AppContext = createContext<{
  appContext: AppCtx;
  setAppContext: React.Dispatch<React.SetStateAction<AppCtx>>;
  flatedSource: Map<string, (typeof defaultData.config.sources)[number]>;
  windowContext: {
    activeWindows: WindowSnapshot[];
    createWindow: (window: Omit<WindowSnapshot, 'zIndex'>) => void;
    updateWindow: (window: WindowSnapshot) => void;
    closeWindow: (trigger: string) => void;
    focusWindow: (window: WindowSnapshot) => void;
  };
}>({
  appContext: defaultData,
  setAppContext: () => {},
  flatedSource: new Map(),
  windowContext: {
    activeWindows: [],
    createWindow: () => {},
    updateWindow: () => {},
    closeWindow: () => {},
    focusWindow: () => {},
  },
});
