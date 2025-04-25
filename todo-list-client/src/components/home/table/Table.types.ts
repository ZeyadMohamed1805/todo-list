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

export type TTodoActionsProps = {
  id: string;
};

type TTodoList = {
  id: string;
  title: string;
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

export type TTableListProps = {
  props: {
    todoLists: TTodoList[];
  }
};