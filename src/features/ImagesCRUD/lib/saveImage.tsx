import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { uploadSuccessful } from '../../../shared/api';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';
import { User } from 'firebase/auth';

type saveImageProps = {
    img: string | undefined;
    currentUser: User | null;
};

export const saveImage = async (props: saveImageProps) => {
    const { img, currentUser } = props;
    const storage = getStorage();
    const imageName = uuidv4();
    const storageRef = ref(storage, `/images/${imageName}`);
    await uploadString(storageRef, img!, 'data_url').then(() => {
        uploadSuccessful();
    });
    const downloadURL = await getDownloadURL(storageRef);
    const uploading = await addDoc(collection(db, 'users'), {
        id: imageName,
        name: currentUser?.displayName,
        email: currentUser?.email,
        image: downloadURL,
    });

    console.log('Uploading....', uploading);
};
