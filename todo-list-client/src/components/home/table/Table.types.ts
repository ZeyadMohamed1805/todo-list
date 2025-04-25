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

export type TTodoImageIconProps = {
  props: { 
    imagePath?: string | null 
  }
}

export type TTodoTitleProps = {
  props: {
    title: string;
  }
};

export type TTodoActionsProps = {
  id: string;
};

type TTodoList = {
  id: string;
  title: string;
  progress: number;
  imagePath?: string | null;
};

export type TTodoRowProps = {
  props: TTodoList;
};

export type TUseTodoProgressProps = {
  props: {
    progress: number;
  };
};

export type TUseDeleteTodoListMutation = {
  props: {
    setIsDeleteModalOpen: (isOpen: boolean) => void;
  }
};

export type TTableListProps = {
  props: {
    todoLists: TTodoList[];
  }
};

export type TEmptyTableProps = {
  props?: {
    isLoading?: boolean;
  }
};