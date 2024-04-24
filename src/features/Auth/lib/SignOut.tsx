import { signOut } from 'firebase/auth';
import { auth } from '../../../shared/config/firebaseConfig';

export const signOutUser = async () => {
    if (auth.currentUser) {
        await signOut(auth);
    }
};
