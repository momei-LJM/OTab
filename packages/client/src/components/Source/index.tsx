import type { Source } from '@/config'
import { Folder } from '../Folder/Folder'
import styles from './Source.module.scss'

interface IconItemProps {
  onClick?: (item: Source) => void
  item: Source
  showName?: boolean
  size?: number
}
export const IconItem: React.FC<IconItemProps> = ({ item, showName, size }) => {
  return (
    <div
      key={item.path}
      className={styles.appItem}
      onClick={() => {
        if (item.url) {
          window.open(item.url, '_blank')
        }
      }}
      style={{ width: size ? 'auto' : undefined }}
    >
      <div
        className={styles.iconWrapper}
        style={size ? { width: size, height: size } : undefined}
      >
        <img
          src={item.icon}
          alt={item.name}
          className={styles.appIcon}
          style={{ ...item.style, width: size, height: size }}
        />
      </div>
      {showName && <span className={styles.name}>{item.name}</span>}
    </div>
  )
}
export const SourceItem: React.FC<IconItemProps> = (
  { item, onClick, size } = {
    showName: true,
    item: {} as Source,
  }
) => {
  return item.type === 'floder' ? (
    <Folder
      key={item.path}
      name={item.name}
      source={item}
      size={size}
      folderIconProps={{ size: 14 }}
      onClick={() => onClick?.(item)}
    />
  ) : (
    <IconItem item={item} size={size} />
  )
}
