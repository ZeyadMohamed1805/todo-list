import styles from './Progress.module.scss';
import { TProgressProps } from './Progress.types';
import { useTodoListProgressCompleted } from './Progress.hooks';
import { useRef } from 'react';

const Progress = ({ props }: TProgressProps) => {
  const todoListProgressProgressData = useTodoListProgressCompleted({ props });
  const progressRef = useRef<HTMLDivElement>(null);
  
  if (progressRef.current) {
    progressRef.current.style.width = `${todoListProgressProgressData.progress}%`;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div
          ref={progressRef}
          className={styles.fill}
        />
        <span className={styles.progress}>{props.progress.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default Progress;
