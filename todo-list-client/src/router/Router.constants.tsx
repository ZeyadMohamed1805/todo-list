import Auth from '../screens/Auth';
import i18n from 'i18next';
import { Navigate, RouteProps } from 'react-router-dom';

export const APPLICATION_ROUTES: Array<RouteProps> = [
  { path: '/', element: <Navigate to={`/${i18n.language}/auth`} replace /> },
  { path: '/:lang/auth', Component: Auth },
];
