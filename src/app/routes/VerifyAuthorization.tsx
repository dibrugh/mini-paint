import { ReactNode, useContext } from 'react';
import { AuthContext } from '../context/Auth';
import { Navigate, useLocation } from 'react-router-dom';

type VerifyAuthorizationProp = {
    children?: ReactNode;
};

export function VerifyAuthorization({ children }: VerifyAuthorizationProp) {
    const currentUser = useContext(AuthContext);
    const path = useLocation().pathname;

    if (!currentUser && path !== '/sign-in') {
        return <Navigate to="/sign-in" replace />;
    } else if (currentUser && path === '/sign-in') {
        return <Navigate to="/feed" replace />;
    } else {
        return children;
    }
}
