import { Folder as FolderIcon } from 'lucide-react';
import styles from './Folder.module.scss';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { Window } from '@/components/Window/Window';
import { AppContext } from '@/context';
import { Source } from '@/config';
interface FolderProps {
  name: string;
  onClick?: () => void;
  className?: string;
  source: Source;
}
export const ContentRender = (data?: any) => {
  return <div>Folder Content for </div>;
};
export const Folder = ({ name, onClick, className, source }: FolderProps) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { windowContext } = useContext(AppContext);

  const create = () => {
    windowContext.createWindow({
      type: 'folder',
      trigger: source.path,
      isOpen: true,
    });
  };
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
          onClick={create}
        />
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
