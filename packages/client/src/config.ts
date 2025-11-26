interface Source {
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

interface OTabConfig {
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

export interface AppCtx {
  snapshot?: Record<string, any>;
  config: OTabConfig;
}
export const defineDefaultCofig = (config: OTabConfig) => config;
