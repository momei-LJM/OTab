import { SnapShot } from '@/config';
import { getCtxStorage } from '@/storage';
import { useState } from 'react';

export const useWindowsContext = () => {
  const storageCtx = getCtxStorage();

  const initWinowsSnapshot: SnapShot['activeWindows'] =
    storageCtx?.snapshot?.activeWindows ?? [];

  const [globalIndex, setGlobalIndex] = useState<number>(
    Math.max(
      initWinowsSnapshot
        .map((w) => w.zIndex)
        .reduce((a, b) => Math.max(a, b), 0),
      0
    ) || 1000
  );

  const [activeWindows, setAtiveWindows] = useState(initWinowsSnapshot);

  function createWindow(
    window: Omit<SnapShot['activeWindows'][number], 'zIndex'>
  ) {
    if (activeWindows.some((w) => w.trigger === window.trigger)) {
      return;
    }
    setGlobalIndex((idx) => idx + 1);
    const zIndex = globalIndex;
    setAtiveWindows([
      ...activeWindows,
      {
        ...window,
        zIndex,
      },
    ]);
  }

  function focusWindow(window: SnapShot['activeWindows'][number]) {
    const isMaxNow = activeWindows.every((w) => w.zIndex <= window.zIndex);
    if (isMaxNow) {
      return;
    }
    const target = activeWindows.find((w) => w.trigger === window.trigger);
    if (target) {
      setGlobalIndex((idx) => idx + 1);
      target.zIndex = globalIndex;
      setAtiveWindows([...activeWindows]);
    }
  }

  function updateWindow(window: SnapShot['activeWindows'][number]) {
    const target = activeWindows.find((w) => w.trigger === window.trigger);
    if (target) {
      Object.assign(target, window);
      setAtiveWindows([...activeWindows]);
    }
  }

  function cleanupWindows(clearAll: boolean = false) {
    setTimeout(() => {
      if (clearAll) {
        setAtiveWindows([]);
      } else {
        const filtered = activeWindows.filter((w) => w.isOpen);
        setAtiveWindows(filtered);
      }
    }, 300);
  }

  function closeWindow(trigger: string) {
    const finded = activeWindows.find((w) => w.trigger === trigger);
    finded && (finded.isOpen = false);
    setAtiveWindows([...activeWindows]);
    cleanupWindows();
  }
  return {
    activeWindows,
    createWindow,
    updateWindow,
    closeWindow,
    focusWindow,
  };
};
