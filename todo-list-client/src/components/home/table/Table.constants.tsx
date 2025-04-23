import { TodosStatusEnum } from '../../../enums';
import styles from './Table.module.scss';

export const TODO_LISTS = [
  { id: '1', title: 'Work', status: TodosStatusEnum.IN_PROGRESS, progress: 60 },
  { id: '2', title: 'Groceries', status: TodosStatusEnum.BLOCKED, progress: 20 },
  { id: '3', title: 'Hobbies', status: TodosStatusEnum.DONE, progress: 100 },
  { id: '4', title: 'Responsibilities', status: TodosStatusEnum.TODO, progress: 0 },
];

export const TODO_LISTS_HEADERS = [
  { id: '1', className: styles.headerProgress, title: 'todo.progress' },
  { id: '2', className: styles.headerTitle, title: 'todo.title' },
  { id: '3', className: styles.headerStatus, title: 'todo.status' },
  { id: '4', className: styles.headerActions, title: '' },
];
