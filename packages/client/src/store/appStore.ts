import type { CSSProperties } from 'react'
import type { OTabConfig, Source, WindowSnapshot } from '@/config'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { TransformAdapter, tree2Map } from '@/utils/common'
import { calcWindowPosition, positionToStyles } from '@/utils/windowPosition'
import itabData from '../../private.itabdata.json'

// 默认配置
const defaultConfig: OTabConfig = {
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
}

// 转换 itabData（只执行一次）
const transformer = new TransformAdapter({ source: 'itab' })
const itabSources = transformer.transformSource(itabData.navConfig)

interface AppState {
  // State
  config: OTabConfig
  activeWindows: WindowSnapshot[]
  globalZIndex: number
  // 缓存的派生状态
  flatedSource: Map<string, Source>

  // Config Actions
  updateConfig: (config: Partial<OTabConfig>) => void
  updateSourceStyle: (path: string, style: CSSProperties) => void

  // Window Actions
  createWindow: (window: Omit<WindowSnapshot, 'zIndex'>) => void
  updateWindow: (window: Partial<WindowSnapshot> & { trigger: string }) => void
  closeWindow: (trigger: string) => void
  focusWindow: (trigger: string) => void
  minimizeWindow: (trigger: string) => void
  toggleMaximizeWindow: (trigger: string) => void
}

// 辅助函数：更新 flatedSource 缓存
const updateFlatedSource = (sources: Source[]) => tree2Map<Source>(sources, 'path')

export const useAppStore = create<AppState>()(
  persist(
    immer((set) => ({
      // 初始状态
      config: defaultConfig,
      activeWindows: [],
      globalZIndex: 1000,
      flatedSource: updateFlatedSource(defaultConfig.sources),

      // Config Actions
      updateConfig: (newConfig) => {
        set((state) => {
          Object.assign(state.config, newConfig)
          if (newConfig.sources) {
            state.flatedSource = updateFlatedSource(state.config.sources)
          }
        })
      },

      updateSourceStyle: (path, style) => {
        set((state) => {
          const source = state.config.sources.find((s) => s.path === path)
          if (source) {
            source.style = { ...source.style, ...style }
            state.flatedSource = updateFlatedSource(state.config.sources)
          }
        })
      },

      // Window Actions
      createWindow: (window) => {
        set((state) => {
          // 如果窗口已存在，聚焦它
          const existing = state.activeWindows.find(
            (w) => w.trigger === window.trigger
          )
          if (existing) {
            state.globalZIndex += 1
            existing.zIndex = state.globalZIndex
            existing.isMinimized = false
            existing.isOpen = true
            return
          }

          // 创建新窗口
          state.globalZIndex += 1
          const position = calcWindowPosition(
            state.activeWindows.filter((w) => w.isOpen)
          )
          state.activeWindows.push({
            ...window,
            style: { ...window.style, ...positionToStyles(position) },
            zIndex: state.globalZIndex,
          })
        })
      },

      updateWindow: (window) => {
        set((state) => {
          const target = state.activeWindows.find(
            (w) => w.trigger === window.trigger
          )
          if (target) {
            Object.assign(target, window)
          }
        })
      },

      closeWindow: (trigger) => {
        set((state) => {
          const target = state.activeWindows.find((w) => w.trigger === trigger)
          if (target) {
            target.isOpen = false
          }
        })
        // 延迟清理已关闭的窗口
        setTimeout(() => {
          set((state) => {
            state.activeWindows = state.activeWindows.filter((w) => w.isOpen)
          })
        }, 300)
      },

      focusWindow: (trigger) => {
        set((state) => {
          const target = state.activeWindows.find((w) => w.trigger === trigger)
          if (!target) return

          const isTopMost = state.activeWindows.every(
            (w) => w.zIndex <= target.zIndex
          )
          if (isTopMost && !target.isMinimized) return

          state.globalZIndex += 1
          target.zIndex = state.globalZIndex
          target.isMinimized = false
        })
      },

      minimizeWindow: (trigger) => {
        set((state) => {
          const target = state.activeWindows.find((w) => w.trigger === trigger)
          if (target) {
            target.isMinimized = true
          }
        })
      },

      toggleMaximizeWindow: (trigger) => {
        set((state) => {
          const target = state.activeWindows.find((w) => w.trigger === trigger)
          if (target) {
            target.isMaximized = !target.isMaximized
          }
        })
      },
    })),
    {
      name: 'otab_app_store',
      // 只持久化需要的数据，不持久化 computed 和 actions
      partialize: (state) => ({
        config: state.config,
        activeWindows: state.activeWindows,
        globalZIndex: state.globalZIndex,
      }),
      // 合并初始化数据（只在首次加载时合并 itabData）
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<AppState> | undefined
        if (!persisted || !persisted.config) {
          // 首次加载，合并 itabData
          const mergedSources = [...currentState.config.sources, ...itabSources]
          return {
            ...currentState,
            config: {
              ...currentState.config,
              sources: mergedSources,
            },
            flatedSource: updateFlatedSource(mergedSources),
          }
        }
        return {
          ...currentState,
          ...persisted,
          // 从持久化数据恢复时重建 flatedSource
          flatedSource: updateFlatedSource(persisted.config.sources),
        }
      },
    }
  )
)

// 导出便捷的 selector hooks
export const useConfig = () => useAppStore((state) => state.config)
export const useActiveWindows = () => useAppStore((state) => state.activeWindows)
export const useFlatedSource = () => useAppStore((state) => state.flatedSource)
