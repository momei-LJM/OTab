import { div, style } from 'framer-motion/client';
import React, { useState } from 'react';
import styles from './Clock.module.scss';

function calcTime() {
  return {
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    date: new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
  };
}
export const Clock: React.FC = () => {
  const [clock, setDisplay] = useState(calcTime);
  requestAnimationFrame(function update() {
    setDisplay(() => calcTime());
  });

  return (
    <div className={styles.centerContent}>
      <h1 className={styles.clock}>{clock.time}</h1>
      <div className={styles.date}>{clock.date}</div>
    </div>
  );
};
