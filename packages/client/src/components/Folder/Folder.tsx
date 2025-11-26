import { Folder as FolderIcon } from 'lucide-react';
import styles from './Folder.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { Window } from '@/components/Window/Window';
interface FolderProps {
  name: string;
  onClick?: () => void;
  className?: string;
}

export const Folder = ({ name, onClick, className }: FolderProps) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  return (
    <div
      className={clsx(styles.folder, className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.iconWrapper}>
        <FolderIcon
          className={styles.icon}
          fill="#007AFF"
          stroke="#007AFF"
          onClick={() => setIsAboutOpen(true)}
        />
      </div>
      <span className={styles.name}>{name}</span>
      <Window
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        title="About OTab"
      >
        1
      </Window>
    </div>
  );
};
