import { UsefetchImages } from '../../../features';

import ImageList from '@mui/material/ImageList';
import { ImageCard } from '../../../entities';
import { Container } from '@mui/material';

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
    let filteredImages = imagesData;

    if (!selectedUsers || !selectedUsers.length) {
        filteredImages = imagesData;
    } else if (imagesData && selectedUsers) {
        const listOfUsers = selectedUsers.map((el) => el.value);
        filteredImages = imagesData.filter((user) => listOfUsers.includes(user.name));
    }

    return (
        filteredImages && (
            <Container sx={{ paddingTop: '20px' }}>
                <ImageList cols={4} gap={8}>
                    {filteredImages.map((el) => (
                        <ImageCard key={el.id} cardData={el} />
                    ))}
                </ImageList>
            </Container>
        )
    );
};

export default ImagesCardList;
