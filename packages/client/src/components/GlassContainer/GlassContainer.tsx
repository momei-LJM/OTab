import React from 'react';
import styles from './GlassContainer.module.scss';
import clsx from 'clsx';

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  linear?: boolean;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className = '',
  linear = true,
  ...rest
}) => {
  return (
    <div
      className={clsx(`${styles.glassContainer} ${className}`, {
        [styles.linear]: linear,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};
