import { Navigate, RouteProps } from 'react-router-dom';
import i18n from 'i18next';
import Auth from '../screens/Auth';
import Home from '../screens/Home';
import List from '../screens/List';
import { LanguagesEnum } from '../components/shared/localeButton/LocaleButton.enums';
import NotFound from '../screens/NotFound';

export const PROTECTED_ROUTES: Array<RouteProps> = [
  ...Object.values(LanguagesEnum).map((lang) => [
    { path: `/${lang}/home`, element: <Home /> },
    { path: `/${lang}/lists/:listId`, element: <List /> },
  ]).flat(),
];

export const UNPROTECTED_ROUTES: Array<RouteProps> = [
  { path: '/', element: <Navigate to={`/${i18n.language}/auth`} replace /> },
  { path: `*`, element: <NotFound /> }
];

export const AUTHORIZED_ROUTES: Array<RouteProps> = [
  ...Object.values(LanguagesEnum).map((lang) => [
    { path: `/${lang}/auth`, element: <Auth /> },
  ]).flat(),
];
