import {
  Chrome,
  Github,
  Mail,
  Music,
  Settings,
  Terminal,
  Folder as FolderIcon,
  Files,
} from 'lucide-react';
import { useContext, useState } from 'react';
import styles from '@/App.module.scss';
import { Clock } from '@/components/Clock';
import { Dock, DockItem } from '@/components/Dock/Dock';
import { Folder } from '@/components/Folder/Folder';
import { SearchBar } from '@/components/SearchBar';
import { AppContext, WindowsContext } from '@/context';
import { WindowManager } from '@/components/WindowManager';
import { Bg } from '@/components/Bg/index';
function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const ctx = useContext(AppContext);
  const { activeWindows, focusWindow, createWindow, updateWindow } =
    useContext(WindowsContext);

  const handleFilesClick = () => {
    if (activeWindows.length === 0) {
      // Open default folder (e.g. first source)
      const firstSource = ctx.appContext.config.sources[0];
      if (firstSource) {
        createWindow({
          type: 'folder',
          trigger: firstSource.path,
          isOpen: true,
        });
      }
    } else {
      // If there are minimized windows, restore the last one?
      // Or just focus the top-most one.
      // Let's find the top-most window (highest zIndex)
      const topWindow = [...activeWindows].sort(
        (a, b) => b.zIndex - a.zIndex
      )[0];
      if (topWindow) {
        if (topWindow.isMinimized) {
          updateWindow({ ...topWindow, isMinimized: false });
        }
        focusWindow(topWindow);
      }
    }
  };

  const minimizedWindows = activeWindows.filter((w) => w.isMinimized);

  return (
    <div className={styles.desktop}>
      <Bg url={ctx.appContext.config.backgroundImageUrl!} />
      {/* Desktop Icons Area */}
      <div className={styles.desktopGrid}>
        {ctx.appContext.config.sources.map((source) => (
          <Folder key={source.path} name={source.name} source={source} />
        ))}
      </div>

      {/* Main Content / Wallpaper Area */}
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
                updateWindow({ ...win, isMinimized: false });
                focusWindow(win);
              }}
              title={ctx.flatedSource.get(win.trigger)?.name || 'Folder'}
            >
              <FolderIcon />
            </DockItem>
          ))}

          <div className={styles.divider} />
          <DockItem onClick={() => setIsSettingsOpen(true)} title="Settings">
            <Settings />
          </DockItem>
        </Dock>
      </div>
      <WindowManager />
    </div>
  );
}

export default App;
