import type { Source } from '@/config'
import { Folder } from '../Folder/Folder'
import styles from './Source.module.scss'

interface IconItemProps {
  onClick?: (item: Source) => void
  item: Source
}
export const IconItem: React.FC<IconItemProps> = ({ item }) => {
  return (
    <div
      key={item.path}
      className={styles.appItem}
      onClick={() => {
        if (item.url) {
          window.open(item.url, '_blank')
        }
        // onClick?.(item);
      }}
    >
      <div className={styles.iconWrapper}>
        <img
          src={item.icon}
          alt={item.name}
          className={styles.appIcon}
          style={item.style}
        />
      </div>
      <span className={styles.name}>{item.name}</span>
    </div>
  )
}
export const SourceItem: React.FC<IconItemProps> = ({ item, onClick }) => {
  return item.type === 'floder' ? (
    <Folder
      key={item.path}
      name={item.name}
      source={item}
      onClick={() => onClick?.(item)}
    />
  ) : (
    <IconItem item={item} />
  )
}
