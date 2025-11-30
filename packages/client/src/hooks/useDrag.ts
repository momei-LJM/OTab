import type { RefObject } from 'react'
import { useRef, useState } from 'react'

interface UseDragOptions {
  onDragStart?: () => void
  onDragEnd?: (position: { left: number; top: number }) => void
  onFocus?: () => void
  /** 是否启用边缘检测，不允许超出屏幕 */
  boundToScreen?: boolean
  /** 判定为拖拽的最小移动距离，默认 5px */
  dragThreshold?: number
}

// 限制位置在屏幕范围内
const clampToScreen = (
  left: number,
  top: number,
  width: number,
  height: number
) => {
  const maxLeft = window.innerWidth - width
  const maxTop = window.innerHeight - height

  return {
    left: Math.max(0, Math.min(left, maxLeft)),
    top: Math.max(0, Math.min(top, maxTop)),
  }
}

export const useDrag = (
  elementRef: RefObject<HTMLElement | null>,
  options: UseDragOptions = {}
) => {
  const {
    onDragStart,
    onDragEnd,
    onFocus,
    boundToScreen = false,
    dragThreshold = 5,
  } = options
  const [isDragging, setIsDragging] = useState(false)
  const [dragStyle, setDragStyle] = useState<React.CSSProperties>({})
  // 用于追踪是否真正发生了拖拽（移动距离超过阈值）
  const hasDraggedRef = useRef(false)

  const handleDragStart = (e: React.PointerEvent) => {
    if (!elementRef.current) return
    e.preventDefault()

    onFocus?.()
    hasDraggedRef.current = false

    const rect = elementRef.current.getBoundingClientRect()
    const startX = e.clientX
    const startY = e.clientY
    const startLeft = rect.left
    const startTop = rect.top
    const elemWidth = rect.width
    const elemHeight = rect.height

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      // 检查是否超过拖拽阈值
      if (!hasDraggedRef.current) {
        if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
          hasDraggedRef.current = true
          setIsDragging(true)
          onDragStart?.()
        } else {
          return // 未超过阈值，不更新位置
        }
      }

      let newLeft = startLeft + dx
      let newTop = startTop + dy

      // 边缘检测
      if (boundToScreen) {
        const clamped = clampToScreen(newLeft, newTop, elemWidth, elemHeight)
        newLeft = clamped.left
        newTop = clamped.top
      }

      setDragStyle({
        left: newLeft,
        top: newTop,
        transform: 'none',
        right: 'auto',
        bottom: 'auto',
      })
    }

    const handlePointerUp = () => {
      setIsDragging(false)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)

      // 只有真正拖拽了才触发 onDragEnd
      if (hasDraggedRef.current && elementRef.current) {
        const finalRect = elementRef.current.getBoundingClientRect()
        onDragEnd?.({
          left: finalRect.left,
          top: finalRect.top,
        })
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const resetDragStyle = () => {
    setDragStyle({})
  }

  return {
    isDragging,
    hasDragged: hasDraggedRef,
    dragStyle,
    handleDragStart,
    resetDragStyle,
  }
}