import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useUser } from '../../app/store/useUser';

type VerifyAuthorizationProp = {
    children?: ReactNode;
};

export function VerifyAuthorization({ children }: VerifyAuthorizationProp) {
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
