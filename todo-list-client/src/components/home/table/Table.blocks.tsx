import { TTodoProgressCircleProps, TTodoProgressContentProps, TTodoRowProps, TTodoTitleProps } from "./Table.types";
import styles from "./Table.module.scss";
import { TODO_LISTS, TODO_LISTS_HEADERS } from "./Table.constants";
import { useTodoProgress, useToggleDropdown } from "./Table.hooks";
import { ETableTodosStatus } from "./Table.enums";
import { useTranslation } from "react-i18next";

export const TableEmpty = () => {
    return (
        <tr>
            <td className={styles.empty} colSpan={4}>
                <div className={styles.emptyContent}>
                    <p>No todo lists yet. Let's create one!</p>
                </div>
            </td>
        </tr>
    );
}

const TodoProgressCircle = ({ props }: TTodoProgressCircleProps) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (props.progress / 100) * circumference;

    return (
        <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className={styles.background} />
            <circle
                cx="50"
                cy="50"
                r="45"
                className={styles.progress}
                style={{ strokeDashoffset: dashOffset }}
                data-progress={props.progress}
            />
        </svg>
    );
};

const TodoProgressContent = ({ props }: TTodoProgressContentProps) => {
    return (
        <div className={styles.progressCircleContent}>
            <span className={styles.progressCirclePercentage}>
                {props.progress}%
            </span>
        </div>
    );
};

const TodoTitle = ({ title }: TTodoTitleProps) => {
    return <span className={styles.title}>{title}</span>;
}

const TodoStatus = ({ status }: { status: ETableTodosStatus }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.status}>
            {t(status)}
        </div>
    )
}

const TodoActions = () => {
    const { t } = useTranslation();
    const toggleDropdownData = useToggleDropdown();

    return (
        <div className={styles.actionsWrapper}>
            <button
                type="button"
                className={styles.actionsTrigger}
                onClick={toggleDropdownData.toggleDropdown}
            >
                ⋮
            </button>

            <div className={toggleDropdownData.dropdownClassName}>
                <button type="button" className={styles.dropdownItem}>
                    {t("todo.view")}
                </button>
                <button type="button" className={styles.dropdownItem}>
                    {t("todo.edit")}
                </button>
                <button type="button" className={styles.dropdownItem}>
                    {t("todo.delete")}
                </button>
            </div>
        </div>
    );
};

const TodoRow = ({ props }: TTodoRowProps) => {
    const todoRowData = useTodoProgress({ props });

    return (
        <tr key={props.id}>
            <td>
                <div className={styles.progressCircle}>
                    <TodoProgressCircle props={{ progress: todoRowData.progress }} />
                    <TodoProgressContent props={{ progress: todoRowData.progress }} />
                </div>
            </td>
            <td>
                <TodoTitle title={props.title} />
            </td>
            <td>
                <TodoStatus status={props.status} />
            </td>
            <td>
                <TodoActions />
            </td>
        </tr>
    );
}

export const TableHeaders = () => {
    const { t } = useTranslation();

    return TODO_LISTS_HEADERS.map((header) => (
        <th key={header.id} className={header.className}>
            {t(header.title)}
        </th>
    ));
}

const TableLists = () => {
    return TODO_LISTS.map((todo) => (
        <TodoRow key={todo.id} props={todo} />
    ));
}

export const TableContent = () => {
    if (!TODO_LISTS.length) {
        return <TableEmpty />;
    }

    return <TableLists />;
}