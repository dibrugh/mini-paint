import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../shared/config/firebaseConfig';
import { AuthParams } from '../../../shared/api/authTypes';

export const createUser: AuthParams = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};
