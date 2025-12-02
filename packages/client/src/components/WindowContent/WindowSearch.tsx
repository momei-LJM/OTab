import clsx from 'clsx'
import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styles from './WindowSearch.module.scss'

interface WindowSearchProps {
  onSearch: (query: string) => void
}

export const WindowSearch = ({ onSearch }: WindowSearchProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleToggle = () => {
    if (isOpen && value) {
      // If open and has value, clear it first? Or just close?
      // Usually clicking search icon again might submit or do nothing.
      // Let's make it toggle close if empty, or focus if not.
      // But the requirement is "click search icon, input box 0-1 effect".
      // Let's assume clicking icon toggles the search bar.
    }

    const nextState = !isOpen
    setIsOpen(nextState)

    if (!nextState) {
      setValue('')
      onSearch('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onSearch(newValue)
  }

  const handleBlur = () => {
    if (!value) {
      setIsOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setValue('')
      onSearch('')
    }
  }

  return (
    <div
      className={clsx(styles.searchContainer, { [styles.open]: isOpen })}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleToggle}
        title="Search"
      >
        <Search size={16} />
      </button>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
        placeholder="Search"
      />
    </div>
  )
}
