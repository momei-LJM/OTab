import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import styles from './Window.module.scss';
import clsx from 'clsx';
import { useRef } from 'react';
import { useWindowInteraction } from '@/hooks/useWindowInteraction';
import { ResizeHandles } from './ResizeHandles';
import { WindowLocalContext } from './WindowLocalContext';

interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onFocus?: () => void;
  onUpdate?: (updates: Partial<React.CSSProperties>) => void;
  isMinimized?: boolean;
  isMaximized?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
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
  isMinimized,
  isMaximized,
  onMinimize,
  onMaximize,
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

  const effectiveStyle = isMaximized
    ? {
        ...localStyle,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: 'none',
        borderRadius: 0,
      }
    : localStyle;

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          ref={overlayRef}
          className={clsx(styles.overlay, {
            [styles.centered]: !hasPosition && !isMaximized,
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={effectiveStyle}
          onClick={onFocus}
        >
          {/* Resize Handles - disable if maximized */}
          {!isMaximized && <ResizeHandles onResizeStart={handleResizeStart} />}

          <motion.div
            className={clsx(styles.window, className)}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={
              isMaximized
                ? { borderRadius: 0, width: '100%', height: '100%' }
                : undefined
            }
          >
            {/* Traffic Lights - Absolute Positioned */}
            <div
              className={styles.trafficLightsOverlay}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <button
                className={clsx(styles.trafficLight, styles.close)}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <X size={8} />
              </button>
              <button
                className={clsx(styles.trafficLight, styles.minimize)}
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize?.();
                }}
              >
                <Minus size={8} />
              </button>
              <button
                className={clsx(styles.trafficLight, styles.maximize)}
                onClick={(e) => {
                  e.stopPropagation();
                  onMaximize?.();
                }}
              >
                <Maximize2 size={8} />
              </button>
            </div>

            <WindowLocalContext.Provider value={{ handleDragStart }}>
              <div className={styles.contentArea}>{children}</div>
            </WindowLocalContext.Provider>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
