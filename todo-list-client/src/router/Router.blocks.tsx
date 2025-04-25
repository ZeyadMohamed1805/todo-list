import { Outlet, Route, useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from './Router.constants';
import { useEffect } from 'react';
import { isTokenExpired } from './Router.service';
import { useTranslation } from 'react-i18next';

export const ProtectedRoutes = PROTECTED_ROUTES.map((route, index) => {
  return <Route key={index} {...route} />;
});

export const UnProtectedRoutes = UNPROTECTED_ROUTES.map((route, index) => {
  return <Route key={index} {...route} />;
});

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { i18n: { language } } = useTranslation();

  useEffect(() => {
    const checkToken = () => {
      const expired = isTokenExpired();
      if (expired) {
        navigate(`/${language}/auth`);
      }
    };

    checkToken();
  }, [navigate, language]);

  return <Outlet />;
};