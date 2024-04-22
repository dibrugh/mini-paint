import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';
import { getStorage, ref, deleteObject } from 'firebase/storage';

export const handleDelete = async (imageName: string, documentId: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${imageName}`);
    await deleteObject(imageRef);
    await deleteDoc(doc(db, 'users', documentId));
};
