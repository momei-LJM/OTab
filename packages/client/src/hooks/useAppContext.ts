import { AppCtx, Source } from '@/config';
import { getCtxStorage } from '@/storage';
import { transformAdapter, tree2Map } from '@/utils/common';
import { logger } from '@/utils/logger';
import { useMemo, useState } from 'react';
import itabData from '../../private.itabdata.json';
export const defaultData: AppCtx = {
  config: {
    searchEngine: 'bing',
    theme: 'light',
    backgroundImageUrl:
      'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=3870&auto=format&fit=crop',

    // backgroundImageUrl: '/bg/local_bg.png',
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

  const transformer = new transformAdapter({ source: 'itab' });
  const sources = transformer.transformSource(itabData.navConfig);

  const initData = storageCtx || defaultData;
  const [appContext, setAppContext] = useState<AppCtx>({
    ...initData,
    config: {
      ...initData.config,
      sources: [...initData.config.sources, ...sources],
    },
  });

  const flatedSource = useMemo(() => {
    return tree2Map<Source>(appContext.config.sources, 'path');
  }, [appContext.config.sources]);

  logger.info('AppContext 执行', sources, flatedSource);
  // 使用 useMemo 稳定返回值的引用
  return useMemo(
    () => ({ appContext, setAppContext, flatedSource }),
    [appContext, flatedSource]
  );
}
