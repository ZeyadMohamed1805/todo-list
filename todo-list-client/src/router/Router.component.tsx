import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute, ProtectedRoutes, UnProtectedRoutes } from './Router.blocks';

const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        {ProtectedRoutes}
      </Route>
      {UnProtectedRoutes}
    </Routes>
  );
};

export default Router;
