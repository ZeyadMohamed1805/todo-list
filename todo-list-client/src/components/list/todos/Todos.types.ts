import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { TodosStatusEnum } from "../../../enums";

export type TTodo = {
    id: string;
    title: string;
    completed: boolean;
    status: TodosStatusEnum;
};

export type TTodoProps = {
    props: {
        todo: TTodo;
        todoRef: (element: HTMLDivElement | null) => void;
    }
};

export type TTodosProps = {
    props: {
        todos: Array<TTodo>;
    }
}

export type TTodoRowProps = {
    props: {
        todo: TTodo;
        todoRef: (element: HTMLDivElement | null) => void;
        titleRef: RefObject<HTMLDivElement | null>;
        setIsDeleteTodoModalOpen: Dispatch<SetStateAction<boolean | undefined>>;
        setIsChecked: Dispatch<SetStateAction<boolean>>;
    };
    children: ReactNode;
};

export type TTodoTitleProps = {
    props: {
        todo: TTodo;
        titleRef: RefObject<HTMLDivElement | null>;
        isChecked: boolean;
    }
}

export type TDeleteTodoProps = {
    props: {
        isDeleteTodoModalOpen: boolean | undefined;
        setIsDeleteTodoModalOpen: Dispatch<SetStateAction<boolean | undefined>>;
    };
};

export type TUseInitializeTodoTitleInnerText = {
    props: {
        titleRef: RefObject<HTMLDivElement | null>;
        todo: TTodo;
    }
}

export type TUseHandleTodoTitleBlur = {
    props: {
        todo: TTodo;
        setTodoTitle: Dispatch<SetStateAction<string>>;
    }
}

export type TUseHandleTodoTitleKeyDown = {
    props: {
        todoTitle: string;
    }
}