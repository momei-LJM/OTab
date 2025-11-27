declare global {
  type WithStyle<T> = T & { style?: React.CSSProperties };
}

// ITabData types
export interface SearchEngine {
  key: string;
  title: string;
  href: string;
}

export interface SearchConfig {
  show: boolean;
  history: boolean;
  height: number;
  radius: number;
  bgColor: number;
  translate: string;
}

export interface ThemeConfig {
  mode: string;
  system: boolean;
  color: string;
}

export interface SidebarConfig {
  placement: string;
  autoHide: boolean;
  width: number;
  lastGroup: boolean;
  mouseGroup: boolean;
  opacity: number;
}

export interface WallpaperConfig {
  mask: number;
  blur: number;
  type: string;
  src: string;
  thumb: string;
  time: number;
  source: string;
  name: string;
}

export interface LayoutConfig {
  view: string;
  yiyan: boolean;
}

export interface TimeConfig {
  show: boolean;
  size: number;
  color: string;
  fontWeight: string;
  font: string;
  hour24: boolean;
  sec: boolean;
  month: string;
  week: string;
  lunar: string;
}

export interface OpenConfig {
  searchBlank: boolean;
  iconBlank: boolean;
}

export interface IconConfig {
  name: number;
  nameSize: number;
  nameColor: string;
  startAnimation: boolean;
  iconRadius: number;
  iconSize: number;
  iconX: number;
  iconY: number;
  opactiy: number;
  unit: string;
  width: number;
  iconLayout: string;
  xysync: boolean;
}

export interface TopSearchItem {
  name: string;
  id: string;
}

export interface BaseConfig {
  lang: string;
  searchEngine: SearchEngine[];
  useSearch: string;
  search: SearchConfig;
  theme: ThemeConfig;
  sidebar: SidebarConfig;
  wallpaper: WallpaperConfig;
  layout: LayoutConfig;
  time: TimeConfig;
  open: OpenConfig;
  icon: IconConfig;
  topSearch: TopSearchItem[];
}

export interface NavItem {
  id?: string;
  name?: string;
  icon?: string;
  url?: string;
  type?: string;
  src?: string;
  backgroundColor?: string;
  size?: string;
  view?: number;
  iconText?: string;
  component?: string;
  insetType?: string;
  config?: any; // For component configs like countdown
  children?: NavItem[];
}

export type NavConfig = NavItem[];

export interface NoteItem {
  title: string;
  content: string;
  fixed: boolean;
  ct: number;
  ut: number;
  id: number;
}

export interface TodoItem {
  // Define based on actual structure when available
  [key: string]: any;
}

export interface ITabData {
  baseConfig: BaseConfig;
  navConfig: NavConfig;
  notes: NoteItem[];
  todo: TodoItem[];
}

export {};
