import { useRef, useState } from "react";
import styles from "./Tasks.module.scss";
import { useTranslation } from "react-i18next";
import Checkbox from "../../shared/checkbox";
import { TDeleteTaskProps, TTaskCheckboxProps, TTaskProps, TTaskRowProps, TTaskTitleProps } from "./Tasks.types";
import { useDeleteTaskMutation, useHandleTaskRowKeyDown, useHandleTaskTitleBlur, useHandleTaskTitleKeyDown, useInitializeTaskTitleInnerText, usePatchTaskMutation } from "./Tasks.hooks";
import DeleteModal from "../../shared/deleteModal";

const DeleteTask = ({ props }: TDeleteTaskProps) => {
    const { t } = useTranslation();
    const deleteTaskMutation = useDeleteTaskMutation({ props });

    return (
        <>
            <button type="button" onClick={() => props.setIsDeleteModalOpen(true)} className={styles.delete} title={t("delete")}>
                ✕
            </button>

            <DeleteModal
                props={{
                    isDeleteModalOpen: props.isDeleteModalOpen,
                    setIsDeleteModalOpen: props.setIsDeleteModalOpen,
                    onClose: () => props.setIsDeleteModalOpen(false),
                    onConfirm: () => deleteTaskMutation.mutate(props.taskId)
                }} 
            />
        </>
    );
}

const TaskTitle = ({ props }: TTaskTitleProps) => {
    const taskTitleData = useInitializeTaskTitleInnerText({ props });
    const handleTodoTitleBlur = useHandleTaskTitleBlur({ props: { ...props, setTaskTitle: taskTitleData.setTaskTitle } });
    const handleTodoTitleKeyDown = useHandleTaskTitleKeyDown({ props: { taskId: props.task.id, taskTitle: taskTitleData.taskTitle } });

    return (
        <div className={styles.titleWrapper}>
            <div
                ref={props.titleRef}
                className={`${styles.title} ${props.isChecked ? styles.completed : ''}`}
                contentEditable
                onBlur={handleTodoTitleBlur}
                onKeyDown={handleTodoTitleKeyDown}
            />
        </div>
    );
}

const TaskCheckbox = ({ props }: TTaskCheckboxProps) => {
    const patchTaskMutation = usePatchTaskMutation();

    return (
        <Checkbox
            props={{
                isChecked: props.isChecked,
                setIsChecked: (isChecked) => {
                    props.setIsChecked(isChecked);
                    patchTaskMutation.mutate({
                        taskId: props.task.id,
                        data: { isCompleted: !props.isChecked }
                    });
                },
                title: "isCompleted"
            }}
        />
    );
}

const TaskRow = ({ props, children }: TTaskRowProps) => {
    const handleTodoRowKeydown = useHandleTaskRowKeyDown({ props, children });

    return (
        <div
            tabIndex={0}
            ref={props.taskRef}
            className={styles.row}
            onKeyDown={handleTodoRowKeydown}
            draggable
            onDragStart={(e) => props.handleDragStart(e, props.task.id)}
            onDragOver={(e) => props.handleDragOver(e, props.task.id)}
            onDrop={props.handleDrop}
        >
            {children}
        </div>
    );
}

export const Task = ({ props }: TTaskProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>();
    const [isChecked, setIsChecked] = useState(props.task.isCompleted);
    const titleRef = useRef<HTMLDivElement>(null);

    return (
        <TaskRow props={{ ...props, setIsChecked, titleRef, setIsDeleteModalOpen }}>
            <TaskCheckbox props={{ ...props, isChecked, setIsChecked }} />
            <TaskTitle props={{ ...props, titleRef, isChecked }} />
            <DeleteTask props={{ taskId: props.task.id, isDeleteModalOpen, setIsDeleteModalOpen }} />
        </TaskRow>
    );
};