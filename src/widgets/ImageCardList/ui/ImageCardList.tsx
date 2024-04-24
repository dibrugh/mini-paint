import { useFetchImages } from '../../../features';
import { useMediaQuery, Container, CircularProgress, Box } from '@mui/material';

import ImageList from '@mui/material/ImageList';
import { ImageCard } from '../../../entities';

type OptionType = { label: string; value: string };
type ImagesCardListProps = {
    selectedUsers: OptionType[] | undefined;
};

const ImagesCardList = ({ selectedUsers }: ImagesCardListProps) => {
    const { imagesData, loading } = useFetchImages(selectedUsers);
    const matchDownSm = useMediaQuery('(max-width:700px)');

    return imagesData && !loading ? (
        <Container sx={{ paddingTop: '20px' }}>
            <ImageList cols={matchDownSm ? 2 : 4} gap={8}>
                {imagesData.map((el) => (
                    <ImageCard key={el.id} cardData={el} />
                ))}
            </ImageList>
        </Container>
    ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <CircularProgress size={150} />
        </Box>
    );
};

export default ImagesCardList;
