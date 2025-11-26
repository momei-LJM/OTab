import { SnapShot } from '@/config';
import { AppCtx } from '@/config';
import { getCtxStorage, setCtxStorage } from '@/storage';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const defaultData: AppCtx = {
  config: {
    searchEngine: 'bing',
    theme: 'light',
    backgroundImageUrl:
      'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=3870&auto=format&fit=crop',
    sources: [
      {
        type: 'floder',
        name: '我的收藏',
        parent: 'desktop',
        path: 'desktop/我的收藏',
      },
      {
        type: 'floder',
        name: 'Projects',
        parent: 'desktop',
        path: 'desktop/Projects',
      },
      {
        type: 'floder',
        name: 'images',
        parent: 'desktop',
        path: 'desktop/images',
      },
    ],
  },
  snapshot: {
    activeWindows: [],
  },
};
export function useAppContext() {
  const storageCtx = getCtxStorage();

  const [appContext, setAppContext] = useState<AppCtx>(
    storageCtx || defaultData
  );

  const flatedSource = useMemo(() => {
    return appContext.config.sources.reduce((map, source) => {
      map.set(source.path, source);
      return map;
    }, new Map<string, (typeof appContext.config.sources)[number]>());
  }, [appContext.config.sources]);

  // Window context logic
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

  const windowContext = {
    activeWindows,
    createWindow,
    updateWindow,
    closeWindow,
    focusWindow,
  };

  const saveConfig = useCallback(() => {
    const newCtx: AppCtx = {
      ...appContext,
      snapshot: {
        ...appContext.snapshot,
        activeWindows: windowContext.activeWindows,
      },
    };
    setCtxStorage(newCtx);
  }, [appContext, windowContext.activeWindows]);

  useEffect(() => {
    saveConfig();
  }, [windowContext.activeWindows, saveConfig]);

  return { appContext, setAppContext, flatedSource, windowContext };
}
