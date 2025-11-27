import { useState, useEffect, RefObject } from 'react';

interface UseWindowInteractionProps {
  initialStyle?: React.CSSProperties;
  onUpdate?: (updates: Partial<React.CSSProperties>) => void;
  onFocus?: () => void;
  minWidth?: number;
  minHeight?: number;
}

export const useWindowInteraction = (
  elementRef: RefObject<HTMLElement | null>,
  {
    initialStyle,
    onUpdate,
    onFocus,
    minWidth = 200,
    minHeight = 100,
  }: UseWindowInteractionProps
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [localStyle, setLocalStyle] = useState<React.CSSProperties>({});

  // Sync local style with prop style when not interacting
  useEffect(() => {
    if (!isDragging && !isResizing) {
      setLocalStyle(initialStyle || {});
    }
  }, [initialStyle, isDragging, isResizing]);

  const handleDragStart = (e: React.PointerEvent) => {
    if (!elementRef.current) return;
    e.preventDefault();

    setIsDragging(true);
    onFocus?.();

    const rect = elementRef.current.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = rect.left;
    const startTop = rect.top;

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      setLocalStyle((prev) => ({
        ...prev,
        left: startLeft + dx,
        top: startTop + dy,
        transform: 'none',
        right: 'auto',
        bottom: 'auto',
      }));
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (elementRef.current) {
        const finalRect = elementRef.current.getBoundingClientRect();
        onUpdate?.({
          left: finalRect.left,
          top: finalRect.top,
          width: finalRect.width,
          height: finalRect.height,
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleResizeStart = (e: React.PointerEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    onFocus?.();

    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = rect.width;
    const startHeight = rect.height;
    const startLeft = rect.left;
    const startTop = rect.top;

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const newStyle: React.CSSProperties = {
        ...localStyle,
        transform: 'none',
      };

      if (direction.includes('Right')) {
        newStyle.width = Math.max(minWidth, startWidth + dx);
      }
      if (direction.includes('Bottom')) {
        newStyle.height = Math.max(minHeight, startHeight + dy);
      }
      if (direction.includes('Left')) {
        const newWidth = Math.max(minWidth, startWidth - dx);
        newStyle.width = newWidth;
        newStyle.left = startLeft + (startWidth - newWidth);
      }
      if (direction.includes('Top')) {
        const newHeight = Math.max(minHeight, startHeight - dy);
        newStyle.height = newHeight;
        newStyle.top = startTop + (startHeight - newHeight);
      }

      setLocalStyle(newStyle);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (elementRef.current) {
        const finalRect = elementRef.current.getBoundingClientRect();
        onUpdate?.({
          left: finalRect.left,
          top: finalRect.top,
          width: finalRect.width,
          height: finalRect.height,
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return {
    style: localStyle,
    isDragging,
    isResizing,
    handleDragStart,
    handleResizeStart,
  };
};
