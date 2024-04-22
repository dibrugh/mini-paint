import { DocumentData, collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';
import { useEffect, useState } from 'react';

export function UsefetchImages() {
    const [imagesData, setImagesData] = useState<DocumentData[] | null>(null);

    const q = query(collection(db, 'users'));
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getDocs(q);
                const imageArray = response.docs.map((doc) => ({ ...doc.data(), documentId: doc.id }));
                setImagesData(imageArray);
            } catch (error) {
                console.error('Failed to get images...', error);
            }
        };
        fetchImages();
    }, []);

    return { imagesData };
}
