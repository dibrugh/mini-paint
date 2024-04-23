import { UsefetchImages, handleDelete } from '../../../features';

import ImageList from '@mui/material/ImageList';
import { ImageCard } from '../../../entities';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

type Props = {
    selectedUsers:
        | null
        | {
              label: string;
              value: string;
          }[];
};

const ImagesCardList = ({ selectedUsers }: Props) => {
    const { imagesData } = UsefetchImages();
    const [filteredImages, setFilteredImages] = useState<DocumentData[] | null>(null);

    useEffect(() => {
        if (!selectedUsers || !selectedUsers.length) {
            setFilteredImages(imagesData);
        } else if (imagesData && selectedUsers) {
            const listOfUsers = selectedUsers.map((el) => el.value);
            setFilteredImages(imagesData.filter((user) => listOfUsers.includes(user.name)));
        }
    }, [selectedUsers, imagesData]);

    const handleDeleteImage = (id: string, documentId: string) => {
        handleDelete(id, documentId);
        filteredImages && setFilteredImages(filteredImages?.filter((user) => user.documentId !== documentId));
    };

    return (
        filteredImages && (
            <Container sx={{ paddingTop: '20px' }}>
                <ImageList cols={4} gap={8}>
                    {filteredImages.map((el) => (
                        <ImageCard key={el.id} cardData={el} handleDeleteImage={handleDeleteImage} />
                    ))}
                </ImageList>
            </Container>
        )
    );
};

export default ImagesCardList;
