import { Chrome, Github, Mail, Music, Settings, Terminal } from 'lucide-react';
import { useContext, useState } from 'react';
import styles from '@/App.module.scss';
import { Clock } from '@/components/Clock';
import { Dock, DockItem } from '@/components/Dock/Dock';
import { Folder } from '@/components/Folder/Folder';
import { SearchBar } from '@/components/SearchBar';
import { AppContext } from '@/context';
import { WindowManager } from './components/WindowManager';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const ctx = useContext(AppContext);

  return (
    <div className={styles.desktop}>
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
          <DockItem onClick={() => console.log('Launch Browser')}>
            <Chrome />
          </DockItem>
          <DockItem onClick={() => console.log('Launch Terminal')}>
            <Terminal />
          </DockItem>
          <DockItem onClick={() => console.log('Launch Mail')}>
            <Mail />
          </DockItem>
          <DockItem onClick={() => console.log('Launch Music')}>
            <Music />
          </DockItem>
          <DockItem onClick={() => window.open('https://github.com', '_blank')}>
            <Github />
          </DockItem>
          <div className={styles.divider} />
          <DockItem onClick={() => setIsSettingsOpen(true)}>
            <Settings />
          </DockItem>
        </Dock>
      </div>
      <WindowManager />
    </div>
  );
}

export default App;
