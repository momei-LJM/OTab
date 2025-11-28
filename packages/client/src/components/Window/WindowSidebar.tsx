import React, { useContext } from 'react';
import styles from './WindowSidebar.module.scss';
import { WindowControls } from './WindowControls';
import { WindowLocalContext } from './WindowLocalContext';

export const WindowSidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { handleDragStart } = useContext(WindowLocalContext);

  return (
    <div className={styles.sidebar} onPointerDown={handleDragStart}>
      <div className={styles.sidebarHeader}>
        <WindowControls />
      </div>
      <div className={styles.sidebarContent}>{children}</div>
    </div>
  );
};
