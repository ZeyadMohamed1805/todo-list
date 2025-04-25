import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import { AUTHORIZED_ROUTES, PROTECTED_ROUTES, UNPROTECTED_ROUTES } from './Router.constants';
import { useEffect } from 'react';
import { isTokenExpired } from './Router.service';
import { useTranslation } from 'react-i18next';

export const ProtectedRoutes = PROTECTED_ROUTES.map((route, index) => {
  return <Route key={index} {...route} />;
});

export const UnProtectedRoutes = UNPROTECTED_ROUTES.map((route, index) => {
  return <Route key={index} {...route} />;
});

export const AuthorizedRoutes = AUTHORIZED_ROUTES.map((route, index) => {
  return <Route key={index} {...route} />;
});

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { i18n: { language } } = useTranslation();

  useEffect(() => {
    const checkToken = () => {
      const isExpired = isTokenExpired();

      if (isExpired) {
        navigate(`/${language}/auth`);
      }
    };

    checkToken();
  }, [navigate, language]);

  return <Outlet />;
};

export const AuthorizedRoute = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n: { language } } = useTranslation();

  useEffect(() => {
    const isAuthPage = pathname.includes('auth');

    if (!isTokenExpired() && isAuthPage) {
      navigate(`/${language}/home`);
    }
  }, [navigate, pathname, language]);

  return <Outlet />;
}