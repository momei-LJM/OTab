import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import styles from './Window.module.scss';
import clsx from 'clsx';

interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Window = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: WindowProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={clsx(styles.window, className)}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className={styles.header}>
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
