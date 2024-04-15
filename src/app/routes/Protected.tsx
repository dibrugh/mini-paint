import { ReactNode, useContext } from 'react';
import { AuthContext } from '../context/Auth';
import { Navigate } from 'react-router-dom';

type ProtectedProp = {
    children?: ReactNode;
};

export function Protected({ children }: ProtectedProp) {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/sign-in" replace />;
    } else {
        return children;
    }
}
