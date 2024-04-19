import { ImageListItem, ImageListItemBar } from '@mui/material';
import { DocumentData } from 'firebase/firestore';

const ImageCard = ({ cardData }: DocumentData) => {
    const { name, email, image } = cardData;
    return (
        <ImageListItem>
            <img srcSet={`${image} 2x`} src={image} alt={`created by ${name}`} loading="lazy" />
            <ImageListItemBar
                title={
                    <p>
                        author - <b>{name}</b>
                    </p>
                }
                subtitle={<span>Contact: {email}</span>}
                position="below"
            />
        </ImageListItem>
    );
};

export default ImageCard;
