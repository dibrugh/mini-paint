import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { uploadString, getDownloadURL, ref, getStorage } from 'firebase/storage';
import { db } from '../../../shared/config/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { uploadSuccessful } from '../../../shared/api';

type saveImageParams = {
    displayName: string | null;
    image: string | null;
    imageDataURL?: string;
    id: string | null;
    email: string | null;
    documentId: string | null;
    dispatchImageData: (
        documentId: string,
        email: string | null,
        id: string,
        image: string,
        name: string | null
    ) => {
        payload: unknown;
        type: 'image/setImage';
    };
};

export const saveImage = async ({
    displayName,
    email,
    image,
    imageDataURL,
    id,
    documentId,
    dispatchImageData,
}: saveImageParams) => {
    const storage = getStorage();
    if (image) {
        const storageRef = ref(storage, `/images/${id}`);
        imageDataURL &&
            (await uploadString(storageRef, imageDataURL, 'data_url').then(() => {
                uploadSuccessful();
            }));
        const downloadURL = await getDownloadURL(storageRef);
        const imageRef = doc(db, 'users', documentId as string);
        const uploading = await updateDoc(imageRef, {
            image: downloadURL,
        });
        console.log('Updating....', uploading);
    } else {
        const newImageId = uuidv4();
        const storageRef = ref(storage, `/images/${newImageId}`);
        await uploadString(storageRef, imageDataURL!, 'data_url').then(() => {
            uploadSuccessful();
        });
        const downloadURL = await getDownloadURL(storageRef);
        const uploading = await addDoc(collection(db, 'users'), {
            id: newImageId,
            name: displayName,
            email: email,
            image: downloadURL,
        });
        dispatchImageData(uploading.id, email, newImageId, downloadURL, displayName);
    }
};
