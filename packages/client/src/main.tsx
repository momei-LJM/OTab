import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useWindowsContext } from '@/hooks/useWindowsContext'
import App from './App'
import { AppContext, WindowsContext } from './context'
import { useAppContext } from './hooks/useAppContext'
import './styles/global.scss'
import './styles/variables.scss'

// 拆分成独立的 Provider 组件，避免状态更新互相影响
function AppContextProvider({ children }: { children: React.ReactNode }) {
  const ctx = useAppContext()
  return <AppContext value={ctx}>{children}</AppContext>
}

function WindowsContextProvider({ children }: { children: React.ReactNode }) {
  const windowsCtx = useWindowsContext()
  return (
    <WindowsContext value={windowsCtx}>
      {children}
    </WindowsContext>
  )
}

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <WindowsContextProvider>{children}</WindowsContextProvider>
    </AppContextProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
