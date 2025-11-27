import { SnapShot } from '@/config';
import { getCtxStorage } from '@/storage';
import { logger } from '@/utils/logger';
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

  const createWindow = useCallback(
    (window: Omit<SnapShot['activeWindows'][number], 'zIndex'>) => {
      setAtiveWindows((prev) => {
        if (prev.some((w) => w.trigger === window.trigger)) {
          return prev;
        }
        const zIndex = globalIndex.current + 1;
        globalIndex.current = zIndex;
        return [
          ...prev,
          {
            ...window,
            zIndex,
          },
        ];
      });
    },
    []
  );

  const focusWindow = useCallback(
    (window: SnapShot['activeWindows'][number]) => {
      setAtiveWindows((prev) => {
        const isMaxNow = prev.every((w) => w.zIndex <= window.zIndex);
        if (isMaxNow) {
          return prev;
        }
        const target = prev.find((w) => w.trigger === window.trigger);
        if (target) {
          const zIndex = globalIndex.current + 1;
          globalIndex.current = zIndex;
          return prev.map((w) =>
            w.trigger === window.trigger ? { ...w, zIndex } : w
          );
        }
        return prev;
      });
    },
    []
  );

  const updateWindow = useCallback(
    (window: SnapShot['activeWindows'][number]) => {
      setAtiveWindows((prev) => {
        const target = prev.find((w) => w.trigger === window.trigger);
        if (target) {
          return prev.map((w) =>
            w.trigger === window.trigger ? { ...w, ...window } : w
          );
        }
        return prev;
      });
    },
    []
  );

  const closeWindow = useCallback((trigger: string) => {
    setAtiveWindows((prev) => {
      const updated = prev.map((w) =>
        w.trigger === trigger ? { ...w, isOpen: false } : w
      );
      // 延迟清理已关闭的窗口
      setTimeout(() => {
        setAtiveWindows((current) => current.filter((w) => w.isOpen));
      }, 300);
      return updated;
    });
  }, []);

  // 使用 useMemo 稳定返回值的引用
  return useMemo(
    () => ({
      activeWindows,
      createWindow,
      updateWindow,
      closeWindow,
      focusWindow,
    }),
    [activeWindows, createWindow, updateWindow, closeWindow, focusWindow]
  );
};
