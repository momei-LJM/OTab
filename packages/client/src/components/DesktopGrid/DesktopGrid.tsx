import type { CSSProperties } from 'react'
import { use, useCallback } from 'react'
import { AppContext } from '@/context'
import styles from './DesktopGrid.module.scss'
import { DesktopIcon } from './DesktopIcon'

export const DesktopGrid = () => {
  const { appContext, setAppContext } = use(AppContext)

  const desktopSources = appContext.config.sources.filter(
    (source) => source.parent === 'desktop'
  )

  const updateSourceStyle = useCallback(
    (path: string, style: CSSProperties) => {
      setAppContext((prev) => ({
        ...prev,
        config: {
          ...prev.config,
          sources: prev.config.sources.map((s) =>
            s.path === path ? { ...s, style: { ...s.style, ...style } } : s
          ),
        },
      }))
    },
    [setAppContext]
  )

  return (
    <div className={styles.desktopGrid}>
      {desktopSources.map((source) => (
        <DesktopIcon
          key={source.path}
          source={source}
          onPositionChange={(position: { left: number; top: number }) =>
            updateSourceStyle(source.path, position)
          }
        />
      ))}
    </div>
  )
}
