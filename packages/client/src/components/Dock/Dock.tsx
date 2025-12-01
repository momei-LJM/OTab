import type { MotionValue } from 'framer-motion'
import clsx from 'clsx'
import { motion, useMotionValue } from 'framer-motion'
import styles from './Dock.module.scss'

interface DockProps {
  children: React.ReactNode
  className?: string
}

export const Dock = ({ children, className }: DockProps) => {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e: React.MouseEvent) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={clsx(styles.dock, className)}
    >
      {children}
    </motion.div>
  )
}

interface DockItemProps {
  children: React.ReactNode
  onClick?: () => void
  mouseX?: MotionValue
  title?: string
}

export const DockItem = ({ children, onClick, title }: DockItemProps) => {
  return (
    <motion.div
      className={styles.dockItem}
      whileHover={{ scale: 1.2, translateY: -10 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {children}
      {title && <div className={styles.tooltip}>{title}</div>}
    </motion.div>
  )
}
