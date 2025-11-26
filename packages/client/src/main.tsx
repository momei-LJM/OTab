import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppContext } from './context';
import { useAppContext } from './hooks/useAppContext';
import './styles/global.scss';

function Provider({ children }: { children: React.ReactNode }) {
  const ctx = useAppContext();
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
