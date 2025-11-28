import type { CSSProperties } from 'react'

export interface Source {
  type: 'floder' | 'link'
  url?: string // type为link时需要填
  icon?: string // type为link时需要填
  name: string
  parent?: string // 父级path
  path: string // 唯一，通过拼接name获得；所以一个文件夹下name也必须是唯一的
  style?: CSSProperties
  children?: Source[]
}
export interface WindowSnapshot {
  type: 'folder' | 'app'
  trigger: string // 触发窗口打开的来源 path
  currentPath?: string // 当前显示的路径，用于窗口内导航
  zIndex: number
  style?: CSSProperties
  isOpen: boolean
  isMinimized?: boolean
  isMaximized?: boolean
}
export interface OTabConfig {
  searchEngine: 'google' | 'bing' | 'duckduckgo' | 'brave' | 'yahoo'
  // showWeather: boolean;
  // showQuotes: boolean;
  // showBookmarks: boolean;
  // showApps: boolean;
  // showClock: boolean;
  theme: 'light' | 'dark' | 'system'
  backgroundImageUrl: string | null // 背景图
  sources: Source[]
}

export interface SnapShot {
  activeWindows: WindowSnapshot[]
}
export interface AppCtx {
  snapshot?: SnapShot
  config: OTabConfig
}
export const defineDefaultCofig = (config: OTabConfig) => config
