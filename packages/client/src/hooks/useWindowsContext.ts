import { SnapShot, WindowSnapshot } from '@/config';
import { getCtxStorage } from '@/storage';
import { logger } from '@/utils/logger';
import { calcWindowPosition, positionToStyles } from '@/utils/windowPosition';
import { useCallback, useMemo, useRef, useState } from 'react';

export const useWindowsContext = () => {
  logger.info('WindowsContext 执行');
  const storageCtx = getCtxStorage();

  const initWinowsSnapshot: SnapShot['activeWindows'] =
    storageCtx?.snapshot?.activeWindows ?? [];

  const globalIndex = useRef<number>(
    Math.max(
      initWinowsSnapshot
        .map((w) => w.zIndex)
        .reduce((a, b) => Math.max(a, b), 0),
      0
    ) || 1000
  );

  const [activeWindows, setAtiveWindows] = useState(initWinowsSnapshot);
  const updateWindow = useCallback((window: WindowSnapshot) => {
    setAtiveWindows((prev) => {
      const target = prev.find((w) => w.trigger === window.trigger);
      if (target) {
        return prev.map((w) =>
          w.trigger === window.trigger ? { ...w, ...window } : w
        );
      }
      return prev;
    });
  }, []);

  const createWindow = useCallback((window: Omit<WindowSnapshot, 'zIndex'>) => {
    setAtiveWindows((prev) => {
      if (prev.some((w) => w.trigger === window.trigger)) {
        return prev;
      }
      const zIndex = globalIndex.current + 1;
      globalIndex.current = zIndex;

      // 计算新窗口位置
      const position = calcWindowPosition(prev.filter((w) => w.isOpen));
      const style = {
        ...window.style,
        ...positionToStyles(position),
      };

      return [
        ...prev,
        {
          ...window,
          style,
          zIndex,
        },
      ];
    });
  }, []);

  const focusWindow = useCallback(
    (window: WindowSnapshot) => {
      const isMaxNow = activeWindows.every((w) => w.zIndex <= window.zIndex);
      if (isMaxNow && !window.isMinimized) {
        return;
      }
      const target = activeWindows.find((w) => w.trigger === window.trigger);
      if (target) {
        const zIndex = globalIndex.current + 1;
        globalIndex.current = zIndex;
        updateWindow({ ...window, zIndex, isMinimized: false });
      }
    },
    [activeWindows, updateWindow]
  );

  const minimizeWindow = useCallback(
    (trigger: string) => {
      const target = activeWindows.find((w) => w.trigger === trigger);
      if (target) {
        updateWindow({ ...target, isMinimized: true });
      }
    },
    [activeWindows, updateWindow]
  );

  const toggleMaximizeWindow = useCallback(
    (trigger: string) => {
      const target = activeWindows.find((w) => w.trigger === trigger);
      if (target) {
        updateWindow({ ...target, isMaximized: !target.isMaximized });
      }
    },
    [activeWindows, updateWindow]
  );

  const closeWindow = useCallback(
    (trigger: string) => {
      const updated = activeWindows.find((w) => w.trigger === trigger);
      updateWindow({ ...updated!, isOpen: false });
      // 延迟清理已关闭的窗口
      setTimeout(() => {
        setAtiveWindows((current) => current.filter((w) => w.isOpen));
      }, 300);
    },
    [activeWindows, updateWindow]
  );

  // 使用 useMemo 稳定返回值的引用
  return useMemo(
    () => ({
      activeWindows,
      createWindow,
      updateWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximizeWindow,
    }),
    [
      activeWindows,
      createWindow,
      updateWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximizeWindow,
    ]
  );
};
