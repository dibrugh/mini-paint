import { useFetchImages } from '../../../features';
import { useMediaQuery, Container, CircularProgress } from '@mui/material';

import ImageList from '@mui/material/ImageList';
import { ImageCard } from '../../../entities';

type OptionType = { label: string; value: string };
type ImagesCardListProps = {
    selectedUsers: OptionType[] | undefined;
};

const ImagesCardList = ({ selectedUsers }: ImagesCardListProps) => {
    const { imagesData, loading } = useFetchImages(selectedUsers);
    const matchDownSm = useMediaQuery('(max-width:800px)');
    const matchDownXSm = useMediaQuery('(max-width:450px)');

    return imagesData && !loading ? (
        <Container sx={{ paddingTop: '20px' }}>
            <ImageList cols={matchDownXSm ? 1 : matchDownSm ? 2 : 4} gap={8}>
                {imagesData.map((el) => (
                    <ImageCard key={el.id} cardData={el} />
                ))}
            </ImageList>
        </Container>
    ) : (
        <Container sx={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
            <CircularProgress size={150} />
        </Container>
    );
};

export default ImagesCardList;
