import {
  Chrome,
  Files,
  Folder as FolderIcon,
  Github,
  Mail,
  Music,
  Settings,
  Terminal,
} from 'lucide-react'
import styles from '@/App.module.scss'
import { Bg } from '@/components/Bg/index'
import { Clock } from '@/components/Clock'
import { DesktopGrid } from '@/components/DesktopGrid'
import { Dock, DockItem } from '@/components/Dock/Dock'
import { SearchBar } from '@/components/SearchBar'
import { WindowManager } from '@/components/WindowManager'
import {
  useActiveWindows,
  useAppStore,
  useConfig,
  useFlatedSource,
} from '@/store'

function App() {
  const config = useConfig()
  const activeWindows = useActiveWindows()
  const flatedSource = useFlatedSource()
  const { createWindow, updateWindow, focusWindow } = useAppStore()

  const handleFilesClick = () => {
    if (activeWindows.length === 0) {
      // Open default folder (e.g. first source)
      const firstSource = config.sources[0]
      if (firstSource) {
        createWindow({
          type: 'folder',
          trigger: firstSource.path,
          isOpen: true,
        })
      }
    } else {
      // If there are minimized windows, restore the last one?
      // Or just focus the top-most one.
      // Let's find the top-most window (highest zIndex)
      const topWindow = [...activeWindows].sort(
        (a, b) => b.zIndex - a.zIndex
      )[0]
      if (topWindow) {
        if (topWindow.isMinimized) {
          updateWindow({ trigger: topWindow.trigger, isMinimized: false })
        }
        focusWindow(topWindow.trigger)
      }
    }
  }

  const minimizedWindows = activeWindows.filter((w) => w.isMinimized)

  return (
    <div className={styles.desktop}>
      <Bg url={config.backgroundImageUrl!} />
      <DesktopGrid />

      <div className={styles.centerContent}>
        <Clock />
        <SearchBar />
      </div>

      {/* Dock */}
      <div className={styles.dockContainer}>
        <Dock>
          <DockItem
            onClick={() => console.log('Launch Browser')}
            title="Browser"
          >
            <Chrome />
          </DockItem>
          <DockItem onClick={handleFilesClick} title="Files">
            <Files />
            {activeWindows.length > 0 && <div className={styles.dot} />}
          </DockItem>
          <DockItem
            onClick={() => console.log('Launch Terminal')}
            title="Terminal"
          >
            <Terminal />
          </DockItem>
          <DockItem onClick={() => console.log('Launch Mail')} title="Mail">
            <Mail />
          </DockItem>
          <DockItem onClick={() => console.log('Launch Music')} title="Music">
            <Music />
          </DockItem>
          <DockItem
            onClick={() => window.open('https://github.com', '_blank')}
            title="GitHub"
          >
            <Github />
          </DockItem>

          {minimizedWindows.length > 0 && <div className={styles.divider} />}

          {minimizedWindows.map((win) => (
            <DockItem
              key={win.trigger}
              onClick={() => {
                updateWindow({ trigger: win.trigger, isMinimized: false })
                focusWindow(win.trigger)
              }}
              title={flatedSource.get(win.trigger)?.name || 'Folder'}
            >
              <FolderIcon />
            </DockItem>
          ))}

          <div className={styles.divider} />
          <DockItem
            title="Settings"
            onClick={() =>
              createWindow({
                trigger: 'system:setting',
                type: 'system:setting',
                isOpen: true,
              })
            }
          >
            <Settings />
          </DockItem>
        </Dock>
      </div>
      <WindowManager />
    </div>
  )
}

export default App
