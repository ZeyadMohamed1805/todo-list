import { Navigate, RouteProps } from 'react-router-dom';
import i18n from 'i18next';
import Auth from '../screens/Auth';
import Home from '../screens/Home';
import List from '../screens/List';

export const APPLICATION_ROUTES: Array<RouteProps> = [
  { path: '/', element: <Navigate to={`/${i18n.language}/auth`} replace /> },
  { path: '/:lang/auth', Component: Auth },
  { path: '/:lang/home', Component: Home },
  { path: '/:lang/lists/:listId', Component: List },
];
