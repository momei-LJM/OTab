import { useAppStore, useConfig } from '@/store'
import styles from './DesktopGrid.module.scss'
import { DesktopIcon } from './DesktopIcon'

export const DesktopGrid = () => {
  const config = useConfig()
  const updateSourceStyle = useAppStore((state) => state.updateSourceStyle)

  const desktopSources = config.sources.filter(
    (source) => source.parent === 'desktop'
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
