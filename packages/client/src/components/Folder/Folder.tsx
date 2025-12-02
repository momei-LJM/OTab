import type { LucideProps } from 'lucide-react'
import type { Source } from '@/config'
import clsx from 'clsx'
import { Folder as FolderIcon } from 'lucide-react'
import { useAppStore } from '@/store'
import { getCssVar } from '@/utils'
import styles from './Folder.module.scss'

interface FolderProps {
  name: string
  onClick?: () => void
  className?: string
  source: Source
  folderIconProps?: LucideProps
  size?: number
}

export const Folder = ({
  name,
  onClick,
  className,
  source,
  folderIconProps,
  size,
}: FolderProps) => {
  const createWindow = useAppStore((state) => state.createWindow)

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) {
      onClick()
    } else {
      createWindow({
        type: 'folder',
        trigger: source.path,
        isOpen: true,
      })
    }
  }

  return (
    <div
      className={clsx(styles.folder, className)}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      style={{ width: size ? 'auto' : undefined }}
    >
      <div
        className={styles.iconWrapper}
        style={size ? { width: size, height: size } : undefined}
      >
        <FolderIcon
          className={styles.icon}
          fill={getCssVar('primary-color')}
          stroke={getCssVar('primary-color')}
          size={size}
          {...folderIconProps}
        />
      </div>
      {size ? null : <span className={styles.name}>{name}</span>}
    </div>
  )
}
