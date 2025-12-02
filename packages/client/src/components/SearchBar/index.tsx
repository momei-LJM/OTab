import type { FormEvent } from 'react'
import type { OTabConfig } from '@/config'
import { ChevronDown, Search, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { SEARCH_ENGINES } from '@/consts/config'
import { useAppStore, useConfig } from '@/store'
import styles from './SearchBar.module.scss'

type SearchEngine = OTabConfig['searchEngine']

export const SearchBar: React.FC = () => {
  const config = useConfig()
  const updateConfig = useAppStore((state) => state.updateConfig)
  const [query, setQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentEngine = config.searchEngine
  const engineInfo = SEARCH_ENGINES[currentEngine]

  // 快捷键支持：Cmd/Ctrl + K 聚焦
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const searchUrl = engineInfo.url + encodeURIComponent(query.trim())
    window.open(searchUrl, '_blank')
  }

  const handleClear = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  const handleEngineChange = (engine: SearchEngine) => {
    updateConfig({ searchEngine: engine })
    setIsDropdownOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false)
    }
  }

  return (
    <div className={styles.searchBar} onKeyDown={handleKeyDown}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        {/* 搜索引擎选择器 */}
        <div className={styles.engineSelector}>
          <button
            type="button"
            className={styles.engineButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="选择搜索引擎"
          >
            <img
              src={engineInfo.icon}
              alt={engineInfo.name}
              className={styles.engineIcon}
            />
            <ChevronDown
              size={14}
              className={`${styles.chevron} ${isDropdownOpen ? styles.open : ''}`}
            />
          </button>

          {/* 下拉菜单 */}
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              {(Object.keys(SEARCH_ENGINES) as SearchEngine[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`${styles.dropdownItem} ${key === currentEngine ? styles.active : ''}`}
                  onClick={() => handleEngineChange(key)}
                >
                  <img
                    src={SEARCH_ENGINES[key].icon}
                    alt={SEARCH_ENGINES[key].name}
                    className={styles.engineIcon}
                  />
                  <span>{SEARCH_ENGINES[key].name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 搜索输入框 */}
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder={`在 ${engineInfo.name} 中搜索...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsDropdownOpen(false)}
        />

        {/* 清除按钮 */}
        {query && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="清除"
          >
            <X size={14} />
          </button>
        )}

        {/* 搜索按钮 */}
        <button
          type="submit"
          className={`${styles.searchButton} ${query.trim() ? styles.active : ''}`}
          aria-label="搜索"
        >
          <Search size={18} />
        </button>
      </form>

      {/* 点击外部关闭下拉菜单 */}
      {isDropdownOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  )
}
