import { DocumentData, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';
import { useEffect, useState } from 'react';

type OptionType = { label: string; value: string };
type UseFetchImagesProps = OptionType[] | undefined;

export function useFetchImages(selectedUsers?: UseFetchImagesProps) {
    const [imagesData, setImagesData] = useState<DocumentData[] | null>(null);

    const q = query(collection(db, 'users'));
    useEffect(() => {
        const fetchImages = async () => {
            if (selectedUsers?.length) {
                try {
                    const q = query(
                        collection(db, 'users'),
                        where(
                            'name',
                            'in',
                            selectedUsers.map((el) => el.value)
                        )
                    );
                    const response = await getDocs(q);
                    const imageArray = response.docs.map((doc) => ({ ...doc.data(), documentId: doc.id }));
                    setImagesData(imageArray);
                } catch (error) {
                    console.error('Failed to get images...', error);
                }
            } else {
                try {
                    const response = await getDocs(q);
                    const imageArray = response.docs.map((doc) => ({ ...doc.data(), documentId: doc.id }));
                    setImagesData(imageArray);
                } catch (error) {
                    console.error('Failed to get images...', error);
                }
            }
        };
        fetchImages();
    }, [selectedUsers]);

    return { imagesData };
}
