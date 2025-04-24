import { useMemo } from 'react';
import styles from './Title.module.scss';
import { formatDate } from './Title.service';
import { TTitleProps } from './Title.types';

const Title = ({ props }: TTitleProps) => {
  const formattedDate = useMemo(() => formatDate(props.createdAt), [props.createdAt]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{props.title}</h1>
      <p className={styles.date}>
        {formattedDate}
      </p>
    </div>
  );
};

export default Title;
