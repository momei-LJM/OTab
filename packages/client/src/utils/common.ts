import { OTabConfig } from '@/config';
import { ITabData } from '@/types';
import { style } from 'framer-motion/client';

/**
 * 从itab数据转换提取
 */
export function tranformNavFormItab(
  data: ITabData['navConfig'],
  parent: string = 'desktop'
): OTabConfig['sources'] {
  return data
    .map((item) => {
      if (!['icon', 'folder', undefined].includes(item.type)) {
        return undefined;
      } else {
        const path =
          parent === 'desktop'
            ? `desktop/${item.name || '未命名'}`
            : `${parent}/${item.name || '未命名'}`;
        return {
          type: item.type === 'icon' ? 'link' : 'floder',
          name: item.name || '未命名',
          url: item.url,
          parent: parent,
          icon: item.src,
          path,
          children: tranformNavFormItab(item.children || [], path),
          style: {
            backgroundColor: item.backgroundColor || undefined,
          },
        } as OTabConfig['sources'][number];
      }
    })
    .filter(Boolean) as OTabConfig['sources'];
}

// 转换适配器
export class transformAdapter {
  private localTranform: (data: any) => OTabConfig['sources'] = () => [];
  constructor(options: {
    source: 'itab'; //目前only itab
    transform?: (data: any) => OTabConfig['sources']; //自定义转换方法
  }) {
    if (options.source === 'itab') {
      this.localTranform = tranformNavFormItab;
    }
    if (options.transform) {
      this.localTranform = options.transform;
    }
  }

  transformSource(data: ITabData['navConfig']): OTabConfig['sources'] {
    return this.localTranform(data);
  }
}

export function tree2Map<T>(data: T[], key: string) {
  const map = new Map<string, T>();
  function traverse(nodes: T[]) {
    nodes.forEach((node: any) => {
      map.set(node[key], node);
      if (node.children && Array.isArray(node.children)) {
        traverse(node.children);
      }
    });
  }
  traverse(data);
  return map;
}
