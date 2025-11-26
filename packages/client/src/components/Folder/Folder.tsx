import { Folder as FolderIcon } from 'lucide-react';
import styles from './Folder.module.scss';
import clsx from 'clsx';

interface FolderProps {
  name: string;
  onClick?: () => void;
  className?: string;
}

export const Folder = ({ name, onClick, className }: FolderProps) => {
  return (
    <div
      className={clsx(styles.folder, className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.iconWrapper}>
        <FolderIcon className={styles.icon} fill="#007AFF" stroke="#007AFF" />
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
