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
  console.log('11111xxx');

  const flatedSource = useMemo(() => {
    return appContext.config.sources.reduce((map, source) => {
      map.set(source.path, source);
      return map;
    }, new Map<string, (typeof appContext.config.sources)[number]>());
  }, [appContext.config.sources]);

  return { appContext, setAppContext, flatedSource };
}
