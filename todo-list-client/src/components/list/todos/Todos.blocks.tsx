import { useRef, useState } from "react";
import { TodosStatusEnum, VariantsEnum } from "../../../enums";
import styles from "./Todos.module.scss";
import { useTranslation } from "react-i18next";
import Modal from "../../shared/modal";
import Checkbox from "../../shared/checkbox";
import { TDeleteTodoProps, TTodoProps, TTodoRowProps, TTodoTitleProps } from "./Todos.types";
import { useHandleTodoRowKeyDown, useHandleTodoTitleBlur, useHandleTodoTitleKeyDown, useInitializeTodoTitleInnerText } from "./Todos.hooks";
import Select from "../../shared/select";

const TodoStatus = ({ props }: TTodoProps) => {
    const { t } = useTranslation();
    const [todoStatus, setTodoStatus] = useState(props.todo.status);

    return <Select props={{ 
        title: "status",
        options: Object.values(TodosStatusEnum).map((status) => ({ value: t(status), label: t(status) })),
        selectedOption: todoStatus,
        setSelectedOption: (status) => setTodoStatus(status as TodosStatusEnum)
    }} />
}

const DeleteTodo = ({ props }: TDeleteTodoProps) => {
    const { t } = useTranslation();

    return (
        <>
            <button type="button" onClick={() => props.setIsDeleteTodoModalOpen(true)} className={styles.delete} title={t("delete")}>
                ✕
            </button>

            <Modal
                props={{
                    isOpen: props.isDeleteTodoModalOpen,
                    onClose: () => props.setIsDeleteTodoModalOpen(false),
                    title: "Delete Todo",
                    variant: VariantsEnum.ERROR
                }}
            >
                <div className={styles.deleteModalContent}>
                    <p className={styles.deleteMessage}>Are you sure you want to delete this Todo?</p>
                    <div className={styles.deleteModalActions}>
                        <button type="button" className={styles.confirm} onClick={() => props.setIsDeleteTodoModalOpen(false)}>
                            Confirm
                        </button>
                        <button type="button" className={styles.cancel} onClick={() => props.setIsDeleteTodoModalOpen(false)}>
                            No, Thanks!
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

const TodoTitle = ({ props }: TTodoTitleProps) => {
    const todoTitleData = useInitializeTodoTitleInnerText({ props });
    const handleTodoTitleBlur = useHandleTodoTitleBlur({ props: { ...props, setTodoTitle: todoTitleData.setTodoTitle } });
    const handleTodoTitleKeyDown = useHandleTodoTitleKeyDown({ props: { todoTitle: todoTitleData.todoTitle } });

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

const TodoRow = ({ props, children }: TTodoRowProps) => {
    const handleTodoRowKeydown = useHandleTodoRowKeyDown({ props, children });

    return (
        <div
            tabIndex={0}
            ref={props.todoRef}
            className={styles.row}
            onKeyDown={handleTodoRowKeydown}
        >
            {children}
        </div>
    );
}

export const Todo = ({ props }: TTodoProps) => {
    const [isDeleteTodoModalOpen, setIsDeleteTodoModalOpen] = useState<boolean>();
    const [isChecked, setIsChecked] = useState(props.todo.completed);
    const titleRef = useRef<HTMLDivElement>(null);

    return (
        <TodoRow props={{ ...props, setIsChecked, titleRef, setIsDeleteTodoModalOpen }}>
            <Checkbox props={{ isChecked, setIsChecked, title: "isTodoCompleted" }} />
            <TodoTitle props={{ ...props, titleRef, isChecked }} />
            <TodoStatus props={props} />
            <DeleteTodo props={{ isDeleteTodoModalOpen, setIsDeleteTodoModalOpen }} />
        </TodoRow>
    );
};