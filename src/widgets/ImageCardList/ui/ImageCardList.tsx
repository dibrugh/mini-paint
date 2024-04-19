import { ImageCard } from '../../../entities';
import { Container } from '@mui/material';
import { UsefetchImages } from '../../../features';

const ImagesCardList = () => {
    const { images } = UsefetchImages();
    return (
        <Container>
            {images.map((el) => {
                return <ImageCard key={el.id} cardData={el} />;
            })}
        </Container>
    );
};

export default ImagesCardList;
