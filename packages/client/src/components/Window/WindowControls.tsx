import clsx from 'clsx'
import { Maximize2, Minus, X } from 'lucide-react'
import React, { use } from 'react'
import styles from './WindowControls.module.scss'
import { WindowLocalContext } from './WindowLocalContext'

export const WindowControls: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { onClose, onMinimize, onMaximize } = use(WindowLocalContext)

  return (
    <div
      className={clsx(styles.container, className)}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={clsx(styles.trafficLight, styles.close)}
        onClick={(e) => {
          e.stopPropagation()
          onClose?.()
        }}
      >
        <X size={10} />
      </button>
      <button
        type="button"
        className={clsx(styles.trafficLight, styles.minimize)}
        onClick={(e) => {
          e.stopPropagation()
          onMinimize?.()
        }}
      >
        <Minus size={10} />
      </button>
      <button
        type="button"
        className={clsx(styles.trafficLight, styles.maximize)}
        onClick={(e) => {
          e.stopPropagation()
          onMaximize?.()
        }}
      >
        <Maximize2 size={10} />
      </button>
    </div>
  )
}
