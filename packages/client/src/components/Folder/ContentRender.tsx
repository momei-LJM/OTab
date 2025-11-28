import { WindowSnapshot } from '@/config';
import { AppContext, WindowsContext } from '@/context';
import { useContext } from 'react';
import styles from './Folder.module.scss';
import { Folder } from './Folder';
import {
  Folder as FolderIcon,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  Search,
  LayoutGrid,
  List,
  MoreHorizontal,
} from 'lucide-react';
import clsx from 'clsx';
import { WindowLocalContext } from '../Window/WindowLocalContext';
import { WindowSidebar } from '../Window/WindowSidebar';
import { GlassContainer } from '../GlassContainer';

export const ContentRender: React.FC<{ data?: WindowSnapshot }> = ({
  data,
}) => {
  const { flatedSource, appContext } = useContext(AppContext);
  const { updateWindow } = useContext(WindowsContext);
  const { handleDragStart } = useContext(WindowLocalContext);

  const currentPath = data?.currentPath || data?.trigger || '';
  const show = flatedSource.get(currentPath);
  const sources = appContext.config.sources;
  const parentPath = show?.parent;

  const handleSidebarClick = (path: string) => {
    if (data) {
      updateWindow({
        ...data,
        currentPath: path,
      });
    }
  };

  const handleBack = () => {
    if (parentPath) {
      handleSidebarClick(parentPath);
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <WindowSidebar>
        <div className={styles.sidebarGroup}>
          <div className={styles.sidebarGroupTitle}>Favorites</div>
          {sources.map((source) => (
            <div
              key={source.path}
              className={clsx(styles.sidebarItem, {
                [styles.active]: currentPath === source.path,
              })}
              onClick={(e) => {
                e.stopPropagation();
                handleSidebarClick(source.path);
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <FolderIcon
                size={16}
                fill={currentPath === source.path ? '#007aff' : 'currentColor'}
                stroke={
                  currentPath === source.path ? '#007aff' : 'currentColor'
                }
              />
              <span>{source.name}</span>
            </div>
          ))}
        </div>

        <div className={styles.sidebarGroup}>
          <div className={styles.sidebarGroupTitle}>Locations</div>
          <div className={styles.sidebarItem}>
            <HardDrive size={16} />
            <span>Macintosh HD</span>
          </div>
          <div className={styles.sidebarItem}>
            <HardDrive size={16} />
            <span>iCloud Drive</span>
          </div>
        </div>
      </WindowSidebar>

      {/* Main Content */}
      <div className={styles.main}>
        <div className={styles.toolbar} onPointerDown={handleDragStart}>
          <div
            className={styles.navControls}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <GlassContainer className={styles.navControls} linear={false}>
              <button
                className={styles.navButton}
                disabled={!parentPath}
                onClick={handleBack}
                title="Go Back"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                className={styles.navButton}
                disabled={true}
                title="Go Forward"
              >
                <ChevronRight size={30} />
              </button>
            </GlassContainer>
          </div>

          <span className={styles.pathTitle}>{show?.name}</span>

          <div
            className={styles.toolbarControls}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button className={styles.toolbarButton}>
              <LayoutGrid size={16} />
            </button>
            <button className={styles.toolbarButton}>
              <List size={16} />
            </button>
            <button className={styles.toolbarButton}>
              <Search size={16} />
            </button>
          </div>
        </div>
        <div className={styles.content}>
          {show?.children?.map((child) =>
            child.type === 'floder' ? (
              <Folder
                key={child.path}
                name={child.name}
                source={child}
                onClick={() => handleSidebarClick(child.path)}
              />
            ) : (
              <div
                key={child.path}
                className={styles.appItem}
                onClick={() => {
                  if (child.url) {
                    window.open(child.url, '_blank');
                  }
                }}
              >
                <div className={styles.iconWrapper}>
                  <img
                    src={child.icon}
                    alt={child.name}
                    className={styles.appIcon}
                    style={child.style}
                  />
                </div>
                <span className={styles.name}>{child.name}</span>
              </div>
            )
          )}
          {(!show?.children || show.children.length === 0) && (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <FolderIcon size={48} opacity={0.2} />
              <span>Empty Folder</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
