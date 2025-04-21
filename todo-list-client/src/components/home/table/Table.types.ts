import { ETableTodosStatus } from './Table.enums';

export type TTodoProgressCircleProps = {
  props: {
    progress: number;
  };
};

export type TTodoProgressContentProps = {
  props: {
    progress: number;
  };
};

export type TTodoTitleProps = {
  title: string;
};

type TTodoList = {
  id: string;
  title: string;
  status: ETableTodosStatus;
  progress: number;
};

export type TTodoRowProps = {
  props: TTodoList;
};

export type TUseTodoProgressProps = {
  props: {
    progress: number;
  };
};
