import {
  TEmptyTableProps,
  TTableListProps,
  TTodoActionsProps,
  TTodoImageIconProps,
  TTodoProgressCircleProps,
  TTodoProgressContentProps,
  TTodoRowProps,
  TTodoTitleProps,
} from './Table.types';
import styles from './Table.module.scss';
import { TODO_LISTS_HEADERS } from './Table.constants';
import { useDeleteTodoListMutation, useRequestTodoLists, useTodoListProgress, useToggleDropdown } from './Table.hooks';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import DeleteModal from '../../shared/deleteModal';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { showLoading } from '../../shared/loading/Loading.service';

export const EmptyTable = ({ props }: TEmptyTableProps) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td className={styles.empty} colSpan={4}>
        <div className={styles.emptyContent}>
          <p>{t(props?.isLoading ? "loading" : "home.empty_list")}</p>
        </div>
      </td>
    </tr>
  );
};

const TodoListProgressCircle = ({ props }: TTodoProgressCircleProps) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (props.progress / 100) * circumference;
  const progressRef = useRef<SVGCircleElement>(null);

  if (progressRef.current) {
    progressRef.current.style.strokeDashoffset = `${dashOffset}`;
  }

  return (
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" className={styles.background} />
      <circle
        ref={progressRef}
        cx="50"
        cy="50"
        r="45"
        className={styles.progress}
        data-progress={props.progress}
      />
    </svg>
  );
};

const TodoListProgressContent = ({ props }: TTodoProgressContentProps) => {
  return (
    <div className={styles.progressCircleContent}>
      <span className={styles.progressCirclePercentage}>{props.progress}%</span>
    </div>
  );
};

const TodoListIcon = ({ props }: TTodoImageIconProps) => {
  return (
    <>
      {
        props.imagePath ?
        <img
          className={styles.icon}
          src={`${import.meta.env.VITE_IMAGES_BASE_URL}/${props.imagePath}`}
          alt="Todo List Icon"
        /> :
        <span className={styles.icon}>📋 </span>
      }
    </>
  )
}

const TodoListTitle = ({ props }: TTodoTitleProps) => {
  return <span className={styles.title}>{props.title}</span>;
};

const TodoListActions = ({ id }: TTodoActionsProps) => {
  const { t, i18n: { language } } = useTranslation();
  const navigate = useNavigate();
  const toggleDropdownData = useToggleDropdown();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>();
  const deleteTodoListMutation = useDeleteTodoListMutation({ props: { setIsDeleteModalOpen } });
  const viewTodoListRef = useRef<HTMLButtonElement>(null);
  const deleteTodoListRef = useRef<HTMLButtonElement>(null);
  const clickOutsideRefs = useClickOutside<HTMLButtonElement>(
    toggleDropdownData.closeDropdown,
    [viewTodoListRef, deleteTodoListRef]
  );

  return (
    <div className={styles.actionsWrapper}>
      <button
        ref={clickOutsideRefs.elementRef}
        type="button"
        className={styles.actionsTrigger}
        onClick={toggleDropdownData.toggleDropdown}
      >
        ⋮
      </button>

      <div className={toggleDropdownData.dropdownClassName}>
        <button ref={viewTodoListRef} type="button" onClick={() => navigate(`/${language}/lists/${id}`)} className={styles.dropdownItem}>
          {t('todo.view')}
        </button>
        <button ref={deleteTodoListRef} type="button" onClick={() => setIsDeleteModalOpen(true)} className={styles.dropdownItem}>
          {t('todo.delete')}
        </button>
      </div>

      <DeleteModal
        props={{
          isDeleteModalOpen,
          setIsDeleteModalOpen,
          onClose: () => setIsDeleteModalOpen(false),
          onConfirm: () => {
            showLoading();
            deleteTodoListMutation.mutate(id)
          },
        }}
      />
    </div>
  );
};

const TodoListRow = ({ props }: TTodoRowProps) => {
  const todoListRowData = useTodoListProgress({ props });

  return (
    <tr key={props.id}>
      <td>
        <div className={styles.progressCircle}>
          <TodoListProgressCircle props={{ progress: todoListRowData.progress }} />
          <TodoListProgressContent props={{ progress: todoListRowData.progress }} />
        </div>
      </td>
      <td>
        <div className={styles.todoListTitleContainer}>
          <TodoListIcon props={{ imagePath: props.imagePath}} />
          <TodoListTitle props={{ title: props.title }} />
        </div>
      </td>
      <td>
        <TodoListActions id={props.id} />
      </td>
    </tr>
  );
};

export const TableHeaders = () => {
  const { t } = useTranslation();

  return TODO_LISTS_HEADERS.map((header) => (
    <th key={header.id} className={header.className}>
      {t(header.title)}
    </th>
  ));
};

const TableLists = ({ props }: TTableListProps) => {
  return props.todoLists.map((todoList) => <TodoListRow key={todoList.id} props={todoList} />);
};

export const TableContent = () => {
  const todoListsRequest = useRequestTodoLists();

  if (todoListsRequest.isLoading) {
    return <EmptyTable props={{ isLoading: todoListsRequest.isLoading }} />
  }

  if (!todoListsRequest.data.length) {
    return <EmptyTable />;
  }

  return <TableLists props={{ todoLists: todoListsRequest.data }} />;
};
