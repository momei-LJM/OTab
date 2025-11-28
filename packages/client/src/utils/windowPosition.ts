import { CSSProperties } from 'react';

// 窗口默认尺寸
const DEFAULT_WINDOW_WIDTH = 950;
const DEFAULT_WINDOW_HEIGHT = 500;

// 级联偏移量
const CASCADE_OFFSET_X = 30;
const CASCADE_OFFSET_Y = 30;

// 屏幕边距
const SCREEN_PADDING = 50;

interface WindowPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * 计算新窗口的位置
 * 使用级联算法，每个新窗口相对于上一个窗口有一定偏移
 */
export function calcWindowPosition(
  existingWindows: Array<{ style?: CSSProperties }>,
  options?: {
    width?: number;
    height?: number;
  }
): WindowPosition {
  const width = options?.width || DEFAULT_WINDOW_WIDTH;
  const height = options?.height || DEFAULT_WINDOW_HEIGHT;

  // 获取可用屏幕区域
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // 计算居中起始位置
  const centerX = Math.max(SCREEN_PADDING, (screenWidth - width) / 2);
  const centerY = Math.max(SCREEN_PADDING, (screenHeight - height) / 2);

  // 如果没有现有窗口，返回居中位置
  if (existingWindows.length === 0) {
    return { left: centerX, top: centerY, width, height };
  }

  // 计算级联偏移
  const cascadeIndex = existingWindows.length;
  let left = centerX + cascadeIndex * CASCADE_OFFSET_X;
  let top = centerY + cascadeIndex * CASCADE_OFFSET_Y;

  // 检查是否超出屏幕边界，如果超出则重置到起始位置
  const maxLeft = screenWidth - width - SCREEN_PADDING;
  const maxTop = screenHeight - height - SCREEN_PADDING;

  if (left > maxLeft || top > maxTop) {
    // 重置并加一个小的随机偏移，避免完全重叠
    const resetIndex = cascadeIndex % 5;
    left = centerX + resetIndex * CASCADE_OFFSET_X;
    top = centerY + resetIndex * CASCADE_OFFSET_Y;
  }

  // 确保不会超出边界
  left = Math.max(SCREEN_PADDING, Math.min(left, maxLeft));
  top = Math.max(SCREEN_PADDING, Math.min(top, maxTop));

  return { left, top, width, height };
}

/**
 * 将位置转换为 CSS 样式
 */
export function positionToStyles(position: WindowPosition): CSSProperties {
  return {
    left: position.left,
    top: position.top,
    width: position.width,
    height: position.height,
  };
}
