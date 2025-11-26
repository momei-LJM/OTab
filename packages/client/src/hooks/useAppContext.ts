import { AppCtx } from '@/config';
import { getCtxStorage } from '@/storage';
import { useMemo, useState } from 'react';
import { useWindowContext } from './useWindowContext';

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
  const localSnapshot: AppCtx['snapshot'] = storageCtx?.snapshot ?? {
    activeWindows: [],
  };
  const [appContext, setAppContext] = useState<AppCtx>(
    storageCtx || defaultData
  );

  const flatedSource = useMemo(() => {
    return appContext.config.sources.reduce((map, source) => {
      map.set(source.path, source);
      return map;
    }, new Map<string, (typeof appContext.config.sources)[number]>());
  }, [appContext.config.sources]);

  const windowContext = useWindowContext();

  return { appContext, setAppContext, flatedSource, windowContext };
}
