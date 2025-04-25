import { Route, Routes } from 'react-router-dom';
import { AuthorizedRoute, AuthorizedRoutes, ProtectedRoute, ProtectedRoutes, UnProtectedRoutes } from './Router.blocks';

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthorizedRoute />}>
        {AuthorizedRoutes}
      </Route>
      
      <Route element={<ProtectedRoute />}>
        {ProtectedRoutes}
      </Route>
      
      {UnProtectedRoutes}
    </Routes>
  );
};

export default Router;
