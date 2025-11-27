import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppContext, WindowsContext } from './context';
import { useAppContext } from './hooks/useAppContext';
import './styles/global.scss';
import './styles/variables.scss';
import { useWindowsContext } from '@/hooks/useWindowsContext';

// 拆分成独立的 Provider 组件，避免状态更新互相影响
function AppContextProvider({ children }: { children: React.ReactNode }) {
  const ctx = useAppContext();
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}

function WindowsContextProvider({ children }: { children: React.ReactNode }) {
  const windowsCtx = useWindowsContext();
  return (
    <WindowsContext.Provider value={windowsCtx}>
      {children}
    </WindowsContext.Provider>
  );
}

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <WindowsContextProvider>{children}</WindowsContextProvider>
    </AppContextProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
