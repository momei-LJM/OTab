import { Window } from '@/components/Window/Window'
import { useActiveWindows, useAppStore, useFlatedSource } from '@/store'
import { WindowContent } from '../WindowContent/WindowContent'

export const WindowManager: React.FC = () => {
  const flatedSource = useFlatedSource()
  const activeWindows = useActiveWindows()
  const {
    closeWindow,
    focusWindow,
    updateWindow,
    minimizeWindow,
    toggleMaximizeWindow,
  } = useAppStore()

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
          onFocus={() => focusWindow(win.trigger)}
          onUpdate={(updates) => {
            updateWindow({
              trigger: win.trigger,
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
