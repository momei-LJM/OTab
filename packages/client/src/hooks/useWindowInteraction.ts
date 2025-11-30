import type { RefObject } from 'react'
import { useDrag } from './useDrag'
import { useResize } from './useResize'

interface UseWindowInteractionProps {
  initialStyle?: React.CSSProperties
  onUpdate?: (updates: Partial<React.CSSProperties>) => void
  onFocus?: () => void
  minWidth?: number
  minHeight?: number
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
  const { isDragging, dragStyle, handleDragStart } = useDrag(elementRef, {
    onFocus,
    onDragEnd: (position) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        onUpdate?.({
          left: position.left,
          top: position.top,
          width: rect.width,
          height: rect.height,
        })
      }
    },
  })

  const { isResizing, resizeStyle, handleResizeStart } = useResize(elementRef, {
    minWidth,
    minHeight,
    onFocus,
    onResizeEnd: (size) => {
      onUpdate?.(size)
    },
  })

  const style: React.CSSProperties = {
    ...initialStyle,
    ...dragStyle,
    ...resizeStyle,
  }

  return {
    style,
    isDragging,
    isResizing,
    handleDragStart,
    handleResizeStart,
  }
}
