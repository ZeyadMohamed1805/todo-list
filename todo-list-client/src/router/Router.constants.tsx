import { Navigate, RouteProps } from 'react-router-dom';
import i18n from 'i18next';
import Auth from '../screens/Auth';
import Home from '../screens/Home';
import Todo from '../screens/Todo';

export const APPLICATION_ROUTES: Array<RouteProps> = [
  { path: '/', element: <Navigate to={`/${i18n.language}/auth`} replace /> },
  { path: '/:lang/auth', Component: Auth },
  { path: '/:lang/home', Component: Home },
  { path: '/:lang/todos/:todoId', Component: Todo },
];
