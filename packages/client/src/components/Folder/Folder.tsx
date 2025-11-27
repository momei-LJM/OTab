import { Source } from '@/config';
import { WindowsContext } from '@/context';
import { getCssVar } from '@/utils';
import clsx from 'clsx';
import { Folder as FolderIcon } from 'lucide-react';
import { useContext } from 'react';
import styles from './Folder.module.scss';
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
  const { createWindow } = useContext(WindowsContext);

  const create = () => {
    createWindow({
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
          fill={getCssVar('primary-color')}
          stroke={getCssVar('primary-color')}
          onClick={create}
        />
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
