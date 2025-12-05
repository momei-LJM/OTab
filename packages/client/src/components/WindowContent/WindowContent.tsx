import type { WindowSnapshot } from '@/config'
import clsx from 'clsx'
import {
  ChevronLeft,
  ChevronRight,
  Folder as FolderIcon,
  HardDrive,
  LayoutGrid,
  List,
} from 'lucide-react'
import React, { use, useState } from 'react'
import { useAppStore, useConfig, useFlatedSource } from '@/store'
import { getCssVar } from '@/utils'
import { GlassContainer } from '../GlassContainer'
import { SourceItem } from '../Source'
import { SystemSettings } from '../SystemSettings'
import { WindowLocalContext } from '../Window/WindowLocalContext'
import { WindowSidebar } from '../Window/WindowSidebar'
import styles from './WindowContent.module.scss'
import { WindowSearch } from './WindowSearch'

const EmptyFolder: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <FolderIcon size={48} opacity={0.2} />
      <span>Empty Folder</span>
    </div>
  )
}

interface LayoutProps {
  layout: 'grid' | 'list'
  items: any[]
  onItemClick: (item: any) => void
}

const Layout: React.FC<LayoutProps> = ({ layout, items, onItemClick }) => {
  if (!items?.length) return <EmptyFolder />

  if (layout === 'grid') {
    return (
      <div className={styles.content}>
        {items.map((child) => (
          <SourceItem
            item={child}
            key={child.path}
            onClick={(child) => onItemClick(child)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.listContainer}>
      {items.map((child) => (
        <div
          key={child.path}
          className={styles.listItem}
          onClick={() => onItemClick(child)}
        >
          <SourceItem
            item={child}
            size={24}
            onClick={() => onItemClick(child)}
          />
          <span className={styles.listName}>{child.name}</span>
        </div>
      ))}
    </div>
  )
}

export const WindowContent: React.FC<{ data?: WindowSnapshot }> = ({
  data,
}) => {
  const flatedSource = useFlatedSource()
  const config = useConfig()
  const updateWindow = useAppStore((state) => state.updateWindow)
  const { handleDragStart } = use(WindowLocalContext)

  const [layoutState, setLayoutState] = useState<'list' | 'grid'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const currentPath = data?.currentPath || data?.trigger || ''
  const show = flatedSource.get(currentPath)
  const sources = config.sources

  const history = data?.history || [currentPath]
  const historyIndex = data?.historyIndex ?? 0
  const canGoBack = historyIndex > 0
  const canGoForward = historyIndex < history.length - 1

  const filteredChildren = show?.children?.filter((child) =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSidebarClick = (path: string) => {
    if (!data) {
      return
    }
    if (path === currentPath) return

    const newHistory = history.slice(0, historyIndex + 1).concat(path)
    updateWindow({
      trigger: data.trigger,
      currentPath: path,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    })
  }

  const handleBack = () => {
    if (!canGoBack || !data) return
    const newIndex = historyIndex - 1
    updateWindow({
      trigger: data.trigger,
      currentPath: history[newIndex],
      historyIndex: newIndex,
    })
  }

  const handleForward = () => {
    if (!canGoForward || !data) return
    const newIndex = historyIndex + 1
    updateWindow({
      trigger: data.trigger,
      currentPath: history[newIndex],
      historyIndex: newIndex,
    })
  }
  const isSystemSetting = data?.type === 'system:setting'

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <WindowSidebar>
        <div className={styles.sidebarGroup}>
          <div className={styles.sidebarGroupTitle}>Favorites</div>
          {sources.map((source) => (
            <div
              key={source.path}
              className={clsx(styles.sidebarItem, {
                [styles.active]: currentPath === source.path,
              })}
              onClick={(e) => {
                e.stopPropagation()
                handleSidebarClick(source.path)
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <FolderIcon size={16} stroke={'rgba(24,24,24)'} />
              <span>{source.name}</span>
            </div>
          ))}
        </div>
      </WindowSidebar>

      {/* Main Content */}
      <div className={styles.main}>
        {isSystemSetting ? (
          <SystemSettings />
        ) : (
          <>
            <div className={styles.toolbar} onPointerDown={handleDragStart}>
              <div
                className={styles.navControls}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <GlassContainer className={styles.navControls} linear={false}>
                  <button
                    type="button"
                    className={styles.navButton}
                    disabled={!canGoBack}
                    onClick={handleBack}
                    title="Go Back"
                  >
                    <ChevronLeft size={30} />
                  </button>
                  <button
                    type="button"
                    className={styles.navButton}
                    disabled={!canGoForward}
                    onClick={handleForward}
                    title="Go Forward"
                  >
                    <ChevronRight size={30} />
                  </button>
                </GlassContainer>
              </div>

              <span className={styles.pathTitle}>{show?.name}</span>

              <div
                className={styles.toolbarControls}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className={clsx(styles.toolbarButton, {
                    [styles.active]: layoutState === 'grid',
                  })}
                  onClick={() => setLayoutState('grid')}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  type="button"
                  className={clsx(styles.toolbarButton, {
                    [styles.active]: layoutState === 'list',
                  })}
                  onClick={() => setLayoutState('list')}
                >
                  <List size={16} />
                </button>
                <WindowSearch onSearch={setSearchQuery} />
              </div>
            </div>
            <Layout
              layout={layoutState}
              items={filteredChildren || []}
              onItemClick={(child) => handleSidebarClick(child.path)}
            />
          </>
        )}
      </div>
    </div>
  )
}
