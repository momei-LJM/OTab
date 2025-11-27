import clsx from 'clsx';
import styles from './Window.module.scss';

interface ResizeHandlesProps {
  onResizeStart: (e: React.PointerEvent, direction: string) => void;
}

export const ResizeHandles = ({ onResizeStart }: ResizeHandlesProps) => {
  return (
    <>
      <div
        className={clsx(styles.resizeHandle, styles.resizeHandleTop)}
        onPointerDown={(e) => onResizeStart(e, 'Top')}
      />
      <div
        className={clsx(styles.resizeHandle, styles.resizeHandleBottom)}
        onPointerDown={(e) => onResizeStart(e, 'Bottom')}
      />
      <div
        className={clsx(styles.resizeHandle, styles.resizeHandleLeft)}
        onPointerDown={(e) => onResizeStart(e, 'Left')}
      />
      <div
        className={clsx(styles.resizeHandle, styles.resizeHandleRight)}
        onPointerDown={(e) => onResizeStart(e, 'Right')}
      />
      <div
        className={clsx(styles.resizeHandle, styles.resizeHandleTopLeft)}
        onPointerDown={(e) => onResizeStart(e, 'TopLeft')}
      />
      <div
        className={clsx(styles.resizeHandle, styles.resizeHandleTopRight)}
        onPointerDown={(e) => onResizeStart(e, 'TopRight')}
      />
      <div
        className={clsx(styles.resizeHandle, styles.resizeHandleBottomLeft)}
        onPointerDown={(e) => onResizeStart(e, 'BottomLeft')}
      />
      <div
        className={clsx(styles.resizeHandle, styles.resizeHandleBottomRight)}
        onPointerDown={(e) => onResizeStart(e, 'BottomRight')}
      />
    </>
  );
};
