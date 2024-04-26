import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useUser } from '../model/useUser';

export function AuthGuard() {
    const { email } = useUser();
    const path = useLocation().pathname;

    if (!email && path !== '/sign-in') {
        return <Navigate to="/sign-in" replace />;
    } else if (email && path === '/sign-in') {
        return <Navigate to="/feed" replace />;
    } else {
        return <Outlet />;
    }
}
