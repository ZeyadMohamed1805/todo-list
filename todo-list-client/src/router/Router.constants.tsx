import Auth from "../screens/Auth";
import { Navigate, RouteProps } from 'react-router-dom';

export const APPLICATION_ROUTES: Array<RouteProps> = [
    { path: '/', element: <Navigate to="/auth" replace /> },
    { path: '/auth', Component: Auth }
];
