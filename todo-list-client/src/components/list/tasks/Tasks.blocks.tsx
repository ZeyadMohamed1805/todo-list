import { useRef, useState } from "react";
import { StatusEnum, VariantsEnum } from "../../../enums";
import styles from "./Tasks.module.scss";
import { useTranslation } from "react-i18next";
import Modal from "../../shared/modal";
import Checkbox from "../../shared/checkbox";
import { TDeleteTaskProps, TTaskCheckboxProps, TTaskProps, TTaskRowProps, TTaskTitleProps } from "./Tasks.types";
import { useDeleteTaskMutation, useHandleTaskRowKeyDown, useHandleTaskTitleBlur, useHandleTaskTitleKeyDown, useInitializeTaskTitleInnerText, usePatchTaskMutation } from "./Tasks.hooks";
import Select from "../../shared/select";

const TaskStatus = ({ props }: TTaskProps) => {
    const { t } = useTranslation();
    const [taskStatus, setTaskStatus] = useState(props.task.status);
    
    return <Select props={{ 
        title: "status",
        options: Object.values(StatusEnum).map((status) => ({ value: status, label: t(status) })),
        selectedOption: taskStatus,
        setSelectedOption: (status) => setTaskStatus(status as StatusEnum)
    }} />
}

const DeleteTask = ({ props }: TDeleteTaskProps) => {
    const { t } = useTranslation();
    const deleteTaskMutation = useDeleteTaskMutation();

    return (
        <>
            <button type="button" onClick={() => props.setIsDeleteTaskModalOpen(true)} className={styles.delete} title={t("delete")}>
                ✕
            </button>

            <Modal
                props={{
                    isOpen: props.isDeleteTaskModalOpen,
                    onClose: () => props.setIsDeleteTaskModalOpen(false),
                    title: t("todo.delete_todo"),
                    variant: VariantsEnum.ERROR
                }}
            >
                <div className={styles.deleteModalContent}>
                    <p className={styles.deleteMessage}>{t("todo.delete_confirmation")}</p>
                    <div className={styles.deleteModalActions}>
                        <button type="button" className={styles.confirm} onClick={() => deleteTaskMutation.mutate(props.taskId)}>
                            {t("confirm")}
                        </button>
                        <button type="button" className={styles.cancel} onClick={() => props.setIsDeleteTaskModalOpen(false)}>
                            {t("no_thanks")}
                        </button>
                    </div>
                </div>
            </Modal>
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
        >
            {children}
        </div>
    );
}

export const Task = ({ props }: TTaskProps) => {
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState<boolean>();
    const [isChecked, setIsChecked] = useState(props.task.isCompleted);
    const titleRef = useRef<HTMLDivElement>(null);

    return (
        <TaskRow props={{ ...props, setIsChecked, titleRef, setIsDeleteTaskModalOpen }}>
            <TaskCheckbox props={{ ...props, isChecked, setIsChecked }} />
            <TaskTitle props={{ ...props, titleRef, isChecked }} />
            <TaskStatus props={props} />
            <DeleteTask props={{ taskId: props.task.id, isDeleteTaskModalOpen, setIsDeleteTaskModalOpen }} />
        </TaskRow>
    );
};