import { ReactNode, createContext, useEffect, useState } from 'react';
import { userStateListener } from '../../features';
import { User } from 'firebase/auth';

export const AuthContext = createContext();

type AuthProvider = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProvider) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
            if (user) {
                setCurrentUser(user);
            }
        });

        return unsubscribe;
    }, [setCurrentUser]);

    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
