import { useFetchImages } from '../../../features';
import { useMediaQuery, Container } from '@mui/material';

import ImageList from '@mui/material/ImageList';
import { ImageCard } from '../../../entities';

type OptionType = { label: string; value: string };
type ImagesCardListProps = {
    selectedUsers: OptionType[] | undefined;
};

const ImagesCardList = ({ selectedUsers }: ImagesCardListProps) => {
    const { imagesData } = useFetchImages(selectedUsers);
    const matchDownSm = useMediaQuery('(max-width:700px)');

    return (
        imagesData && (
            <Container sx={{ paddingTop: '20px' }}>
                <ImageList cols={matchDownSm ? 2 : 4} gap={8}>
                    {imagesData.map((el) => (
                        <ImageCard key={el.id} cardData={el} />
                    ))}
                </ImageList>
            </Container>
        )
    );
};

export default ImagesCardList;
