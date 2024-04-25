import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { removeUser, setUser, setLoading } from '../../features/Auth/model/userSlice';
import { userStateListener } from '../../features';

export const useUser = () => {
    const dispatch = useAppDispatch();
    const { email, displayName, isLoading } = useAppSelector((state) => state.user);

    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
            if (user) {
                dispatch(setUser({ displayName: user.displayName, email: user.email }));
            } else {
                dispatch(removeUser());
            }
            dispatch(setLoading(false));
        });

        return unsubscribe;
    }, [dispatch]);

    return { email, displayName, isLoading };
};
