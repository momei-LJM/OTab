import { use } from 'react'
import { Window } from '@/components/Window/Window'
import { AppContext, WindowsContext } from '@/context'
import { WindowContent } from '../WindowContent/WindowContent'

export const WindowManager: React.FC = () => {
  const { flatedSource } = use(AppContext)
  const {
    closeWindow,
    focusWindow,
    updateWindow,
    activeWindows,
    minimizeWindow,
    toggleMaximizeWindow,
  } = use(WindowsContext)
  return (
    <div>
      {activeWindows.map((win) => (
        <Window
          key={win.trigger}
          isOpen={win.isOpen}
          isMinimized={win.isMinimized}
          isMaximized={win.isMaximized}
          onClose={() => closeWindow(win.trigger)}
          onMinimize={() => minimizeWindow(win.trigger)}
          onMaximize={() => toggleMaximizeWindow(win.trigger)}
          title={
            flatedSource.get(win.currentPath || win.trigger)?.name || 'unknown'
          }
          style={{ zIndex: win.zIndex, ...(win.style || {}) }}
          onFocus={() => focusWindow(win)}
          onUpdate={(updates) => {
            updateWindow({
              ...win,
              style: {
                ...win.style,
                ...updates,
              },
            })
          }}
          hideControls={true}
          variant={win.type === 'folder' ? 'glass' : 'default'}
        >
          <WindowContent data={win} />
        </Window>
      ))}
    </div>
  )
}
