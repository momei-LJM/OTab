import React, { useContext } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import clsx from 'clsx';
import styles from './WindowControls.module.scss';
import { WindowLocalContext } from './WindowLocalContext';

export const WindowControls: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { onClose, onMinimize, onMaximize } = useContext(WindowLocalContext);

  return (
    <div
      className={clsx(styles.container, className)}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        className={clsx(styles.trafficLight, styles.close)}
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
      >
        <X size={10} />
      </button>
      <button
        className={clsx(styles.trafficLight, styles.minimize)}
        onClick={(e) => {
          e.stopPropagation();
          onMinimize?.();
        }}
      >
        <Minus size={10} />
      </button>
      <button
        className={clsx(styles.trafficLight, styles.maximize)}
        onClick={(e) => {
          e.stopPropagation();
          onMaximize?.();
        }}
      >
        <Maximize2 size={10} />
      </button>
    </div>
  );
};
