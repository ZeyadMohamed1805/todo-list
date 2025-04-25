import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { StatusEnum } from "../../../enums";

export type TTask = {
    id: string;
    title: string;
    isCompleted: boolean;
    createdAt: string;
    status: StatusEnum;
};

export type TTaskProps = {
    props: {
        task: TTask;
        taskRef: (element: HTMLDivElement | null) => void;
    }
};

export type TTaskRowProps = {
    props: {
        task: TTask;
        taskRef: (element: HTMLDivElement | null) => void;
        titleRef: RefObject<HTMLDivElement | null>;
        setIsDeleteTaskModalOpen: Dispatch<SetStateAction<boolean | undefined>>;
        setIsChecked: Dispatch<SetStateAction<boolean>>;
    };
    children: ReactNode;
};

export type TTaskTitleProps = {
    props: {
        task: TTask;
        titleRef: RefObject<HTMLDivElement | null>;
        isChecked: boolean;
    }
}

export type TTaskCheckboxProps = {
    props: {
        task: TTask;
        isChecked: boolean;
        setIsChecked: Dispatch<SetStateAction<boolean>>;
    }
}

export type TDeleteTaskProps = {
    props: {
        taskId: string;
        isDeleteTaskModalOpen: boolean | undefined;
        setIsDeleteTaskModalOpen: Dispatch<SetStateAction<boolean | undefined>>;
    };
};

export type TPatchTaskData = {
    taskId: string; 
    data: Partial<TTask>;
}

export type TUseInitializeTaskTitleInnerText = {
    props: {
        titleRef: RefObject<HTMLDivElement | null>;
        task: TTask;
    }
}

export type TUseHandleTaskTitleBlur = {
    props: {
        task: TTask;
        setTaskTitle: Dispatch<SetStateAction<string>>;
    }
}

export type TUseHandleTaskTitleKeyDown = {
    props: {
        taskId: string;
        taskTitle: string;
    }
}