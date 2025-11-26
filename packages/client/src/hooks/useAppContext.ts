import { AppCtx } from '@/config';
import { useState } from 'react';

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
};
export function useAppContext() {
  const [appContext, setAppContext] = useState<AppCtx>(defaultData);
  return { appContext, setAppContext };
}
