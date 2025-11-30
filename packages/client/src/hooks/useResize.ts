import type { RefObject } from 'react'
import { useState } from 'react'

export type ResizeDirection =
  | 'Top'
  | 'Bottom'
  | 'Left'
  | 'Right'
  | 'TopLeft'
  | 'TopRight'
  | 'BottomLeft'
  | 'BottomRight'

interface UseResizeOptions {
  minWidth?: number
  minHeight?: number
  onResizeStart?: () => void
  onResizeEnd?: (size: {
    left: number
    top: number
    width: number
    height: number
  }) => void
  onFocus?: () => void
}

export const useResize = (
  elementRef: RefObject<HTMLElement | null>,
  options: UseResizeOptions = {}
) => {
  const {
    minWidth = 200,
    minHeight = 100,
    onResizeStart,
    onResizeEnd,
    onFocus,
  } = options

  const [isResizing, setIsResizing] = useState(false)
  const [resizeStyle, setResizeStyle] = useState<React.CSSProperties>({})

  const handleResizeStart = (e: React.PointerEvent, direction: ResizeDirection) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    onFocus?.()
    onResizeStart?.()

    if (!elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = rect.width
    const startHeight = rect.height
    const startLeft = rect.left
    const startTop = rect.top

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      const newStyle: React.CSSProperties = {
        transform: 'none',
      }

      if (direction.includes('Right')) {
        newStyle.width = Math.max(minWidth, startWidth + dx)
      }
      if (direction.includes('Bottom')) {
        newStyle.height = Math.max(minHeight, startHeight + dy)
      }
      if (direction.includes('Left')) {
        const newWidth = Math.max(minWidth, startWidth - dx)
        newStyle.width = newWidth
        newStyle.left = startLeft + (startWidth - newWidth)
      }
      if (direction.includes('Top')) {
        const newHeight = Math.max(minHeight, startHeight - dy)
        newStyle.height = newHeight
        newStyle.top = startTop + (startHeight - newHeight)
      }

      setResizeStyle(newStyle)
    }

    const handlePointerUp = () => {
      setIsResizing(false)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)

      if (elementRef.current) {
        const finalRect = elementRef.current.getBoundingClientRect()
        onResizeEnd?.({
          left: finalRect.left,
          top: finalRect.top,
          width: finalRect.width,
          height: finalRect.height,
        })
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const resetResizeStyle = () => {
    setResizeStyle({})
  }

  return {
    isResizing,
    resizeStyle,
    handleResizeStart,
    resetResizeStyle,
  }
}
