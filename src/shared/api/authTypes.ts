import { UserCredential } from 'firebase/auth';

export type AuthParams = (email: string, password: string) => Promise<UserCredential>;
