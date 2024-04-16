import { ReactNode, createContext, useEffect, useState } from 'react';
import { userStateListener } from '../../features';
import { User } from 'firebase/auth';

export const AuthContext = createContext<User | null>(null);

type AuthProvider = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProvider) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
            if (user) {
                setCurrentUser(user);
            }
            setPending(false);
        });

        return unsubscribe;
    }, [setCurrentUser]);

    if (pending) {
        return <>Loading...</>;
    }

    return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};
