import type { Source } from '@/config'
import clsx from 'clsx'
import { Folder as FolderIcon, Globe } from 'lucide-react'
import { use, useRef } from 'react'
import { WindowsContext } from '@/context'
import { useDrag } from '@/hooks/useDrag'
import { getCssVar } from '@/utils'
import styles from './DesktopGrid.module.scss'

interface DesktopIconProps {
  source: Source
  onPositionChange?: (position: { left: number; top: number }) => void
}

const hasPosition = (style?: React.CSSProperties) => {
  return style && (style.left !== undefined || style.top !== undefined)
}

export const DesktopIcon = ({ source, onPositionChange }: DesktopIconProps) => {
  const { createWindow } = use(WindowsContext)
  const iconRef = useRef<HTMLDivElement>(null)

  const { isDragging, hasDragged, dragStyle, handleDragStart } = useDrag(
    iconRef,
    {
      boundToScreen: true,
      onDragEnd: (position) => {
        onPositionChange?.(position)
      },
    }
  )

  const handleOpen = () => {
    if (source.type === 'link' && source.url) {
      window.open(source.url, '_blank')
    } else {
      createWindow({
        type: 'folder',
        trigger: source.path,
        isOpen: true,
      })
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    // 只在左键按下时开始拖拽
    if (e.button === 0) {
      handleDragStart(e)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    // 如果发生了拖拽（移动距离超过阈值），不触发点击事件
    if (hasDragged.current) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    handleOpen()
  }

  const renderIcon = () => {
    if (source.type === 'link') {
      if (source.icon) {
        return (
          <img
            src={source.icon}
            alt={source.name}
            className={styles.iconImage}
          />
        )
      }
      return <Globe className={styles.icon} />
    }
    return (
      <FolderIcon
        className={styles.icon}
        fill={getCssVar('primary-color')}
        stroke={getCssVar('primary-color')}
      />
    )
  }

  // 如果有保存的位置，使用 fixed 定位
  const hasSavedPosition = hasPosition(source.style)

  return (
    <div
      ref={iconRef}
      className={clsx(styles.desktopIcon, {
        [styles.dragging]: isDragging,
        [styles.positioned]: hasSavedPosition,
      })}
      style={{
        ...source.style,
        ...dragStyle,
        position: isDragging || hasSavedPosition ? 'fixed' : undefined,
      }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.iconWrapper}>{renderIcon()}</div>
      <span className={styles.name}>{source.name}</span>
    </div>
  )
}
