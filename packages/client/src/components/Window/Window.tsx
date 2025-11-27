import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import styles from './Window.module.scss';
import clsx from 'clsx';
import { useRef } from 'react';
import { useWindowInteraction } from '@/hooks/useWindowInteraction';
import { ResizeHandles } from './ResizeHandles';

interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onFocus?: () => void;
  onUpdate?: (updates: Partial<React.CSSProperties>) => void;
}

export const Window = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  style,
  onFocus,
  onUpdate,
}: WindowProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const {
    style: localStyle,
    handleDragStart,
    handleResizeStart,
  } = useWindowInteraction(overlayRef, {
    initialStyle: style,
    onUpdate,
    onFocus,
  });

  // If no position is set, center it initially
  // We can rely on CSS for initial centering if left/top are unset
  // But once we drag, we set left/top.
  const hasPosition =
    localStyle.left !== undefined || localStyle.top !== undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className={clsx(styles.overlay, { [styles.centered]: !hasPosition })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={localStyle}
          onClick={onFocus}
        >
          {/* Resize Handles */}
          <ResizeHandles onResizeStart={handleResizeStart} />

          <motion.div
            className={clsx(styles.window, className)}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className={styles.header} onPointerDown={handleDragStart}>
              <div className={styles.trafficLights}>
                <button
                  className={clsx(styles.trafficLight, styles.close)}
                  onClick={onClose}
                >
                  <X size={8} />
                </button>
                <button className={clsx(styles.trafficLight, styles.minimize)}>
                  <Minus size={8} />
                </button>
                <button className={clsx(styles.trafficLight, styles.maximize)}>
                  <Maximize2 size={8} />
                </button>
              </div>
              <div className={styles.title}>{title}</div>
              <div className={styles.spacer} />
            </div>
            <div className={styles.content}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
