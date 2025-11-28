import React, { use } from 'react'
import { GlassContainer } from '../GlassContainer/GlassContainer'
import { WindowControls } from './WindowControls'
import { WindowLocalContext } from './WindowLocalContext'
import styles from './WindowSidebar.module.scss'

export const WindowSidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { handleDragStart } = use(WindowLocalContext)

  return (
    <GlassContainer className={styles.sidebar} onPointerDown={handleDragStart}>
      <div className={styles.sidebarHeader}>
        <WindowControls />
      </div>
      <div className={styles.sidebarContent}>{children}</div>
    </GlassContainer>
  )
}
