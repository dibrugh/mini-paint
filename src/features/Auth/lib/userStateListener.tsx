import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../shared/config/firebaseConfig';

export const userStateListener = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback);
};
