import { AppContext, WindowsContext } from '@/context'
import { useAppContext } from '@/hooks/useAppContext'
import { useWindowsContext } from '@/hooks/useWindowsContext'

// 拆分成独立的 Provider 组件，避免状态更新互相影响
function AppContextProvider({ children }: { children: React.ReactNode }) {
  const ctx = useAppContext()
  return <AppContext value={ctx}>{children}</AppContext>
}

function WindowsContextProvider({ children }: { children: React.ReactNode }) {
  const windowsCtx = useWindowsContext()
  return <WindowsContext value={windowsCtx}>{children}</WindowsContext>
}

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <WindowsContextProvider>{children}</WindowsContextProvider>
    </AppContextProvider>
  )
}
