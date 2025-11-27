import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppContext, WindowsContext } from './context';
import { useAppContext } from './hooks/useAppContext';
import './styles/global.scss';
import './styles/variables.scss';
import { useWindowsContext } from '@/hooks/useWindowsContext';

function Provider({ children }: { children: React.ReactNode }) {
  const ctx = useAppContext();
  const windowsCtx = useWindowsContext();
  return (
    <AppContext.Provider value={ctx}>
      <WindowsContext.Provider value={windowsCtx}>
        {children}
      </WindowsContext.Provider>
    </AppContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
