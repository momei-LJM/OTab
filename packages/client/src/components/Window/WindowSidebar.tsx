import React, { useContext } from 'react';
import styles from './WindowSidebar.module.scss';
import { WindowControls } from './WindowControls';
import { WindowLocalContext } from './WindowLocalContext';
import { GlassContainer } from '../GlassContainer/GlassContainer';

export const WindowSidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { handleDragStart } = useContext(WindowLocalContext);

  return (
    <GlassContainer className={styles.sidebar} onPointerDown={handleDragStart}>
      <div className={styles.sidebarHeader}>
        <WindowControls />
      </div>
      <div className={styles.sidebarContent}>{children}</div>
    </GlassContainer>
  );
};
