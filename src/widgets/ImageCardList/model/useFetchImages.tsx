import { DocumentData, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';
import { useEffect, useMemo, useState } from 'react';

type OptionType = { label: string; value: string };
type UseFetchImagesProps = OptionType[] | undefined;

export function useFetchImages(selectedUsers?: UseFetchImagesProps) {
    const [imagesData, setImagesData] = useState<DocumentData[] | null>(null);
    const [loading, setLoading] = useState(false);

    const q = useMemo(() => {
        if (selectedUsers?.length) {
            return query(
                collection(db, 'users'),
                where(
                    'name',
                    'in',
                    selectedUsers.map((el) => el.value)
                )
            );
        } else {
            return query(collection(db, 'users'));
        }
    }, [selectedUsers]);

    useEffect(() => {
        let unsubscribe: () => void;
        setLoading(true);
        const fetchImages = async () => {
            try {
                unsubscribe = onSnapshot(q, (querySnapshot) => {
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

        setLoading(false);

        return () => {
            unsubscribe();
        };
    }, [q, selectedUsers]);

    return { imagesData, loading };
}
