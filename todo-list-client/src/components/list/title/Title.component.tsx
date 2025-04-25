import { useMemo } from 'react';
import styles from './Title.module.scss';
import { formatDate } from './Title.service';
import { TTitleProps } from './Title.types';

const Title = ({ props }: TTitleProps) => {
  const formattedDate = useMemo(() => formatDate(props.createdAt), [props.createdAt]);

  return (
    <div className={styles.wrapper}>
      {
        props.icon ? (
          <img
            src={URL.createObjectURL(props.icon)}
            alt="Todo List Icon"
            className={styles.icon}
          />
        ) :
        <span className={styles.icon}>📋 </span>
      }
      <div className={styles.titleContent}>
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.date}>
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default Title;
