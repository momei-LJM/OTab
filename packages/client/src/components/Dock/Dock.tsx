import type {
  MotionValue,
} from 'framer-motion'
import clsx from 'clsx'
import {
  motion,
  useMotionValue,
} from 'framer-motion'
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
  // In a real implementation with context, we would pass mouseX down.
  // For simplicity in this structure, we'll rely on CSS hover or simple framer motion if we want the wave effect.
  // To get the true macOS wave effect, we need access to the parent's mouseX.
  // Let's refactor slightly to pass mouseX via context or cloneElement if we want the wave.
  // For now, let's do a simple scale on hover to keep it robust, or use the provided mouseX if we refactor.

  // Actually, let's do it right. But since I can't easily cloneElement with types safely without more boilerplate,
  // I'll stick to a nice CSS scale + Framer Motion hover for now, or use a simpler approach.

  // Wait, I can use the mouseX from the parent if I just pass it.
  // But for this first pass, let's make it a simple robust Dock.

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
