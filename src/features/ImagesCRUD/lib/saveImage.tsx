import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { uploadSuccessful } from '../../../shared/api';
import { v4 as uuidv4 } from 'uuid';
import { DocumentData, addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';
import { User } from 'firebase/auth';

type saveImageProps = {
    img: string | undefined;
    currentUser: User | null;
    imageId?: string;
    imageURL?: string;
    imagesData?: DocumentData[] | null;
};

export const saveImage = async (props: saveImageProps) => {
    const { img, currentUser, imageId, imageURL, imagesData } = props;
    const storage = getStorage();

    if (imageURL) {
        const testDocumentId = imagesData?.filter((el) => el.id === imageId)[0].documentId;
        const storageRef = ref(storage, `/images/${imageId}`);
        await uploadString(storageRef, img!, 'data_url').then(() => {
            uploadSuccessful();
        });
        const downloadURL = await getDownloadURL(storageRef);
        const imageRef = doc(db, 'users', testDocumentId);
        const uploading = await updateDoc(imageRef, {
            id: imageId,
            name: currentUser?.displayName,
            email: currentUser?.email,
            image: downloadURL,
        });

        console.log('Updating....', uploading);
    } else {
        const newImageId = uuidv4();
        const storageRef = ref(storage, `/images/${newImageId}`);
        await uploadString(storageRef, img!, 'data_url').then(() => {
            uploadSuccessful();
        });
        const downloadURL = await getDownloadURL(storageRef);
        const uploading = await addDoc(collection(db, 'users'), {
            id: newImageId,
            name: currentUser?.displayName,
            email: currentUser?.email,
            image: downloadURL,
        });

        console.log('Uploading....', uploading);
    }
};
