import { WindowSnapshot } from '@/config';
import { AppContext } from '@/context';
import { useContext } from 'react';
import styles from './Folder.module.scss';
import { Folder } from './Folder';

export const ContentRender: React.FC<{ data?: WindowSnapshot }> = ({
  data,
}) => {
  const { flatedSource } = useContext(AppContext);
  const show = flatedSource.get(data?.trigger || '');
  return (
    <div className={styles.content}>
      {show?.children?.map((child) =>
        child.type === 'floder' ? (
          <Folder key={child.path} name={child.name} source={child} />
        ) : (
          <div
            key={child.path}
            className={styles.appItem}
            onClick={() => {
              if (child.url) {
                window.open(child.url, '_blank');
              }
            }}
          >
            <div className={styles.iconWrapper}>
              <img
                src={child.icon}
                alt={child.name}
                className={styles.appIcon}
                style={child.style}
              />
            </div>
            <span className={styles.name}>{child.name}</span>
          </div>
        )
      )}
    </div>
  );
};
