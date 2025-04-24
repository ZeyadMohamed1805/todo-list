import { useEffect, useState } from 'react';
import { TUseTodoListProgressCompletedProps } from './Progress.types';

export const useTodoListProgressCompleted = ({ props }: TUseTodoListProgressCompletedProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(props.progress);
    }, 250);

    return () => clearTimeout(timeout);
  }, [props.progress]);

  return { progress };
};
