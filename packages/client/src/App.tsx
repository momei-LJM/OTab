import { useState } from 'react';
import { Chrome, Github, Mail, Music, Settings, Terminal } from 'lucide-react';
import styles from './App.module.scss';
import { Dock, DockItem } from './components/Dock/Dock';
import { Window } from './components/Window/Window';
import { Folder } from './components/Folder/Folder';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className={styles.desktop}>
      {/* Desktop Icons Area */}
      <div className={styles.desktopGrid}>
        <Folder name="Projects" onClick={() => console.log('Open Projects')} />
        <Folder
          name="Documents"
          onClick={() => console.log('Open Documents')}
        />
        <Folder
          name="Downloads"
          onClick={() => console.log('Open Downloads')}
        />
        <Folder name="About OTab" onClick={() => setIsAboutOpen(true)} />
      </div>

      {/* Main Content / Wallpaper Area */}
      <div className={styles.centerContent}>
        <h1 className={styles.clock}>
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </h1>
        <div className={styles.date}>
          {new Date().toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </div>
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

      {/* Windows */}
      <Window
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="System Preferences"
      >
        <div style={{ padding: 20 }}>
          <h2>Settings</h2>
          <p>Configure your OTab experience here.</p>
          <br />
          <label style={{ display: 'block', marginBottom: 10 }}>
            <input type="checkbox" defaultChecked /> Enable Glassmorphism
          </label>
          <label style={{ display: 'block', marginBottom: 10 }}>
            <input type="checkbox" defaultChecked /> Show Dock
          </label>
        </div>
      </Window>

      <Window
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        title="About OTab"
      >
        <div style={{ textAlign: 'center', padding: 40 }}>
          <h1 style={{ fontSize: 48, marginBottom: 10 }}></h1>
          <h2>OTab</h2>
          <p>Version 1.0.0</p>
          <br />
          <p>A beautiful macOS-style new tab page.</p>
        </div>
      </Window>
    </div>
  );
}

export default App;
