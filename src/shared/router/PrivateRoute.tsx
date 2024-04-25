import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useUser } from '../model/useUser';

type PrivateRouteProp = {
    children?: ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProp) {
    const { email } = useUser();
    const path = useLocation().pathname;

    if (!email && path !== '/sign-in') {
        return <Navigate to="/sign-in" replace />;
    } else if (email && path === '/sign-in') {
        return <Navigate to="/feed" replace />;
    } else {
        return children;
    }
}
