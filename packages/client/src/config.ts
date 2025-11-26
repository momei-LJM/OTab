export interface Source {
  type: 'floder' | 'link';
  name: string;
  parent?: string;
  path: string;
  style?: {
    x: number;
    y: number;
    width: number;
    height: number;
    rounded: number;
  };
  children?: Source[];
}
export interface WindowSnapshot {
  type: 'folder' | 'app';
  trigger: string; //触发窗口打开的来源 path
  zIndex: number;
  isOpen: boolean;
}
export interface OTabConfig {
  searchEngine: 'google' | 'bing' | 'duckduckgo' | 'brave' | 'yahoo';
  // showWeather: boolean;
  // showQuotes: boolean;
  // showBookmarks: boolean;
  // showApps: boolean;
  // showClock: boolean;
  theme: 'light' | 'dark' | 'system';
  backgroundImageUrl: string | null; //背景图
  sources: Source[];
}

export interface SnapShot {
  activeWindows: WindowSnapshot[];
}
export interface AppCtx {
  snapshot?: SnapShot;
  config: OTabConfig;
}
export const defineDefaultCofig = (config: OTabConfig) => config;
