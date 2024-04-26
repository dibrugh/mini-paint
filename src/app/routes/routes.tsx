import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Error } from '../../pages';
import { AuthGuard } from '../../shared/router/AuthGuard';
import { privateRoutes } from './privateRoutes';
import { publicRoutes } from './publicRoutes';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        errorElement: <Error />,
        children: [
            ...publicRoutes,
            {
                element: <AuthGuard />,
                children: [...privateRoutes],
            },
        ],
    },
]);
