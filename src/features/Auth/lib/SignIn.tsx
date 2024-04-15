import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../shared/config/firebaseConfig';
import { AuthParams } from '../../../shared/api/authTypes';

export const signInUser: AuthParams = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};
