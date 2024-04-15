import { signOut } from 'firebase/auth';
import { auth } from '../../../shared/config/firebaseConfig';

export const signOutUser = async () => await signOut(auth);
