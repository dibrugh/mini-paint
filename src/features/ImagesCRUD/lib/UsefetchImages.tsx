import { DocumentData, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';
import { useEffect, useState } from 'react';

type OptionType = { label: string; value: string };
type UseFetchImagesProps = OptionType[] | undefined;

export function useFetchImages(selectedUsers?: UseFetchImagesProps) {
    const [imagesData, setImagesData] = useState<DocumentData[] | null>(null);

    let q;
    if (selectedUsers?.length) {
        q = query(
            collection(db, 'users'),
            where(
                'name',
                'in',
                selectedUsers.map((el) => el.value)
            )
        );
    } else {
        q = query(collection(db, 'users'));
    }

    useEffect(() => {
        const fetchImages = async () => {
            try {
                onSnapshot(q, (querySnapshot) => {
                    const imageArray: DocumentData[] = [];
                    querySnapshot.forEach((doc) => {
                        imageArray.push({ ...doc.data(), documentId: doc.id });
                    });
                    setImagesData(imageArray);
                });
            } catch (error) {
                console.error('Failed to get images...', error);
            }
        };
        fetchImages();
    }, [q, selectedUsers]);

    return { imagesData };
}
