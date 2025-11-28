import { motion, AnimatePresence } from 'framer-motion';
import styles from './Window.module.scss';
import clsx from 'clsx';
import { useRef } from 'react';
import { useWindowInteraction } from '@/hooks/useWindowInteraction';
import { ResizeHandles } from './ResizeHandles';
import { WindowLocalContext } from './WindowLocalContext';
import { WindowControls } from './WindowControls';

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
  hideControls?: boolean;
  variant?: 'default' | 'glass';
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
  hideControls,
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
            <WindowLocalContext.Provider
              value={{ handleDragStart, onClose, onMinimize, onMaximize }}
            >
              {/* Traffic Lights - Absolute Positioned */}
              {!hideControls && (
                <div
                  className={styles.trafficLightsOverlay}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <WindowControls />
                </div>
              )}

              <div className={styles.contentArea}>{children}</div>
            </WindowLocalContext.Provider>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
