import type { Source } from '@/config'
import clsx from 'clsx'
import { Folder as FolderIcon } from 'lucide-react'
import { use } from 'react'
import { WindowsContext } from '@/context'
import { getCssVar } from '@/utils'
import styles from './Folder.module.scss'

interface FolderProps {
  name: string
  onClick?: () => void
  className?: string
  source: Source
}

export const Folder = ({ name, onClick, className, source }: FolderProps) => {
  const { createWindow } = use(WindowsContext)

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
    >
      <div className={styles.iconWrapper}>
        <FolderIcon
          className={styles.icon}
          fill={getCssVar('primary-color')}
          stroke={getCssVar('primary-color')}
        />
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  )
}
